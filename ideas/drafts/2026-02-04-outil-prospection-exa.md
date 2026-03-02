# Outil Prospection Exa.ai — ProspectPilot

**Date :** 4 février 2026  
**Statut :** Idée développée  
**Tier :** 2 (Fort potentiel)

---

## 🎯 Concept Core

**Pitch 1 phrase :**  
"Cherche tes prospects en langage naturel — emails, téléphones, et contexte commercial — sans jongler entre 5 outils."

**Positionnement :**  
Wrapper intelligent autour d'Exa.ai + APIs publiques françaises (INSEE, Pappers) + enrichissement contacts (emails/téléphones) + détection d'appels d'offres publics.

**Cible :**  
- Solopreneurs et dirigeants de TPE/PME (0-10 personnes)
- Agences de prospection
- Commerciaux indépendants
- Startups en phase de lancement commercial

---

## 💡 Pourquoi ça peut marcher

### 1. Les outils actuels sont chers et complexes

**Pharow (référence marché FR) :**
- 139€/mois (engagement mensuel) ou 89€/mois (annuel)
- 1000 crédits/mois (1 crédit = 1 prospect ajouté)
- Enrichissement email inclus (Dropcontact + FullEnrich + Zerobounce)
- Téléphones = abonnement séparé obligatoire (Kaspr, FullEnrich, BetterContact)
- Interface complexe avec courbe d'apprentissage

**Apollo.io / Cognism :**
- Pricing opaque, devis uniquement
- Orientés équipes commerciales (5+ personnes)
- Peu adaptés au marché français

**Sales Navigator (LinkedIn) :**
- 80-100€/mois
- Pas d'emails directs
- Données export limitées
- Doit être complété par 3-4 autres outils

### 2. Stack actuelle = enfer pour le solo

Pour prospecter efficacement aujourd'hui, un solo entrepreneur doit :

1. **Chercher les entreprises** : Pharow, Sales Navigator, Google (150€/mois)
2. **Trouver les emails** : Dropcontact, Hunter, Lusha (50-100€/mois)
3. **Trouver les téléphones** : Kaspr, Datagma (50-100€/mois)
4. **Enrichir les données** : Pappers, INSEE (0-50€/mois)
5. **Détecter les AO publics** : FranceMarchés, BOAMP (alertes gratuites mais bruit énorme)
6. **Organiser tout ça** : CRM (50-100€/mois)

**Total : 300-500€/mois + temps de jonglage entre outils**

### 3. Exa.ai change la donne

**Pourquoi Exa est parfait pour ce use case :**

- **Recherche sémantique intelligente** : "entreprises de BTP 20-50 salariés région Île-de-France qui recrutent"
- **Pas de mots-clés rigides** : fonctionne en langage naturel
- **Scraping + crawling intégrés** : récupère le contenu des sites
- **Pricing accessible** : 
  - 10$ de crédits gratuits pour démarrer
  - 5$/1000 requêtes (mode Fast/Auto/Neural, 1-25 résultats)
  - 25$/1000 requêtes (26-100 résultats)
  - 15$/1000 pages crawlées

**Ce qu'Exa NE fait PAS (notre valeur ajoutée) :**
- Croiser avec INSEE/Pappers pour enrichir avec données officielles FR
- Extraire emails/téléphones des décideurs
- Organiser et filtrer les résultats
- Interface simple pour non-techs
- Détection automatique d'appels d'offres publics

---

## 🏗️ Produit V1 — MVP

### Interface utilisateur

**1. Recherche en langage naturel**
```
🔍 "Restaurants 10-50 salariés Lyon qui ont levé des fonds en 2025"
🔍 "Cabinets d'expertise comptable Hauts-de-France"
🔍 "Entreprises BTP qui cherchent un logiciel de gestion"
```

**2. Résultats enrichis automatiquement**

