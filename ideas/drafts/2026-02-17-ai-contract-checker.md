# AI Contract Checker — Business Plan & Spécifications

> **Idée développée :** Mardi 17 février 2026 — Session nocturne Bidi
> **Origine :** Pain vécui chez Qiara — "Contrats et PO dans tous les sens"
> **Status :** Concept validé — MVP requête 1-2 semaines

---

## 🎯 Le Problème

### Situation vécue (Qiara)
- Contrats clients, fournisseurs, partenariats, PO dispersés
- Pas d'alerte sur échéances (renouvellements, résiliations)
- Pas de visibilité sur clauses critiques (pénalités, responsabilité)
- Diffondre aux contrats = oubliés, puis panique quand un deadline arrive
- Aucun moyen simple de comparer ce qui a été signé vs. pratiques marché

### Problème généralisé (PME TPE)
- **78% des PME** gèrent leurs contrats dans des emails/Drive
- **Pas de visibilité** sur engagements, seuils, dates butoirs
- **Coût d'opportunité** énorme : résiliations oubliées = renouvellements forcés
- **Peur du juridique** = paralysie décisionnelle

---

## 💡 La Solution

### Pitch
**"Drop ton PDF de contrat → en 30 secondes, tu sais exactement où tu en es"**

### Workflow utilisateur

```
1. Upload PDF (contrat, avenant, PO)
      ↓
2. IA analyse automatiquement : 
   • Parties (client, fournisseur, sous-traitant)
   • Montant & devise
   • Durée & échéances clés
   • Clauses critiques (résiliation, pénalités, confidentialité)
   • Risques signalés (points flous, mentions manquantes)
      ↓
3. Livrable : Dashboard synthétique + Recommandations
      ↓
4. Alertes : Email avant échéances (configurable)
```

### Différenciation vs. CLM enterprise (Ironclad, Evisort, etc.)

| Critère | CLM Enterprise | AI Contract Checker |
|---------|----------------|---------------------|
| Prix | 500-2000€/mois | 29-99€/mois |
| Setup | Semaines à months | 5 minutes |
| Cible | Grandes entreprises | PME/TPE/Startups |
| Features | CLM complet | Focus analyse + alertes |
| Langue | Anglais | Français natif + droit FR |

### différent clé : **Simplicité radicale**
- Pas de workflow complexe
- Pas d'onboarding juridique
- Juste "drop ton PDF → voici ce que tu dois savoir"

---

## 🏆 Benchmark Marché

### Leaders mondiaux CLM+AI

| Société | Valuation/Status | Forces | Faiblesses |
|---------|------------------|--------|------------|
| **Ironclad** | ~3 Md$ | Leader Gartner, workflow puissant | Cher, complexe, US-centric |
| **Evisort** | Racheté Workday 2025 | Portfolio intelligence | Intégration Workday only |
| **LinkSquares** | Unicorn | AI-first, analytics | Enterprise focus, pricing opaque |
| **Legalfly** | Startup | Redlining détaillé | Focus avocats, pas PME |
| **Spellbook** | Startup | Due diligence IA | Spécialisé M&A, pas quotidien |

### Opportunité : le vide du "Simple AI Contract Review"

**Marché :** ~2 Md$ en 2025, CAGR 25%
**Segment abandonné :** PME/TPE (trop petits pour CLM enterprise, trop complexes pour gestion manuelle)

---

## 📊 Modèle Économique

### Pricing

| Plan | Prix | Volume | Features |
|------|------|--------|----------|
| **Free** | Gratuit | 3 contrats/mois | Analyse basique, pas d'alertes |
| **Pro** | 29€/mois | 20 contrats/mois | Analyse complète, alertes email, exports |
| **Business** | 79€/mois | Illimité | Multi-users, API, support prioritaire |
| **Enterprise** | 299€/mois | Illimité | On-premise, custom models, audit RGPD |

### Unit Economics estimés

- **Coût d'analyse par contrat** : ~0,30€ (GPT-4 Claude API)
- **Marge brute** : ~85% sur plan Pro
- **CAC estimé** (content/SEO) : ~150€
- **LTV estimé** : 29€ × 18 mois = ~522€
- **LTV/CAC ratio** : 3,5x ✅

### Projections Année 1 (conservateur)

| Mois | Users Free | Payants | MRR | Commentaire |
|------|------------|---------|-----|-------------|
| 1-2 | 500 | 10 | 290€ | Lancement MVP |
| 3-4 | 1500 | 50 | 1 450€ | Product Hunt, LinkedIn |
| 5-6 | 4000 | 150 | 4 350€ | SEO, bouche-à-oreille |
| 7-9 | 8000 | 350 | 10 150€ | Partenariats |
| 10-12 | 15000 | 700 | 20 300€ | Scale MRR |
| **Total A1** | — | ~700 | **20k€ MRR** | **240k€ ARR** |

---

## 🛠️ Spécifications Techniques (MVP)

### Stack V1 (2 semaines)

```
Frontend : Next.js + Tailwind + shadcn/ui
Backend : Supabase (auth, DB, storage)
AI : Claude 3.5 Sonnet (via API) ou GPT-4
PDF Parsing : pdf-parse + mammoth
Scheduling : pg_cron (Supabase) ou n8n
Emails : Resend ou Brevo
Hébergement : Vercel
```

### Schéma données MVP

```sql
-- Table contracts
CREATE TABLE contracts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  filename VARCHAR,
  file_url VARCHAR,
  status VARCHAR, -- processing, analyzed, error
  parties JSONB, -- [{ name, role, type }]
  financials JSONB, -- { amount, currency, payment_terms }
  dates JSONB, -- { start_date, end_date, renewal_date, termination_notice }
  clauses JSONB, -- [{ type, text, risk_level }]
  summary TEXT,
  risk_score INTEGER, -- 1-10
  created_at TIMESTAMP
);

-- Table alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  contract_id UUID REFERENCES contracts,
  alert_date DATE,
  type VARCHAR, -- renewal, payment, termination
  sent BOOLEAN DEFAULT FALSE
);
```

