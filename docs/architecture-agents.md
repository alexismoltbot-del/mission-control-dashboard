# 🏗️ Architecture Agents OpenClaw — Vue Simplifiée

> *Dernière MAJ : 13 mars 2026*

---

## Vue globale

```
╔══════════════════════════════════════════════════════════════════════════╗
║                            ALEXIS (humain)                             ║
║                     Décide · Valide · Signe · Close                    ║
╚════════════════════════════╤═════════════════════════════════════════════╝
                             │
                             │  WhatsApp / Telegram / TUI
                             │
╔════════════════════════════╧═════════════════════════════════════════════╗
║                    ORCHESTRATEUR — Agent Principal                       ║
║                    Priorise · Route · Synthétise                        ║
║                                                                         ║
║  Crons : System Loop (3x/j) + Approval Digest → WhatsApp (2x/j)       ║
╚═══╤═══════════╤═══════════╤═══════════╤═══════════╤═════════════════════╝
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│CONTENU │ │VOITURE │ │ INFRA  │ │ONBOARD.│ │FINANCE │  ┌────────┐
│& Distri│ │& Auto  │ │& Monit.│ │& Suppo.│ │& Facto.│  │GROWTH  │
│2x/jour │ │6x/jour │ │3x/jour │ │2x/jour │ │1x/jour │  │& KPIs  │
└───┬────┘ └───┬────┘ └───┬────┘ └────────┘ └────────┘  │1x/jour │
    │          │          │                              └────────┘
    │          │          │
    ▼          ▼          ▼
 LinkedIn   La Centrale  Scripts
 Substack   LeBonCoin    Monitoring
            AutoScout24  Templates
```

---

## Comment ça tourne

```
┌─────────────────────────────────────────────────────┐
│              BOUCLE D'UN AGENT WORKER               │
│                                                     │
│  1. Cron déclenche l'agent                          │
│  2. Lit shared/system/views/tasks-by-owner.md       │
│  3. Prend une tâche ready ou running                │
│  4. Fait UN pas concret                             │
│  5. Met à jour la tâche + l'artefact                │
│  6. Lance refresh_openclaw_system.py                │
│  7. Si décision humaine → crée une approval         │
│  8. Si rien à faire → HEARTBEAT_OK                  │
│                                                     │
│  Orchestrateur surveille → digest WhatsApp          │
└─────────────────────────────────────────────────────┘
```

---

## Les 4 clusters

### 1. 🏭 Factory (9 agents · 10 crons)

L'équipe permanente. Opère tous les business.

```
shared/system/
├── tasks/           ← une tâche = un fichier .md
├── approvals/       ← décisions en attente d'Alexis
├── handoffs/        ← passages inter-agents
└── views/           ← board.md, tasks-by-owner.md (auto-générés)
```

| Agent | Fréquence | Modèle | Santé |
|-------|-----------|--------|-------|
| **Orchestrateur** | 3x/j + digest 2x/j | sonnet | ⚠️ |
| **Contenu & Distribution** | 2x/j | sonnet | ⚠️ |
| **Voiture & Automobile** | 4x/j + relances 2x/j | sonnet | ✅/⚠️ |
| **Infra & Monitoring** | 3x/j | sonnet | ✅ |
| **Onboarding & Support** | 2x/j | sonnet | ✅ |
| **Finance & Facturation** | 1x/j | sonnet | ✅ |
| **Growth & Metrics** | 1x/j | sonnet | ❌ |

### 2. 🔄 ReneGo (7 agents · 7 crons)

Sprint 72h pour lancer ReneGo (négo factures box internet).

```
Recherche US ──┐
               ├──▶ Chef de Projet ──▶ Développeur ──▶ QA ──▶ GO/NO-GO
Veille Prix FR ┘         │
                         └──▶ Growth & Lancement (landing + copy)

Communication via handoffs/ (fichiers .md)
Notificateur Approval → WhatsApp toutes les heures
```

| Agent | Fréquence | Modèle | Santé |
|-------|-----------|--------|-------|
| **Recherche Marché US** | 6x/j | gpt-5.4 | ❌ |
| **Veille Offres FR** | 6x/j | gpt-5.4 | ❌ |
| **Chef de Projet** | 6x/j | gpt-5.4 | ❌ |
| **Développeur Produit** | 6x/j | gpt-5.4 | ❌ |
| **QA & Launch Gate** | 6x/j | opus | ❌ |
| **Growth & Lancement** | 6x/j | gpt-5.4 | ❌ |
| **Notificateur Approval** | 1x/h | sonnet | ✅ |