Pour chaque entreprise trouvée :
- ✅ Nom, SIREN, SIRET (via Pappers/INSEE)
- ✅ Adresse, ville, région
- ✅ CA, effectifs, année de création
- ✅ Dirigeant principal
- ✅ Email du dirigeant (Dropcontact API ou pattern matching)
- ✅ Téléphone (si trouvé via scraping ou Pappers)
- ✅ Site web + dernière actualité (Exa crawling)
- ⚠️ Signal commercial (levée de fonds, recrutement, AO en cours)

**3. Export CSV/Excel en 1 clic**

Colonnes :
```
Nom entreprise | SIREN | CA | Effectif | Ville | Dirigeant | Email | Téléphone | Site | Signal
```

### Backend — Stack technique V1

**Architecture simple :**
```
User input (prompt) 
  → Exa.ai search API (trouve entreprises + sites web)
  → Pappers API (enrichissement SIREN, CA, dirigeant)
  → Email enrichment (Dropcontact API OU pattern matching maison)
  → Téléphone (scraping site web + extraction)
  → Résultats formatés + export
```

**APIs nécessaires :**
1. **Exa.ai** — Recherche sémantique + crawling (pay-as-you-go)
2. **Pappers** — Données entreprises françaises (GRATUIT pour usage basique)
3. **Dropcontact** — Emails (29€/mois pour 500 emails OU développer pattern matching)
4. **OpenAI GPT-4** — Extraction structurée depuis sites web + classification signaux

**Coût opérationnel estimé par recherche :**
- Exa : 0,005$ (5 cents) pour 1 recherche = 25 entreprises
- Pappers : Gratuit (API publique INSEE/INPI)
- Emails : 0,06€/email (Dropcontact) OU gratuit si pattern matching
- GPT-4 : ~0,02$/entreprise pour extraction structurée

**Total : ~0,10-0,15€ par entreprise enrichie**

---

## 💰 Business Model

### Pricing V1 — Freemium agressif

**Plan Gratuit :**
- 10 recherches/mois
- 25 entreprises max par recherche
- Export CSV
- Enrichissement basique (nom, SIREN, ville)
- **Objectif :** Acquisition virale, tester le produit

**Plan Solo : 29€/mois**
- 100 recherches/mois
- 100 entreprises max par recherche
- Enrichissement complet (emails, téléphones, signaux)
- Export CSV/Excel
- Historique 30 jours
- **Cible :** Solopreneurs, freelances commerciaux

**Plan Pro : 79€/mois**
- Recherches illimitées
- 500 entreprises max par recherche
- Enrichissement premium (téléphones mobiles vérifiés)
- Intégration CRM (HubSpot, Pipedrive)
- Détection AO publics automatique
- Historique illimité
- **Cible :** TPE, agences de prospection

**Plan Enterprise : Sur devis**
- API access
- Custom data sources
- White label
- Volume pricing
- **Cible :** Agences, SaaS avec besoin d'intégration

### Économie unitaire

**Plan Solo (29€/mois) :**
- Utilisateur moyen : 50 recherches × 50 entreprises = 2500 entreprises/mois
- Coût opérationnel : 2500 × 0,12€ = 300€
- ❌ **Économie négative** — Il faut limiter les volumes OU augmenter le prix

**Plan Solo AJUSTÉ (49€/mois) :**
- 50 recherches/mois
- 50 entreprises max par recherche = 2500 entreprises/mois max
- Coût opérationnel plafonné : 300€
- Marge : -251€ ❌

**Problème identifié :** Le coût d'enrichissement explose si on inclut emails/téléphones pour chaque entreprise.

### Solution : Crédits séparés pour enrichissement

**Nouveau pricing :**

**Plan Solo : 29€/mois**
- Recherches illimitées
- Export CSV (nom, SIREN, CA, effectif, dirigeant, site) : GRATUIT
- 100 crédits d'enrichissement inclus
- 1 crédit = 1 email enrichi
- 10 crédits = 1 téléphone enrichi

**Achat de crédits supplémentaires :**
- Pack 100 crédits : 15€
- Pack 500 crédits : 60€
- Pack 1000 crédits : 100€