### Prompt d'analyse (Claude)

```
Tu es un analyste contractuel senior spécialisé PME française.
Analyse ce contrat PDF et extrait :

1. PARTIES : Qui signe ? (noms, rôles, SIRET si présent)

2. FINANCES :
   - Montant total
   - Devise
   - Modalités de paiement
   - Pénalités de retard

3. CALENDRIER :
   - Date de début
   - Durée
   - Date de fin/renouvellement
   - Délai de préavis pour résiliation
   - Prochaines échéances importantes

4. CLAUSES CLÉS :
   - Confidentialité (oui/non + durée)
   - Non-concurrence (oui/non)
   - Responsabilité / Plafond de responsabilité
   - Force majeure
   - Résiliation anticipée (conditions)

5. RISQUES :
   - Clauses absentes ou floues
   - Déséquilibre entre parties
   - Points à vérifier juridiquement

Format de sortie : JSON structuré uniquement.
```

---

## 🚀 Roadmap Produit

### V1 (Mois 1) — MVP Core
- [ ] Upload PDF → Analyse IA
- [ ] Dashboard contrats
- [ ] Alertes email basiques (30j, 7j avant échéance)
- [ ] Export PDF synthèse

### V2 (Mois 2-3) — Productivité
- [ ] Multi-upload (batch)
- [ ] Templates alertes personnalisables
- [ ] Comparaison contrats (visuel diffs)
- [ ] Intégration Google Drive / Dropbox

### V3 (Mois 4-6) — Intelligence
- [ ] Benchmark marché ("votre clause est standard ou atypique")
- [ ] Génération avenants résiliation
- [ ] Chatbot contrat (poser questions en langage naturel)
- [ ] API ouverte

### V4 (Mois 6-12) — Écosystème
- [ ] Marketplace templates
- [ ] Network effect (benchmarks agrégés anonymisés)
- [ ] Intégration experts-comptables
- [ ] Version mobile app

---

## 📣 Go-To-Market

### Acquisition (priorité)

1. **Content/SEO** (période 1)
   - "Comment analyser un contrat de prestation ?"
   - "Modèle lettre résiliation bail commercial"
   - "Checklist clauses contrat fournisseur"

2. **LinkedIn Build in Public** (période 1-2)
   - Posts hebdo : "J'ai analysé 100 contrats, voici les 5 erreurs les plus courantes"
   - Délits gratuit sur 5 contrats (opération séduction)

3. **Partenariats** (période 3-4)
   - Experts-comptables (coût d'acquisition faible)
   - Cabinets juridiques PME
   - Mutuelles (plug Clawdbot santé)

### Positionnement

```
Pas un logiciel juridique complexe.
Pas besoin d'être avocat.
Juste la clarté sur tes contrats.

→ Pour les entrepreneurs qui n'ont pas le temps de lire les 12 pages.
→ Pour les CFO qui veulent anticiper les échéances.
→ Pour les PME qui paient trop en renouvellements oubliés.
```

---

## 💪 Unfair Advantage

Pourquoi Alexis peut gagner sur ce marché :

1. **Pain réel vécu** : Qiara = laboratoire
2. **Réseau PME** : accès rapide à beta testeurs
3. **Tech déjà maîtrisée** : Supabase, Claude API, Next.js
4. **Compétence "simplifier"** : produits orientés UX radical
5. **Distribution** : audience LinkedIn + Substack croissante

---

## ⚠️ Risques & Mitigations

| Risque | Probabilité | Mitigation |
|--------|-------------|------------|
| Mauvaise analyse IA (hallucination) | Moyenne | Prompt engineering + validation humaine V1 + disclaimer |
| Concurrence CLM qui descend en PME | Haute | Différenciation UX, speed-to-value, prix |
| Barrière réglementale (exercice illégal droit) | Moyenne | Positionner comme "aide à la décision", pas conseil juridique |
| Bas taux conversion free→payant | Moyenne | Onboarding mails, value visible rapidement |

---

## 🎯 Next Steps Recommandés

### Option A : GO — Lancer MVP (2 semaines)
- Semaine 1 : Build core (upload + analyse + dashboard)
- Semaine 2 : Alertes + landing page + stripe
- Objectif : 10 beta users d'ici 1 mois

### Option B : TESTER L'APPÉTIT d'abord
- Post LinkedIn : "J'ai développé un outil IA d'analyse de contrats. 5 analyses gratuites pour testeurs → commentez 'TEST'"
- Mesure engagement → décider si build
- Avantage : Valide demande avant d'investir temps

### Option C : PAS MAINTENANT
- Garder cette idée pour Q2/Q3
- Focus priorité actuelle (clawdbot ?)

**Recommandation Bidi : Option B d'abord**
- Délai : 2 jours (post + réponses)
- Si >20 commentaires "TEST" → go Option A
- Si silence → option C

---

## 📎 Annexes

### Concurrents directs à creuser
- [ ] Leeway (FR)
- [ ] Juro (UK)
- [ ] Concord (US)
- [ ] Contractbook (DK)

### Sources recherche marché
- Global Growth Insights — AI Contract Management 2025
- Datainsightsmarket — AI Contract Analysis Software
- Forrester Wave CLM 2025
- Gartner Peer Insights

---

*Document créé : 17 février 2026 — Bidi (nuit)*
*Prochaine revue : Attendre retour Alexis sur Option A/B/C*
