# IA & Santé Mentale en Entreprise — Business Plan & Stratégie Go-To-Market

*Développé dans la nuit du 16/02/2026*

---

## 🎯 EXECUTIVE SUMMARY

**Concept :** Plateforme IA de santé mentale B2B2C pour les entreprises françaises

**Problème adressé :**
- 59% des actifs décrivent le travail comme source de stress
- 56% comme source de fatigue
- 41% ont déjà connu un burn-out
- Doublement des maladies professionnelles liées aux troubles psychologiques entre 2020-2024
- Les hotlines psy et PAE (Programmes d'Aide aux Employés) traditionnels ont un taux d'usage catastrophique : 1-2% seulement

**Solution :** Assistant IA conversationnel accessible 24/7 qui :
1. Démocratise l'accès (barrière psychologique plus faible qu'un humain)
2. Détecte précocement les signaux faibles
3. Oriente vers les bons professionnels humains quand nécessaire
4. Fournit du coaching quotidien, journaling guidé, exercices de résilience
5. Génère des insights anonymisés pour l'entreprise (sans jamais compromettre la confidentialité individuelle)

**Marché :**
- Marché français santé mentale numérique : 1,26 Md$ en 2024 → 8,14 Md$ en 2035 (TCAC 18,48%)
- Santé mentale = Grande Cause Nationale 2026
- Budget QVT en explosion dans les entreprises
- 2026 : contexte de transition sociétale (IA, incertitudes économiques, guerres) qui exacerbe les questionnements

**Business Model :**
- B2B2C : vente aux entreprises (RH/QVT)
- Pricing : 15-25€/employé/an ou forfait 5-15k€/an selon taille
- 3 canaux de distribution : Mutuelles, RH/QVT entreprises, Complémentaires santé (Alan, Qare, etc.)

**Unfair Advantage Alexis :**
- Expérience profonde du coaching/psy (game changer dans sa vie)
- Capacité à build avec IA (Cursor + Claude)
- Positionnement public fort sur LinkedIn (crédibilité, audience)
- Contexte France (barrières linguistiques/culturelles/réglementaires)
- Réseau entrepreneurs + ESSEC

---

## 📊 ÉTAT DU MARCHÉ FRANCE 2026

### Chiffres clés

**Marché global :**
- **Taille marché 2024 :** 1,26 milliard USD
- **Prévision 2035 :** 8,14 milliards USD
- **TCAC 2025-2035 :** 18,48%
- **Grande Cause Nationale 2026 :** Santé mentale

**Problèmes au travail :**
- 59% : travail = source de stress
- 56% : travail = source de fatigue
- 41% : ont déjà connu un burn-out
- **x2 cas de maladies pro psychologiques 2020-2024**
- Stigmatisation autour des arrêts maladie psy en hausse
- Coût caché de l'absentéisme/présentéisme massif

### Solutions existantes : taux d'échec catastrophique

**Hotlines psy / PAE traditionnels :**
- Accessibilité 24/7, budgets conséquents
- **Taux d'usage réel : 1-2% seulement**
- Freins identifiés :
  - Stigmatisation
  - Confiance fragile (confidentialité perçue comme incertaine)
  - Formats inadaptés (téléphone = barrière)
  - Logique "quick fix" (pas de continuité)
  - Absence de cadre / orientation

**Opportunité :** L'IA peut lever ces barrières

---

## 💡 POSITIONNEMENT PRODUIT

### Ce que l'IA apporte vs solutions existantes

| Critère | Hotlines/PAE traditionnels | IA Santé Mentale |
|---------|---------------------------|------------------|
| **Accessibilité** | Téléphone, heures ouvrées étendues | 24/7, chat/voix, multicanal (WhatsApp, Slack, app) |
| **Barrière psychologique** | Forte (appeler = avouer un problème) | Faible (converser = normal) |
| **Continuité** | Pas de suivi, interlocuteur change | Mémoire totale, personnalisation croissante |
| **Détection précoce** | Réactif uniquement | Proactif : signaux faibles via NLP |
| **Orientation** | Générique | Précise (trouble identifié → bon spécialiste) |
| **Coût marginal** | Élevé (humain par appel) | Quasi-nul (scale illimité) |
| **Insights entreprise** | Aucun | Anonymisés, exploitables (tendances, alertes) |

### Principes éthiques non-négociables

