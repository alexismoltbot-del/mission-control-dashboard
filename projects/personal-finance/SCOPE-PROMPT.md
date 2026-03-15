# Personal Finance Agent — Projet complet

## Contexte

Alexis est entrepreneur (SAS) basé à Neuilly-sur-Seine. Plusieurs comptes bancaires perso + pro, revenus mixtes (salaire, dividendes, loyers LMNP 1650€/mois). Il pilote tout depuis WhatsApp via OpenClaw.

Il veut un agent financier personnel qui agrège ses comptes, catégorise ses transactions, génère des reportings et l'alerte quand c'est nécessaire.

L'agent tourne sur un Mac mini (macOS, arm64). Les credentials sont stockés dans le Keychain macOS (`security find-generic-password -a "openclaw" -s "<service>" -w`). Tout le code doit être en local, pas de cloud tiers.

## Ce qu'on construit

Un skill OpenClaw `personal-finance` composé de :
- Une base SQLite locale pour stocker comptes, transactions, catégories, règles, alertes
- Des scripts CLI pour importer, catégoriser, reporter, alerter
- Des crons OpenClaw pour automatiser sync + digest + alertes
- Une interface conversationnelle via WhatsApp (commandes naturelles)

## Stack

- **Langage** : TypeScript (Node.js)
- **DB** : SQLite via better-sqlite3
- **Runtime** : scripts CLI exécutables depuis OpenClaw (exec)
- **Crons** : OpenClaw cron tool
- **Output** : WhatsApp via OpenClaw message tool
- **Credentials** : macOS Keychain

## Séquence de build

### Phase 1 — Fondations (DB + Import CSV)

**1.1 — Schéma SQLite**

Créer `data/finance.db` avec les tables :

```sql
-- Comptes bancaires
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  bank TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('courant','epargne','pro','credit','investissement')),
  currency TEXT DEFAULT 'EUR',
  balance REAL,
  last_sync TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Transactions
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  date TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  label TEXT,
  raw_label TEXT,
  category TEXT,
  subcategory TEXT,
  merchant TEXT,
  is_recurring INTEGER DEFAULT 0,
  notes TEXT,
  hash TEXT UNIQUE, -- dedupe
  created_at TEXT DEFAULT (datetime('now'))
);

-- Catégories
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parent TEXT,
  budget_monthly REAL,
  color TEXT
);

-- Règles de catégorisation
CREATE TABLE rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pattern TEXT NOT NULL, -- regex sur label
  category TEXT NOT NULL,
  subcategory TEXT,
  merchant TEXT,
  priority INTEGER DEFAULT 0
);

-- Config alertes
CREATE TABLE alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'balance_low', 'large_tx', 'new_merchant', 'recurring_change'
  account_id TEXT, -- null = tous les comptes
  threshold REAL,
  enabled INTEGER DEFAULT 1,
  last_triggered TEXT
);

CREATE INDEX idx_tx_date ON transactions(date);
CREATE INDEX idx_tx_account ON transactions(account_id);
CREATE INDEX idx_tx_category ON transactions(category);
```

**1.2 — Script d'init**

`scripts/init-db.ts` : crée la DB + insère les catégories par défaut :

Catégories FR : Revenus, Salaire, Dividendes, Loyers, Remboursements, Logement, Charges, Crédit, Alimentation, Courses, Restaurants, Transport, Carburant, Transports en commun, Parking, Santé, Éducation, Loisirs, Sorties, Sport, Abonnements, Streaming, Télécom, SaaS, Shopping, Vêtements, High-tech, Impôts, IR, IS, CFE, TVA, Épargne, Virements internes, Société, Charges société, Frais pro, Divers.

**1.3 — Import CSV**

`scripts/import-csv.ts` : importe un fichier CSV bancaire.

