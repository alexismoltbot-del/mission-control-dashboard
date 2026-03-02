# 📰 Journalistes.fr — Agent RP IA pour Entrepreneurs

**Date de création :** 18 février 2026  
**Status :** Concept développé — prêt pour validation et MVP  
**Auteur :** Bidi (Agent IA)

---

## 🎯 Proposition de Valeur

**Pour qui :** Entrepreneurs, startups, PME, dirigeants qui veulent de la visibilité média  
**Problème :** Les agences RP coûtent 3-8K€/mois, le DIY est chronophage et on ne sait pas qui contacter  
**Solution :** Agent IA qui identifie les bons journalistes et génère des hooks personnalisés pour chaque parution potentielle  
**Promesse :** "Obtenez votre première parution presse en 48h, sans agence"

---

## 🔍 Analyse du Marché

### Taille du marché (France)

| Segment | Taille | Évolution |
|---------|--------|-----------|
| Marché RP global FR | ~500M€ | +5%/an |
| Agences digitales/RP | ~200M€ | +12%/an |
| Startups/PME (cible) | ~50M€ addressable | Forte demande sous-servie |
| Outils SaaS RP | ~15M€ | +25%/an (segment émergent) |

### Pain Points Validés

1. **Coût prohibitif des agences**
   - Retainer minimum : 3-5K€/mois pour une agence sérieuse
   - PME/startups ne peuvent pas s'y engager dès le début
   - Résultat incertain pour ce prix

2. **Opacité du marché médiatique**
   - Ne sait pas quel journaliste couvre quel sujet
   - Pas de base de données accessible à jour
   - Informations dispersées (Twitter, LinkedIn, Muck Rack US mais rien en FR)

3. **Pitch générique = 0 réponse**
   - 200+ communiqués reçus par jour par un rédacteur en chef
   - Personnalisation manuelle impossible à grande échelle
   - Besoin d'un angle unique par journaliste

4. **Time-to-value trop long**
   - Première mise en relation : semaines/mois
   - Itérations avec l'agence : chronophage
   - Besoin de résultats rapides (annonce produit, levée de fonds)

### Concurrents Actuels

| Concurrent | Type | Prix | Forces | Faiblesses |
|------------|------|------|--------|------------|
| **Agences RP traditionnelles** (Volga, Linker, RP Factory) | Service | 3-8K€/mois | Réseau établi, expertise | Cher, lent, pas scalable |
| **Muck Rack** (US) | SaaS | 5-10K$/an | Base journalistes complète | Pas de couverture FR, cher |
| **Cision/PR Newswire** | SaaS | Sur devis | Distribution massive | Générique, pas personnalisé |
| **Prezly** | SaaS | 300-800€/mois | Gestion relations presse | Pas d'IA, pas de matching |
| **DIY (LinkedIn/Twitter)** | Manuel | Temps | Gratuit | Très chronophage, amateur |

### Opportunity Gap