1. **L'IA n'est PAS un remplacement des humains** — c'est un levier d'accès et d'orientation
2. **Confidentialité absolue** — données individuelles jamais partagées avec l'employeur
3. **Transparence** — l'utilisateur sait qu'il parle à une IA
4. **Orientation systématique** — vers professionnels certifiés pour situations critiques
5. **Conformité RGPD** — hébergement France, chiffrement E2E

---

## 🚀 PRODUIT — V1 MVP

### Features Core

**1. Assistant conversationnel multi-canal**
- WhatsApp, Slack, Teams, app web/mobile
- Voix + texte
- Disponible 24/7

**2. Journaling guidé quotidien**
- Questions adaptées selon humeur
- Détection signaux faibles (lexique, fréquence, tonalité)
- Historique privé consultable

**3. Coaching personnalisé**
- Exercices respiration, méditation guidée
- Techniques cognitives (recadrage, gratitude)
- Psychoéducation (comprendre stress, anxiété, etc.)

**4. Détection & orientation**
- Algorithme de scoring (niveau stress/anxiété/dépression)
- Seuils d'alerte → recommandation consultation humaine
- Annuaire intégré psychologues/psychiatres partenaires

**5. Dashboard entreprise (anonymisé)**
- Indicateurs agrégés : niveau de stress moyen, tendances
- Alertes : pic détecté dans un service
- Recommandations actions RH
- **Jamais d'accès aux données individuelles**

### Stack Technique V1

- **Backend :** Supabase (PostgreSQL + Auth + Storage)
- **IA :** Claude 4.5 Sonnet (conversations), GPT-4o (détection)
- **Frontend :** Next.js + Tailwind
- **Intégrations :** WhatsApp Business API, Slack API, Teams
- **Hébergement :** France (OVH ou Scaleway pour conformité RGPD)
- **Monitoring :** Sentry + Posthog

### Délai MVP : 4-6 semaines solo

---

## 💰 BUSINESS MODEL

### Pricing B2B

**Modèle 1 : Par utilisateur actif**
- 15€/employé/mois pour 50-200 employés
- 12€/employé/mois pour 200-1000
- 10€/employé/mois pour 1000+
- Facturation annuelle

**Modèle 2 : Forfait**
- Starter (50-100 employés) : 6 000€/an
- Growth (100-500) : 15 000€/an
- Enterprise (500+) : sur-mesure, 30-80k€/an

**Services additionnels (optionnels) :**
- Formation managers à l'utilisation : 2 000€/session
- Accompagnement RH déploiement : 5 000€
- Rapports trimestriels détaillés : +20%

### Coûts structure

**Coûts variables (par utilisateur/mois) :**
- API IA (Claude/GPT) : ~2-3€
- Infrastructure cloud : 0,50€
- Intégrations : 0,20€
- **Total COGS : ~3€/user/mois**

**Marge brute : 75-80%** (pricing 12-15€)

**Coûts fixes mensuels MVP :**
- Infra de base : 200€
- Outils (Supabase Pro, etc.) : 150€
- WhatsApp Business API : 100€
- **Total fixe : ~500€/mois**

### Projection Revenus Année 1

**Hypothèse conservative :**
- 10 clients PME (moyenne 150 employés chacun)
- Taux d'adoption interne : 40% (60 users actifs/entreprise)
- Pricing : 12€/user/mois

**Calcul :**
- 10 clients × 60 users × 12€ × 12 mois = **86 400€ ARR**

**Objectif ambitieux :**
- 25 clients
- **216 000€ ARR**

---

## 🎯 STRATÉGIE GO-TO-MARKET

### Phase 1 : Validation (Mois 1-3)

**Objectif :** 5 clients pilotes payants

**Cible :**
- PME 50-300 employés
- Secteurs : Tech, conseil, services
- Déjà sensibilisées QVT