**Économie unitaire révisée :**
- Abonnement 29€/mois = coûts fixes (Exa + Pappers + hosting) ~10€
- Marge sur abonnement : 19€
- Enrichissement email : 0,10€ de coût, vendu 0,15€ (crédit) → marge 0,05€
- Enrichissement téléphone : 1€ de coût, vendu 1,50€ (10 crédits) → marge 0,50€

**Rentabilité : ✅ Viable**

---

## 📊 Taille de marché

### Marché France

**Cibles principales :**
- **Solopreneurs/freelances commerciaux** : ~500k personnes actives
  - Taux de conversion potentiel : 0,5% = 2 500 clients
  - ARR potentiel : 2 500 × 29€ × 12 = 870k€

- **TPE/PME avec fonction commerciale** : ~200k entreprises
  - Taux de conversion potentiel : 0,2% = 400 clients
  - ARR potentiel : 400 × 79€ × 12 = 379k€

**Total marché accessible Year 1 : ~1,2M€ ARR**

### Benchmark concurrence

| Outil | Pricing | Positionnement | Faiblesse |
|-------|---------|----------------|-----------|
| **Pharow** | 139€/mois | Complet, data FR | Cher, complexe |
| **Sales Navigator** | 80€/mois | LinkedIn only | Pas d'emails directs |
| **Apollo.io** | 99$/user/mois | Global, US-centric | Data FR faible |
| **Dropcontact** | 29€/mois | Emails only | Pas de ciblage entreprises |
| **Clay.com** | 149$/mois (starter) | Hyper-personnalisation IA | Très complexe, US-centric, cher |

**Note sur Clay.com :**
- Concurrent sérieux, levée massive (Series B)
- Positionnement "power users" (équipes sales tech-savvy)
- Pricing système crédits complexe (10$/mois à 195$/mois selon plans)
- Interface très technique (type no-code automation)
- **Gap marché :** PME françaises cherchent plus simple et moins cher

**Notre positionnement :**
- **Plus simple que Pharow ET Clay** (prompt vs filtres/workflows)
- **Plus complet que Sales Navigator** (emails/téléphones inclus)
- **Mieux adapté à la France** qu'Apollo ou Clay
- **Tout-en-un** vs stack de 5 outils
- **Accessible** (29€/mois vs 149$/mois Clay)

---

## 🚀 Go-To-Market

### Phase 1 : Launch (Mois 1-2)

**Objectif : 50 early adopters payants**

**Canaux :**
1. **LinkedIn (organique)** :
   - Poster le process : "Comment j'ai trouvé 100 prospects qualifiés en 10 minutes"
   - Démo vidéo : Prompt → Résultats → Export
   - Partager les premiers clients (témoignages)

2. **ProductHunt** :
   - Launch avec early bird pricing (19€/mois au lieu de 29€)
   - Lifetime deal pour les 100 premiers (249€ one-time)

3. **Substack / Blog** :
   - Article : "Comment prospecter sans Sales Navigator ni Pharow"
   - Guide : "Prospection B2B en 2026 : outils, coûts, comparatifs"

4. **Réseau direct Alexis** :
   - Entrepreneurs ESSEC
   - Réseau Free/Iliad
   - Prospects Clawdbot qui n'ont pas signé

**Pricing spécial launch :**
- 19€/mois (au lieu de 29€) — 3 premiers mois
- Puis 29€/mois sans engagement

### Phase 2 : Traction (Mois 3-6)

**Objectif : 200 clients payants**

**Leviers :**
1. **SEO agressif** :
   - "Trouver des prospects B2B France"
   - "Alternative Pharow moins chère"
   - "Prospection B2B sans Sales Navigator"
   - "Emails dirigeants PME France"

2. **Contenu LinkedIn régulier** :
   - 2x/semaine : cas d'usage, résultats clients
   - Thread "J'ai trouvé X prospects en Y minutes pour [secteur]"

3. **Partenariats affiliés** :
   - Influenceurs prospection B2B (commission 30% first year)
   - Formateurs LinkedIn / Growth

4. **Intégrations** :
   - HubSpot, Pipedrive (sync auto des listes)
   - Lemlist, LaGrowthMachine (export direct)