**Le marché manque d'un outil qui combine :**
- Base de données journalistes FR actualisée (Muck Rack FR n'existe pas vraiment)
- Matching IA produit ↔ journaliste (pas juste une liste)
- Génération de hooks personnalisés (pas de templates génériques)
- Pricing accessible aux startups/PME (<500€/mois)

---

## 💡 Concept Produit

### Nom : Journalistes.fr (ou PressMatch.ai)

### Fonctionnalités Core (MVP)

#### 1. Base Journalistes FR (le fondamental)
```
- 5 000+ journalistes couvrant tech, business, lifestyle, etc.
- Métadonnées : média, beat (sujets), type contenu (newsletter, long format, TV)
- Derniers articles scrapés et analysés par IA
- Contacts (email/Twitter/LinkedIn quand public)
- Historique de parutions similaires
```

**Sources de données :**
- Scraping sites médias (Les Echos, Maddyness, FrenchWeb, etc.)
- Twitter/X journalistes actifs
- LinkedIn (profils publics)
- Newsletters Substack francophones
- Communiqués de presse existants

#### 2. Matching IA Produit ↔ Journaliste
```
Flow utilisateur :
1. User input : "On lance une app IA pour contrats juridiques"
2. IA analyse : sujet, secteur, angle nouveau
3. Matching : identifie journalistes ayant couvert :
   - Legal tech / Contrats
   - IA appliquée au B2B
   - Outils productivité pour PME
   - Ex: "Julie X a écrit sur Notion → intérêt productivity tools"
4. Score de pertinence 0-100%
```

#### 3. Hook Generator Personnalisé
```
Pour chaque journaliste matché :
- Analyse des 10 derniers articles
- Extraction du style, angles préférés, sujets récurrents
- Génération de 3 angles de pitch UNIQUES
- Exemple pour un journaliste "IA éthique" :
  ❌ "Notre app utilise l'IA" (trop générique)
  ✅ "Comment on a réduit de 90% le temps de relecture des contrats sans remplacer les juristes"
  ✅ "L'IA contractuelle : levier d'équité ou risque pour les PME ?"
```

#### 4. Outreach Semi-Automatisé
```
- Génération email personnalisé par journaliste
- Aperçu avant envoi (validation utilisateur)
- Suivi des ouvertures/clics (intégration Mailgun/SendGrid)
- Relances automatiques suggérées après X jours
- Template réponse type aux retours
```

### Features V2 (post-MVP)

| Feature | Description | Valeur |
|---------|-------------|--------|
| **Monitoring mentions** | Alertes quand votre marque est citée | Réactivité RP |
| **Calendrier éditorial** | Agenda launches concurrents, événements sectoriels | Timing parfait |
| **Network effect** | Stats anonymisées : "Ce journaliste répond à 30% des pitches tech" | Data-driven |
| **Communiqué auto** | Génération CP basé sur template marque | Gain de temps |
| **Média training IA** | Simule interview, feedback sur réponses | Préparation |

---

## 🏗️ Architecture Technique

### Stack MVP (1-2 semaines)

| Couche | Technologie | Rationale |
|--------|-------------|-----------|
| **Frontend** | Next.js + Tailwind | Rapide, SEO-friendly |
| **Backend** | Python/FastAPI | Scraping, NLP |
| **Base journalistes** | PostgreSQL + pgvector | Recherche sémantique |
| **IA/LLM** | GPT-4o / Claude 3.5 | Matching, génération hooks |
| **Scraping** | Playwright + BeautifulSoup | Articles, profils |
| **Hosting** | Vercel (front) + Railway (back) | Rapide, pas cher |
| **Email** | Resend/Mailgun | Transactionnels |
| **Auth** | Clerk | Simple, rapide |

### Data Pipeline

```
Sources (médias, Twitter, LinkedIn)
    ↓
Scraper quotidien (Playwright)
    ↓
Extraction NLP (entreprises citées, sujets, ton)
    ↓
Vectorisation + stockage (pgvector)
    ↓
Matching sémantique (produit vs articles)
    ↓
Génération hooks personnalisés (GPT-4)
    ↓
Dashboard utilisateur
```

---

## 💰 Business Model

### Pricing Tiers

| Plan | Prix | Inclus | Cible |
|------|------|--------|-------|
| **Free** | 0€ | 5 recherches/mois, base limitée, hooks basiques | Testeurs, très petites boîtes |
| **Starter** | 49€/mois | 20 recherches, 500 journalistes, hooks IA, 1 utilisateur | Freelances, solopreneurs |
| **Pro** | 149€/mois | Recherches illimitées, base complète, CRM intégré, 3 utilisateurs | Startups, PME |
| **Scale** | 399€/mois | + API, brand monitoring, média training IA, 10 utilisateurs | Scale-ups, agences internes |
| **Enterprise** | Sur devis | On-premise, custom scraping, support dédié | Grands groupes, agences RP |

### Unit Economics (Pro à 149€/mois)

```
Revenu mensuel par client : 149€
Coûts serveurs/IA par client : ~15-25€
Gross Margin : ~85%
CAC estimé (SEO/content) : 200-400€
LTV (churn 5%/mois) : 2 980€
LTV/CAC : 7-15x ✅
```

### Modèles additionnels possibles

1. **Commission sur succès** : % si parution obtenue (à tester)
2. **Marketplace services** : Mise en relation avec agences/freelances RP qualifiés
3. **Data/API** : Vente accès base journalistes (respect RGPD)

---

## 🚀 Go-To-Market Strategy

### Phase 1 : Beta Privée (Mois 1-2)

**Objectif :** 50 utilisateurs beta, valider le matching IA

**Tactics :**
- Lister 100 startups/PME du réseau Alexis
- Offrir 3 mois gratuits contre feedback détaillé
- Slack privé pour itérer rapidement
- Case studies : "Comment X a obtenu un article dans Les Echos"

### Phase 2 : Launch Publique (Mois 3-4)

**Objectif :** 500 utilisateurs, premiers paying customers

**Tactics :**
- **Product Hunt** launch (avec support communauté française)
- **Content marketing** : "Comment pitcher la presse en 2026"
- **Partenariats** : Intégrations Maddyness, Station F, FrenchTech
- **Ambassadeurs** : 10 entrepreneurs influents qui partagent

### Phase 3 : Scale (Mois 6-12)

**Objectif :** 5 000 utilisateurs, 500 paying, 50k€ MRR

**Tactics :**
- **SEO long tail** : "journaliste tech France", "pitch presse startup"
- **Outbound ciblé** : Startups récentes levées de fonds (besoin immédiat RP)
- **Agences RP** : Les vendre comme "outil interne" pour scaler leur activité
- **International** : Expansion UK, DE (même problème)

### Channels Prioritaires

| Channel | Effort | Impact | Timing |
|---------|--------|--------|--------|
| SEO contenu | Moyen | Fort | Continu |
| Product Hunt | Faible | Fort | Launch |
| LinkedIn organique | Faible | Moyen | Continu |
| Partenariats écosystème | Moyen | Très fort | Mois 3+ |
| Ads (Google/LinkedIn) | Moyen | Moyen | Post-PMF |

---

## 🎨 Branding & Positioning

### Positioning Statement

> **Pour** les fondateurs de startups et dirigeants de PME  
> **Qui ont besoin de** visibilité média sans budget agence  
> **Journalistes.fr est un** agent IA de relations presse  
> **Qui** identifie les bons journalistes et génère des pitches personnalisés  
> **Contrairement aux** agences RP traditionnelles  
> **Notre produit** donne des résultats en 48h pour 49€/mois au lieu de 3K€/mois

### Ton de voix

- **Direct** : Pas de jargon RP
- **Efficace** : "Obtenez votre première parution en 48h"
- **Transparent** : On montre les coulisses (algorithme, données)
- **Entrepreneur-friendly** : Compris ce que c'est de manquer de temps/pognon

### Landing Page Key Messages

1. **Hero** : "Votre startup mérite d'être connue. On vous dit qui contacter et comment."
2. **Social Proof** : Logos médias où des clients ont été cités
3. **How it works** : 3 steps — Décrivez votre produit → On trouve les journalistes → On écrit vos pitches
4. **Pricing** : 49€/mois vs 3K€ agence
5. **CTA** : "Obtenez 5 journalistes qualifiés gratuitement"

---

## 📊 KPIs & Success Metrics

### North Star Metric
**Pitchs personnalisés générés** → Proxy de valeur délivrée

### KPIs Mensuels

| KPI | Mois 3 | Mois 6 | Mois 12 |
|-----|--------|--------|---------|
| Utilisateurs inscrits | 500 | 2 000 | 10 000 |
| Utilisateurs actifs/mois | 200 | 800 | 4 000 |
| Paying customers | 20 | 150 | 500 |
| MRR | 3k€ | 22k€ | 75k€ |
| Taux conversion free→pay | 5% | 8% | 10% |
| NPS | +30 | +40 | +50 |
| Articles obtenus via outil (trackés) | 10 | 50 | 200 |

### Metrics Produit

- **Match quality score** : % utilisateurs satisfaits des journalistes suggérés
- **Hook approval rate** : % hooks utilisés tels quels vs modifiés
- **Time saved** : Heures gagnées vs recherche manuelle (enquête utilisateur)
- **Success rate** : % pitches qui génèrent une réponse/parution (tracké via feedback)

---

## ⚠️ Risques & Mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| **Données journalistes obsolètes** | Moyen | Fort | Scraping quotidien + système feedback utilisateur |
| **RGPD / scraping légal** | Moyen | Fort | Se limiter aux données publiques + consentement opt-in |
| **Journalistes submergés de pitches IA** | Élevé | Moyen | Éducation utilisateurs : qualité > quantité |
| **Agences RP comme concurrentes** | Faible | Moyen | Les vendre comme clients potentiels (outil interne) |
| **Pas de moat technique** | Élevé | Fort | Data network effect + communauté + brand |
| **Difficulté à prouver le ROI** | Moyen | Fort | Tracking parutions + case studies chiffrés |

---

## 🗺️ Roadmap

### Sprint 0 (Semaine 1-2) — Foundation
- [ ] Setup technique (DB, scraping base)
- [ ] Scraper 500 journalistes tech/business
- [ ] Prototype matching IA (GPT + vector search)
- [ ] Maquette Figma landing page

### Sprint 1 (Semaine 3-4) — MVP Core
- [ ] Dashboard recherche produit
- [ ] Résultats : journalistes matchés + articles récents
- [ ] Génération hooks IA v1
- [ ] Export liste (CSV)

### Sprint 2 (Semaine 5-6) — Outreach
- [ ] Intégration email (envoi via plateforme)
- [ ] Templates personnalisés
- [ ] Suivi ou
vertures/clics
- [ ] Relances automatiques

### Sprint 3 (Semaine 7-8) — Launch
- [ ] Système de pricing & paiement (Stripe)
- [ ] Onboarding utilisateur optimisé
- [ ] Collecte feedback intégrée
- [ ] Prep Product Hunt + contenu launch

### V2 (Mois 4-6)
- [ ] Monitoring mentions marque
- [ ] Calendrier éditorial sectoriel
- [ ] API ouverte
- [ ] Média training IA

---

## 💭 Réflexions Stratégiques

### Pourquoi cette idée maintenant ?

1. **Timing parfait** : explosion des agents IA en 2025-2026
2. **Pain point persistant** : RP reste opaque et cher malgré la digitalisation
3. **Muck Rack FR inexistant** : gap géographique énorme
4. **Expertise Alexis** : réseau média, expérience content/GTM
5. **Distribution naturelle** : produit qui se vend via... RP !

### Alternative Naming

- PressMatch.ai
- RPflow.fr
- PitchPilot.fr
- Mediabot.fr
- Echos.ai

### Potentiel d'expansion

- **UK/DE** : même problème, marché plus gros
- **Influenceurs** : extension au marketing d'influence
- **Analystes** : relations analystes (Gartner, etc.)
- **Podcasters** : identification invités/experts

### Success metrics à 2 ans

- 1 000+ clients payants
- 75k€ MRR
- Expansion internationale (UK, DE)
- Acquisition par HubSpot/Salesforce ?

---

## 📚 Annexes

### Benchmark Muck Rack (US)

- Prix : 5 000-10 000$/an
- Features : base journalistes, monitoring, reporting
- Positionnement : agences RP + grands groupes
- Gap : pas de matching IA, pas de génération de pitches

### Liste médias cibles prioritaires (FR)

**Tech/Business :**
- Les Echos (Start, Les Echos Week-end)
- Maddyness
- FrenchWeb
- L'Usine Digitale
- TechCrunch France
- BFMTech

**Généralistes :**
- Le Monde (Start-up, Economie)
- Le Figaro (Entreprises)
- Libération
- France Inter / France Info

**Newsletters :**
- La Newsletter de L essentiel (Florent)
- French Tech Journal
- Tech.eu

---

*Document créé automatiquement par Bidi lors du night-work du 18 février 2026*