**Approche :**
1. **Réseau direct Alexis** (entrepreneurs ESSEC, ex-collègues Iliad)
2. **Pricing pilote :** 50% de réduction la 1ère année (appel à l'early adoption)
3. **Accompagnement premium** inclus
4. **Feedback loops hebdomadaires** → amélioration produit

**KPIs Phase 1 :**
- 5 clients signés
- Taux d'adoption interne >30%
- NPS >40
- 2-3 témoignages vidéo

### Phase 2 : Distribution via Partenaires (Mois 4-12)

**Canal 1 : Mutuelles & Assurances**
- Approche : co-branding, outil offert aux entreprises clientes
- Exemples cibles : Harmonie Mutuelle, MGEN, Malakoff Humanis
- Deal type : Licence blanche ou revenue share 70/30

**Canal 2 : Complémentaires Santé Digitales**
- Alan, Qare, Livi
- Intégration comme brique santé mentale de leur offre
- Deal : API + white-label ou affiliation

**Canal 3 : Cabinets Conseil RH / QVT**
- Proposer comme outil dans leurs audits/accompagnements
- Commission 20% sur ventes générées

**Canal 4 : Réseaux d'entrepreneurs**
- CCI, BPI, réseaux patronaux (CPME, MEDEF)
- Webinars + démos

### Phase 3 : Scale (Année 2)

- Automatisation onboarding
- Self-service pour PME <50
- Expansion grands comptes (500-5000 employés)
- Levée de fonds Seed si traction validée (optionnel)

---

## 🔍 ANALYSE CONCURRENCE

### Players US (benchmark)

**Spring Health**
- Valorisation : $3,3 Mds (2022)
- Modèle : IA + réseau psy, orientation personnalisée
- Clients : >800 entreprises (Salesforce, Target)
- Pricing : $2-6/employé/mois

**Lyra Health**
- Valorisation : $5,58 Mds
- Modèle : Plateforme + thérapie digitale + coaching
- Clients : 20M+ vies couvertes

**Modern Health**
- Valorisation : $1,17 Mds
- Modèle : Préventif + coaching + thérapie
- Clients : Lyft, Pixar, Udemy

**Talkspace**
- Public (NASDAQ)
- Modèle : Thérapie par message/vidéo, abonnement
- B2C + B2B

### Players France

**Marché encore très fragmenté :**
- Moodwork (TCC digitale)
- Qare (téléconsultation psy, pas IA native)
- Teale (bien-être au travail, pas focus santé mentale)
- **Pas de leader IA-native comme aux US**

**Opportunité :** Être le Spring Health français

---

## ⚡ UNFAIR ADVANTAGES ALEXIS

### 1. Vécu personnel profond
- Coaching/psy = game changer dans sa vie
- Conviction authentique (pas juste une opportunité business)
- Légitimité dans le discours

### 2. Capacité technique
- Build solo avec Cursor + Claude
- Itération ultra-rapide (MVP en 4-6 semaines)
- Pas de dépendance à une équipe tech

### 3. Positionnement public fort
- Audience LinkedIn qualifiée (entrepreneurs, dirigeants)
- Crédibilité via partage transparent
- Distribution organique via contenu

### 4. Barrières France
- Langue (nuances culturelles critiques en psy)
- RGPD/conformité (hébergement France)
- Contexte réglementaire (remboursement sécu à venir ?)

### 5. Réseau
- Entrepreneurs (early adopters naturels)
- ESSEC (accès DRH, alumni)
- Ex-Iliad/Free (corporates)

---

## 🚧 RISQUES & MITIGATION

### Risque 1 : Réglementaire
**Problème :** IA en santé = zone grise juridique
**Mitigation :**
- Disclaimers clairs (pas un dispositif médical)
- Orientation systématique vers pros certifiés
- Conformité RGPD maximale
- Veille réglementaire active

### Risque 2 : Acceptation utilisateurs
**Problème :** Peur de l'IA, préférence pour humain
**Mitigation :**
- Positionnement "complément, pas remplacement"
- Transparence totale (tu parles à une IA)
- Preuves scientifiques (études efficacité TCC digitale)

### Risque 3 : Concurrence US débarque
**Problème :** Spring Health/Lyra s'internationalisent
**Mitigation :**
- Jouer la carte locale (langue, culture, RGPD)
- Partenariats mutuelles françaises (lock-in)
- Vitesse d'exécution

### Risque 4 : Modèle économique entreprises
**Problème :** Budget QVT en tension selon conjoncture
**Mitigation :**
- Pricing agressif vs alternatives (hotlines = 50-100€/employé/an)
- ROI mesurable (réduction absentéisme)
- Modèle aussi B2C si nécessaire (9€/mois particuliers)

---

## 📅 ROADMAP 6 MOIS

### Mois 1-2 : BUILD MVP
- Semaine 1-2 : Architecture + backend Supabase
- Semaine 3-4 : Agent IA conversationnel (Claude)
- Semaine 5-6 : Intégration WhatsApp + interface web
- Semaine 7-8 : Dashboard entreprise + détection signaux faibles

### Mois 3 : PILOTE
- 3 clients pilotes (gratuits ou -70%)
- 15-30 utilisateurs actifs
- Feedback quotidien
- Itérations rapides

### Mois 4 : COMMERCIALISATION
- Pricing finalisé
- 2 clients payants (objectif 5k€ MRR combiné)
- Contenu LinkedIn intensif (3-4 posts/semaine)
- 1 article Substack "IA & Santé Mentale : mon retour d'expérience"

### Mois 5-6 : SCALE PARTENARIATS
- Approche 5 mutuelles
- Démo avec Alan/Qare
- Participation salon RH/QVT
- Objectif : 10 clients, 15k€ MRR

---

## 💭 RÉFLEXIONS STRATÉGIQUES

### Pourquoi MAINTENANT ?

1. **Contexte sociétal :** Transition IA + incertitudes = questionnements massifs
2. **Réglementaire :** 2026 = Grande Cause Nationale Santé Mentale
3. **Technologique :** IA conversationnelle enfin mature (Claude, GPT-4)
4. **Marché :** Solutions existantes échouent (1-2% d'usage)
5. **Personnel :** Alexis au bon moment (expertise tech + conviction psy)

### Build in Public ou Stealth ?

**Recommandation : BUILD IN PUBLIC**

**Pourquoi :**
- Crédibilité via transparence
- Distribution gratuite via audience LinkedIn
- Feedback early adopters
- Différenciation vs concurrence corporate opaque

**Comment :**
- Substack hebdo sur l'avancement
- LinkedIn 3x/semaine (learnings, chiffres, défis)
- Vidéos démo courtes
- Partage code (certains modules open source)

### Levée de Fonds : OUI ou NON ?

**Position Alexis actuelle :** 4 ans de runway, préférence solo

**Recommandation Phase 1 (0-12 mois) : BOOTSTRAPPED**
- Valider PMF d'abord
- Garder contrôle total
- Vitesse d'exécution maximale

**Si traction forte (50+ clients, 50k€+ MRR) :**
- Seed 500k-1M€ envisageable
- Pour : Sales, partenariats mutuelles, R&D (modèles IA propriétaires)
- VCs santé/impact : Elaia, Breega, Kima Ventures

### Sortie Long Terme ?

**Scénario 1 : Acquisition par mutuelle/assureur**
- Harmonie, Malakoff, etc. cherchent briques digitales
- Horizon 3-5 ans, valorisation 5-20M€

**Scénario 2 : Acquisition par complémentaire digitale**
- Alan rachète pour intégrer
- Horizon 2-4 ans, 3-15M€

**Scénario 3 : Indépendant rentable**
- 200-500 clients, 500k-2M€ ARR
- Marge 60%+ = 300k-1,2M€ EBITDA
- Alexis garde contrôle, vie confortable

---

## 🎬 PROCHAINES ACTIONS (Cette Semaine)

### Alexis décide :

**Option A : GO — Je lance ce projet**
1. Valider le nom (suggestions : MindFlow, Claria, Elyos, Resilium)
2. Brief Bidi pour BP détaillé + maquettes MVP
3. Bloquer 2 semaines full focus pour coder MVP
4. Identifier 3 contacts réseau pour pilotes

**Option B : PAS MAINTENANT — Je garde pour plus tard**
1. Archiver ce document dans ideas/archives/
2. Focus reste Clawdbot Services ou autre priorité
3. Revenir dans 6 mois si contexte change

**Option C : HYBRIDE — Je teste l'appétit marché d'abord**
1. Post LinkedIn cette semaine sur le sujet (sonder)
2. Article Substack "IA & Santé Mentale : Pourquoi c'est le bon moment"
3. Mesurer engagement (commentaires, DMs)
4. Décision GO/NOGO selon feedback

---

## 📚 SOURCES & RECHERCHES

- Marché France santé mentale numérique : Spherical Insights 2026
- Enquête Great Place To Work 2026 : actifs français
- Forhuman Consulting : analyse hotlines/PAE
- Benchmark Spring Health, Lyra Health, Modern Health (US)
- Grande Cause Nationale 2026 : Santé Mentale

---

**Développé par Bidi dans la nuit du 16/02/2026**
**Pour discussion avec Alexis au réveil** ☕️