⚠️ 6/7 cassés — erreur `delivery.channel` manquant.

### 3. 📬 CourrierIA (7 agents · 0 cron)

Gestion automatisée du courrier pour PME. Défini, pas encore câblé.

```
Chef de Projet
  ├──▶ Analyse Documentaire ──▶ Constructeur Produit ──▶ QA & Risques
  ├──▶ Automatisation Workflows ─────────────────────────┘
  ├──▶ Conformité & Vie Privée
  └──▶ Go-to-Market & Lancement
```

| Agent | Rôle |
|-------|------|
| **Chef de Projet** | Scope, distribution, arbitrage |
| **Analyse Documentaire** | Taxonomie, extraction, OCR, seuils |
| **Automatisation Workflows** | Courrier → action, drafts, escalades |
| **Constructeur Produit** | Flow upload → inbox → action |
| **Conformité & Vie Privée** | RGPD, rétention, claims, gates |
| **Go-to-Market & Lancement** | Pricing, landing, onboarding, FAQ |
| **QA & Risques** | Tests, verdict GO / NO-GO |

### 4. 🌐 GEO Agency (6 agents · 0 cron)

Agence SEO/GEO pour indexation dans les LLMs. Blueprint prêt.

```
Chef de Projet
  ├──▶ Recherche GEO (audit citations LLM)
  ├──▶ Contenu & Entités (briefs, structuration)
  ├──▶ Technique GEO (llms.txt, schema.org)
  ├──▶ Constructeur Produit
  └──▶ QA & Risques
```

### 5. 📧 Consultant Stratégique (1 agent · 1 cron)

Agent standalone. Emails de conseil (immo/acquisition) tous les 3-4 jours.

```
Cron 2x/j → due? → oui → rédige memo → envoie email SMTP
                  → non → HEARTBEAT_OK
```

---

## Modèles utilisés

| Modèle | Où | Pourquoi |
|--------|-----|---------|
| **Sonnet** | Factory, Consultant, pings Renego | Rapide, bon marché, tâches courantes |
| **GPT-5.4** | Renego (PM, Dev, Research, Offers, Growth) | Puissant pour code + recherche web |
| **Opus** | Renego QA | Rigueur maximale pour le gate qualité |

---

## Santé — 13 mars 2026

```
Factory    ██████████░░  ~75% OK   (4 erreurs write sur approvals/)
ReneGo     █░░░░░░░░░░░  ~15% OK   (6/7 cassés — erreur channel config)
CourrierIA ░░░░░░░░░░░░  pas actif
GEO Agency ░░░░░░░░░░░░  pas actif
Consultant ████████████  100% OK
```

**Urgences :**
1. Renego : 6 crons cassés (erreur `delivery.channel` manquant)
2. Factory : erreurs de write dans `shared/system/approvals/`
3. Growth & Metrics : 2 erreurs consécutives

---

## Arborescence clé

```
/Users/alexis/
├── .openclaw/
│   ├── workspace/              ← workspace agent principal
│   │   ├── AGENTS.md           ← rôles de l'équipe
│   │   ├── MEMORY.md           ← mémoire long terme
│   │   ├── HEARTBEAT.md        ← checklist heartbeat
│   │   └── docs/               ← ce document
│   ├── shared/system/          ← système de tâches Factory
│   └── agents/main/            ← sessions agent principal
│
├── agents/                     ← SOUL.md de chaque agent Factory
│   ├── anna-marketing/
│   ├── jade-sales/
│   ├── victor-tech/
│   ├── emma-cs/
│   ├── franck-cfo/
│   ├── leo-growth/
│   └── bruno-b/
│
└── Documents/Playground/
    ├── renego-commodites-fr/
    │   └── openclaw-team/      ← équipe Renego
    │       ├── agents/         ← ROLE.md par agent
    │       ├── handoffs/       ← communication inter-agents
    │       ├── market/         ← veille US + FR
    │       ├── growth/         ← landing, positioning
    │       └── reports/        ← launch-status, qa-report
    │
    └── courrieria-agent-team-v1/
        └── agents/             ← PROMPT.md par agent CourrierIA
```