- Accepte `--file <path>` et `--account <account_id>` et `--bank <bank_name>`
- Parsers spécifiques par banque (BoursoBank, LCL, Crédit Agricole, SG, BNP — les plus courants)
- Détection automatique du format si `--bank` non spécifié
- Dédoublonnage via hash (date + montant + label)
- Applique les règles de catégorisation après import
- Output : "X transactions importées, Y catégorisées, Z à review"

**1.4 — Import OFX/QIF**

`scripts/import-ofx.ts` : même logique pour les formats OFX/QIF (exports bancaires standard).

### Phase 2 — Catégorisation

**2.1 — Moteur de règles**

`scripts/categorize.ts` :
- Parcourt les transactions sans catégorie
- Applique les règles (table `rules`) par priorité décroissante
- Match regex insensible à la casse sur `raw_label`
- Log les résultats

**2.2 — Règles par défaut**

Insérer ~50 règles couvrant les marchands FR courants :
- `CARREFOUR|MONOPRIX|FRANPRIX|LIDL|AUCHAN` → Courses
- `SNCF|RATP|UBER|BOLT|TIER` → Transport
- `NETFLIX|SPOTIFY|DISNEY|CANAL` → Streaming
- `FREE MOBILE|ORANGE|SFR|BOUYGUES` → Télécom
- `PHARMACIE|DOCTOLIB` → Santé
- `TOTAL|SHELL|BP` → Carburant
- etc.

**2.3 — Fallback LLM**

`scripts/categorize-llm.ts` :
- Prend les transactions encore non catégorisées après les règles
- Les envoie par batch de 20 au LLM avec la liste des catégories disponibles
- Parse la réponse et met à jour
- Propose d'ajouter de nouvelles règles si un pattern se répète

### Phase 3 — Reporting

**3.1 — Commandes CLI**

`scripts/report.ts` avec sous-commandes :

- `balances` : soldes de tous les comptes
- `summary --period <day|week|month|year> [--date YYYY-MM-DD]` : revenus/dépenses par catégorie
- `transactions --last <N> [--category <cat>] [--min <amount>] [--account <id>]` : liste filtrée
- `recurring` : liste des transactions récurrentes détectées
- `compare --period month` : mois courant vs mois précédent
- `search --query <text>` : recherche full-text sur les labels

Chaque commande sort un résumé texte formaté, lisible sur WhatsApp (pas de tableaux larges, utiliser des listes et emojis).

**3.2 — Détection récurrents**

Script qui analyse les transactions pour détecter les prélèvements récurrents :
- Même montant ± 5% + même marchand + intervalle régulier (mensuel, hebdo, annuel)
- Flag `is_recurring = 1` sur les transactions matchées
- Génère une vue "Abonnements" avec montant mensuel total

### Phase 4 — Alertes

**4.1 — Alert engine**

`scripts/check-alerts.ts` :
- Parcourt la table `alerts`
- Évalue chaque condition :
  - `balance_low` : solde d'un compte < seuil
  - `large_tx` : transaction récente > seuil
  - `new_merchant` : marchand jamais vu avant
  - `recurring_change` : un récurrent a changé de montant ou disparu
- Si déclenchée : retourne le message d'alerte formaté
- Ne re-déclenche pas si `last_triggered` < 24h (anti-spam)

**4.2 — Alertes par défaut**

- Solde courant perso < 5 000€
- Solde courant pro < 10 000€
- Transaction > 1 000€
- Nouveau marchand > 100€

### Phase 5 — Crons OpenClaw

**5.1 — Sync cron** (toutes les 6h)
- Si API bancaire connectée : pull les nouvelles transactions
- Sinon : skip (import CSV manuel)
- Catégorise les nouvelles transactions
- Check les alertes

**5.2 — Digest matinal** (tous les jours à 8h)
- Soldes de tous les comptes
- Transactions significatives de la veille (> 50€)
- Alertes actives
- Format WhatsApp concis

**5.3 — Weekly report** (lundi 9h)
- Dépenses par catégorie
- Top 5 postes
- Comparaison semaine précédente
- Soldes