### Phase 3 : Scale (Mois 6-12)

**Objectif : 500-1000 clients payants**

**Leviers :**
1. **Ads payants** :
   - Google Ads sur mots-clés concurrents
   - LinkedIn Ads (ciblage commerciaux, dirigeants PME)
   - Budget : 2-3k€/mois, CAC cible <100€

2. **Programme ambassador** :
   - Top users deviennent affiliés (40% commission récurrente)
   - Créent du contenu, partagent leurs workflows

3. **Features avancées** :
   - Détection signaux d'achat (recrutement, levée, AO publics)
   - Scoring automatique des prospects
   - Campagnes email intégrées (concurrencer Lemlist)

---

## 🛠️ Roadmap Développement

### MVP (2-3 semaines)

**Features core :**
- [ ] Interface prompt + recherche Exa.ai
- [ ] Enrichissement Pappers (SIREN, CA, dirigeant)
- [ ] Export CSV basique
- [ ] Authentification utilisateur (Clerk ou Supabase Auth)
- [ ] Stripe billing (plan Solo uniquement)

**Stack :**
- Frontend : Next.js + Tailwind
- Backend : Next.js API routes
- DB : Supabase (Postgres)
- Hosting : Vercel
- Payments : Stripe

**Coût setup : 0€** (tout en freemium jusqu'à scale)

### V1.1 (Mois 1)

- [ ] Enrichissement emails (Dropcontact API)
- [ ] Système de crédits
- [ ] Historique des recherches
- [ ] Filtres post-recherche (CA, effectif, région)

### V1.2 (Mois 2)

- [ ] Enrichissement téléphones (scraping + API)
- [ ] Détection signaux commerciaux (levées, recrutements)
- [ ] Export Excel avancé (colonnes personnalisables)
- [ ] Plan Pro + intégration HubSpot

### V2.0 (Mois 3-4)

- [ ] Détection AO publics automatique
- [ ] Scoring prospects (chaud/tiède/froid)
- [ ] Recherches sauvegardées + alertes
- [ ] API publique (plan Enterprise)

---

## ⚠️ Risques & Mitigation

### Risque 1 : Coûts d'enrichissement explosent

**Mitigation :**
- Système de crédits strict (pas d'enrichissement illimité)
- Pattern matching emails maison pour réduire dépendance Dropcontact
- Scraping téléphones gratuit avant API payante

### Risque 2 : Qualité des données variable

**Mitigation :**
- Validation manuelle des 100 premiers résultats
- Score de confiance affiché pour chaque donnée
- Feedback loop : users peuvent signaler erreurs

### Risque 3 : Concurrence féroce (Pharow, etc.)

**Mitigation :**
- Positionnement "simple et accessible" vs "complet et complexe"
- Pricing agressif pour early adopters
- Features différenciantes (AO publics, scoring IA)

### Risque 4 : Dépendance Exa.ai

**Mitigation :**
- Développer scraping maison en parallèle
- Intégrer d'autres sources (Bright Data, Apify)
- Architecture modulaire (facile de swapper Exa)

### Risque 5 : RGPD / légalité prospection

**Mitigation :**
- Disclaimer clair : "Données publiques uniquement"
- Pas de stockage long terme des données persos
- Opt-out facile pour entreprises qui veulent être retirées
- Conformité CNIL (pas de scraping emails persos, uniquement pros)

---

## 📈 Projections Financières (12 mois)

### Hypothèses conservatives

| Mois | Clients | MRR | Coûts Ops | Marge |
|------|---------|-----|-----------|-------|
| M1 | 20 | 580€ | 200€ | 380€ |
| M2 | 50 | 1 450€ | 400€ | 1 050€ |
| M3 | 100 | 2 900€ | 700€ | 2 200€ |
| M6 | 250 | 7 250€ | 1 500€ | 5 750€ |
| M12 | 500 | 14 500€ | 3 000€ | 11 500€ |

**ARR Year 1 : ~174k€**  
**Marge nette estimée : 60-70%**

### Hypothèses optimistes

| Mois | Clients | MRR | Coûts Ops | Marge |
|------|---------|-----|-----------|-------|
| M3 | 200 | 5 800€ | 1 200€ | 4 600€ |
| M6 | 500 | 14 500€ | 3 000€ | 11 500€ |
| M12 | 1000 | 29 000€ | 6 000€ | 23 000€ |

**ARR Year 1 : ~348k€**  
**Marge nette estimée : 70-80%**

---

## 🎯 Décision : Ship ou Non ?

### ✅ Arguments POUR

1. **Besoin réel et vécu** — Tu prospectes actuellement pour Clawdbot, tu sais que c'est chiant
2. **Marché accessible** — 1,2M€ ARR potentiel rien qu'en France
3. **Pricing validé** — Pharow à 139€/mois prouve que les gens paient
4. **Tech faisable** — MVP en 2-3 semaines avec stack connue
5. **Synergies ALMAVI** — ProspectPilot peut alimenter FiscalGPT, ExpliqueMaCompta
6. **Potentiel SaaS pur** — Pas de service, pas de support lourd, scalable

### ⚠️ Arguments CONTRE

1. **Concurrence établie** — Pharow, Sales Navigator déjà bien implantés
2. **Coûts ops à surveiller** — Économie unitaire serrée si enrichissement massif
3. **Dépendance externe** — Exa.ai, Pappers, Dropcontact peuvent changer pricing
4. **Temps de dev** — 2-3 semaines full-time, détourne de Clawdbot Services
5. **Risque légal RGPD** — Prospection B2B = zone grise, faut être clean

---

## 💡 Recommandation Finale

**✅ À SHIP** — Mais en version ultra-lean et en parallèle de Clawdbot Services.

**Pourquoi :**
- C'est un **besoin que tu as MAINTENANT** pour prospecter tes clients Clawdbot
- Tu peux développer l'outil **POUR toi d'abord**, puis le vendre ensuite
- Si ça marche pas en SaaS, ça reste un outil interne utile

**Approche recommandée :**

### Phase 0 : Outil interne (1 semaine)

- Build version basique pour TON usage
- Prompt → Exa → Pappers → Export CSV
- Pas de pricing, pas d'auth, juste un script
- **Objectif :** Trouver 50 prospects Clawdbot avec

### Phase 1 : MVP public (1 semaine supplémentaire)

- Ajouter auth + Stripe
- Landing page simple
- Lancer à 19€/mois (early bird)
- Poster sur LinkedIn : "J'ai codé mon outil de prospection en 2 semaines, voilà le résultat"

### Phase 2 : Validation (1 mois)

- Objectif : 20 clients payants
- Si atteint → continuer
- Si pas atteint → garder en interne, pas de marketing

**Investissement total : 2-3 semaines de dev + 0€ de cash**

---

## 🔗 Ressources

**APIs à tester :**
- [Exa.ai](https://exa.ai)
- [Pappers API](https://www.pappers.fr/api)
- [Dropcontact](https://www.dropcontact.com)

**Benchmarks à suivre :**
- [Pharow](https://www.pharow.com)
- [Apollo.io](https://www.apollo.io)
- [Sales Navigator](https://www.linkedin.com/sales/ssi)

**Lectures :**
- Thread "How to build a SaaS in 2 weeks" (Pieter Levels)
- Article "Wrapping APIs is a valid business model" (Indie Hackers)

---

## 📝 Prochaines étapes

Si tu décides de lancer :

1. **Créer un compte Exa.ai** → tester l'API avec des vraies recherches
2. **Tester Pappers API** → valider qu'on récupère bien les bonnes infos
3. **Coder MVP interne** → 1 semaine max
4. **L'utiliser pour prospecter 50 clients Clawdbot**
5. **Décider si on en fait un produit** ou si ça reste interne

**Temps estimé total : 2-3 semaines**  
**Investissement : 0€** (tout en freemium jusqu'à premiers clients)

---

*Développé par Bidi — 4 février 2026, 1h-3h du matin*