**5.4 — Monthly report** (1er du mois, 9h)
- Vue complète revenus / dépenses
- Évolution par rapport au mois précédent
- Récurrents : total et changements
- Épargne du mois
- Budget vs réel par catégorie

### Phase 6 — API bancaire (V1)

**6.1 — Recherche et choix API**

Investiguer dans cet ordre :
1. **GoCardless Bank Account Data** (ex-Nordigen) — gratuit jusqu'à 100 requêtes/jour, couverture FR bonne
2. **Bridge by Bankin** — payant mais bien intégré
3. **Powens** (ex-Budget Insight) — plutôt B2B

Critères de choix : coût pour 1 utilisateur, couverture banques FR, facilité d'intégration, sandbox gratuite.

**6.2 — Connecteur**

`scripts/sync-bank.ts` :
- Auth OAuth2 (tokens dans Keychain)
- Pull les comptes et transactions depuis la dernière sync
- Insert en DB avec dédoublonnage
- Met à jour les soldes

### Phase 7 — SKILL.md et intégration OpenClaw

**7.1 — SKILL.md**

Le fichier skill qui permet à OpenClaw d'utiliser l'agent :
- Description des commandes disponibles
- Exemples de requêtes naturelles et mapping vers les scripts
- Instructions pour les crons

**7.2 — Gestion des comptes**

`scripts/manage-accounts.ts` :
- `add --bank <name> --name <label> --type <type>` : ajouter un compte
- `list` : lister les comptes
- `remove <id>` : supprimer un compte

**7.3 — Gestion des règles**

`scripts/manage-rules.ts` :
- `add --pattern <regex> --category <cat>` : ajouter une règle
- `list` : lister les règles
- `remove <id>` : supprimer une règle
- `test --label <text>` : tester quelle catégorie serait assignée

## Structure du projet

```
skills/personal-finance/
├── SKILL.md
├── package.json
├── tsconfig.json
├── data/
│   └── finance.db          (gitignored)
├── scripts/
│   ├── init-db.ts
│   ├── import-csv.ts
│   ├── import-ofx.ts
│   ├── categorize.ts
│   ├── categorize-llm.ts
│   ├── report.ts
│   ├── check-alerts.ts
│   ├── sync-bank.ts
│   ├── manage-accounts.ts
│   ├── manage-rules.ts
│   └── detect-recurring.ts
├── lib/
│   ├── db.ts               (connexion SQLite singleton)
│   ├── parsers/
│   │   ├── bourso.ts
│   │   ├── lcl.ts
│   │   ├── ca.ts
│   │   ├── sg.ts
│   │   ├── bnp.ts
│   │   └── generic.ts
│   ├── categorizer.ts
│   ├── alerts.ts
│   ├── reporter.ts
│   └── formatter.ts        (formatage WhatsApp)
└── tests/
    ├── fixtures/            (CSV exemples anonymisés)
    └── *.test.ts
```

## Contraintes techniques

- Node.js / TypeScript strict
- ESM modules
- better-sqlite3 pour la DB
- Pas de framework lourd (pas de Express, pas de Next)
- Scripts exécutables via `npx tsx scripts/<name>.ts`
- Tous les outputs formatés pour WhatsApp (texte court, emojis, pas de markdown complexe)
- Credentials dans Keychain, jamais en clair
- DB dans `data/`, gitignored
- Tests avec vitest
- Tout en français (catégories, messages, labels)

## Ordre d'exécution

1. Phase 1 (fondations) — obligatoire, bloque tout le reste
2. Phase 2 (catégorisation) — dès que Phase 1 OK
3. Phase 3 (reporting) — dès que Phase 2 OK
4. Phase 4 (alertes) — parallélisable avec Phase 3
5. Phase 7 (SKILL.md) — dès que Phases 3+4 OK
6. Phase 5 (crons) — après Phase 7
7. Phase 6 (API bancaire) — indépendant, à lancer quand le reste marche

Chaque phase doit être testable indépendamment. Livre phase par phase avec des tests.
