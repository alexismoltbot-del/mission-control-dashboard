# 📊 Business Review Generator — Monday Morning Pack

*Draft développé nuit du 2 février 2026*

---

## 🎯 TL;DR

**Produit :** SaaS qui génère automatiquement des slides Business Review chaque semaine/mois à partir des données comptables (Pennylane, etc.)

**Cible :** Dirigeants PME/SaaS 0,5-3M€ CA sans CFO ni DAF

**Prix indicatif :** 49-199€/mois selon intégrations

**Différenciation :** Focus France, intégration Pennylane native, slides prêts à l'emploi (pas juste dashboard)

---

## 🔥 Le Problème

### La douleur vécue (Alexis)
> "2-3h chaque lundi à reconstruire les chiffres pour mon board/mes associés"

### Symptômes
- Export manuel depuis Pennylane/compta
- Copier-coller dans Excel
- Reformat pour présentation
- Calcul manuel des KPIs
- Slides PowerPoint à refaire chaque fois
- Recherche des variations vs mois précédent
- Commentaires à rédiger

### Impact
- **Temps perdu :** 2-4h/semaine × 50 semaines = **100-200h/an**
- **Coût opportunité :** Si dirigeant valorise son temps à 150€/h = **15-30k€/an**
- **Stress :** "Est-ce que j'ai les bons chiffres ?"
- **Retard :** Updates souvent repoussées faute de temps

### Qui souffre le plus
| Profil | Douleur | Fréquence reporting |
|--------|---------|---------------------|
| Fondateur solo SaaS 100-500k€ ARR | Très forte | Mensuel (investisseurs) |
| Dirigeant PME 1-5M€ CA avec associés | Forte | Hebdo/Mensuel |
| CEO startup seed/série A | Très forte | Mensuel (board) |
| Gérant SARL/SAS familiale | Moyenne | Trimestriel |

---

## 💡 La Solution

### Vision
**"Tu connectes ta compta. Lundi 7h, ton Business Review est dans ta boîte mail. Prêt à partager."**

### Le "Monday Morning Pack"
Chaque lundi (ou date choisie), le dirigeant reçoit :

1. **Dashboard email** — Vue rapide des KPIs clés
2. **Slides PDF/PPT** — Prêts pour le board ou les associés
3. **Commentaires IA** — Points d'attention, variations significatives
4. **Données brutes** — Export CSV si besoin d'aller plus loin

### Contenu type d'un Business Review

#### Slide 1 : Executive Summary
- CA du mois / YTD
- Marge brute
- Cash position
- 3 highlights
- 3 points d'attention

#### Slide 2 : Revenus
- CA par mois (graph 12 mois glissants)
- Répartition par produit/service
- MRR/ARR si SaaS
- Variation M-1, M-12

#### Slide 3 : Charges
- Évolution masse salariale
- Top 5 postes de charges
- Ratio charges/CA
- Alertes dépassements

#### Slide 4 : Trésorerie
- Position cash actuelle
- Prévision 3 mois (burn rate)
- Factures clients en retard
- Factures fournisseurs à payer

#### Slide 5 : KPIs Opérationnels (personnalisables)
- Pour SaaS : MRR, Churn, LTV, CAC
- Pour service : Taux d'utilisation, NPS
- Pour e-commerce : Panier moyen, taux de conversion

#### Slide 6 : Actions & Alertes
- Factures impayées > 30 jours
- Clients à risque (baisse CA)
- Échéances à venir
- Recommandations IA

---

## 🏆 Benchmark Concurrentiel

### Concurrents US

| Produit | Focus | Prix | Limites pour PME FR |
|---------|-------|------|---------------------|
| **Visible.vc** | Investor updates startups | $150-500/mois | US-centric, pas de compta FR |
| **Maxio** | SaaS metrics | $$$$ | Enterprise, complexe |
| **Baremetrics** | SaaS metrics | $50-500/mois | Stripe/Recurly only |
| **Foresight** | Forecasting | $150+/mois | Templates Excel glorifiés |
| **Calqulate** | Metrics + reporting | €199+/mois | Nordique, pas adapté FR |

### Pourquoi aucun ne convient aux PME françaises

1. **Pas d'intégration Pennylane** — 95% des startups FR utilisent Pennylane
2. **Pas de contexte fiscal français** — TVA, charges sociales, IS
3. **Templates US** — MRR-centric, pas adapté aux modèles mixtes
4. **Prix enterprise** — 200-500$/mois inaccessible pour PME 1-3M€
5. **En anglais** — Board/associés veulent du français

### Opportunité : Aucun acteur FR sur ce créneau

Les dirigeants français font :
- Excel manuel
- Copier-coller Pennylane → Google Slides
- Payer un DAF à temps partiel (800-2000€/mois)

---

## 🛠️ Architecture Technique

### Stack proposée

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                    │
│  • Dashboard web                                         │
│  • Configuration templates                               │
│  • Preview/édition slides                                │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                     │
│  • API REST                                              │
│  • Scheduler (cron jobs)                                 │
│  • Orchestration génération                              │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   PENNYLANE   │   │    STRIPE     │   │     QONTO     │
│     API       │   │     API       │   │      API      │
│  (lecture)    │   │   (SaaS)      │   │   (tréso)     │
└───────────────┘   └───────────────┘   └───────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                 MOTEUR DE GÉNÉRATION                     │
│  • Claude API (commentaires, insights)                   │
│  • Templating slides (PPTX.js / Google Slides API)       │
│  • Charts (Chart.js / Recharts)                          │
│  • PDF generation                                        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    DELIVERY                              │
│  • Email (Resend/Postmark)                              │
│  • Slack/Teams notification                             │
│  • Lien de partage sécurisé                             │
└─────────────────────────────────────────────────────────┘
```

### Intégrations prioritaires (V1)

| Priorité | Intégration | Données récupérées |
|----------|-------------|-------------------|
| 🔴 P0 | **Pennylane** | Bilan, P&L, trésorerie, factures |
| 🟠 P1 | **Qonto** | Position cash temps réel |
| 🟠 P1 | **Stripe** | MRR, churn, abonnements |
| 🟡 P2 | **Sellsy/HubSpot** | Pipeline, CA prévisionnel |
| 🟡 P2 | **Google Sheets** | KPIs custom |

### API Pennylane

Pennylane expose une API GraphQL complète :
- Factures clients/fournisseurs
- Écritures comptables
- Plan comptable
- Balance
- Grand livre

→ Suffisant pour reconstruire P&L et trésorerie

---

## 💰 Business Model

### Pricing

| Plan | Prix/mois | Inclus |
|------|-----------|--------|
| **Starter** | 49€ | 1 société, 1 intégration (Pennylane), email hebdo, templates standards |
| **Pro** | 99€ | 1 société, 3 intégrations, insights IA, personnalisation templates |
| **Business** | 199€ | Multi-sociétés, intégrations illimitées, API, marque blanche |

### Modèle économique

| Métrique | Hypothèse |
|----------|-----------|
| CAC | 50-100€ (content marketing + LinkedIn) |
| LTV | 1 200€ (12 mois × 99€) |
| Churn mensuel | 5% (tool sticky) |
| Marge brute | 80% (coûts = API + hosting) |

### Projection revenus

| Mois | Clients | MRR | ARR |
|------|---------|-----|-----|
| M6 | 20 | 2 000€ | 24k€ |
| M12 | 80 | 8 000€ | 96k€ |
| M18 | 200 | 20 000€ | 240k€ |
| M24 | 400 | 40 000€ | 480k€ |

---

## 🚀 Go-To-Market

### Phase 1 : Design Partners (M1-M2)

**Objectif :** 5-10 bêta-testeurs gratuits

**Cible :**
- Fondateurs SaaS dans le réseau d'Alexis
- Dirigeants PME qui galèrent avec leurs reportings
- Clients FiscalGPT/ExpliqueMaCompta

**Actions :**
- DM LinkedIn personnalisés
- Post LinkedIn "Je construis un truc, qui veut tester ?"
- Email à la base existante

### Phase 2 : Early Adopters (M3-M6)

**Objectif :** 50 clients payants

**Canaux :**
- Content marketing LinkedIn (4 posts/semaine)
- SEO : "reporting financier automatisé", "business review PME"
- Partenariats : cabinets EC, incubateurs, réseaux entrepreneurs

**Pricing early adopter :** -50% à vie pour les 50 premiers

### Phase 3 : Scale (M6+)

**Canaux additionnels :**
- Ads LinkedIn (audience dirigeants PME)
- Intégration marketplace Pennylane
- Programme affiliés (experts-comptables)
- PR/presse spécialisée (Les Echos Entrepreneurs, Maddyness)

---

## 🗓️ Timeline de Développement

### Sprint 1 : Foundation (Semaine 1-2)
- [ ] Auth + onboarding
- [ ] Connexion OAuth Pennylane
- [ ] Récupération données de base

### Sprint 2 : Core Engine (Semaine 3-4)
- [ ] Calcul KPIs (CA, marge, tréso)
- [ ] Génération charts
- [ ] Template slides basique

### Sprint 3 : Intelligence (Semaine 5-6)
- [ ] Commentaires IA (Claude)
- [ ] Détection variations significatives
- [ ] Alertes automatiques

### Sprint 4 : Delivery (Semaine 7-8)
- [ ] Scheduler hebdo/mensuel
- [ ] Email delivery
- [ ] Dashboard preview

### Sprint 5 : Polish (Semaine 9-10)
- [ ] Templates multiples
- [ ] Personnalisation
- [ ] Stripe intégration
- [ ] Beta launch

**→ MVP en 10 semaines**

---

## 🎯 Positionnement & Messaging

### Tagline options

1. **"Ton Business Review, prêt chaque lundi"**
2. **"De la compta aux slides en 1 clic"**
3. **"Le DAF de poche des dirigeants"**
4. **"Pilote ta boîte sans Excel"**

### Pitch 30 secondes

> "Tu passes 3h par semaine à compiler tes chiffres pour ton board ou tes associés ? MonDayPack connecte ta compta Pennylane et te génère automatiquement tes slides Business Review chaque lundi. Plus de copier-coller, plus d'Excel. Juste tes KPIs, commentés par l'IA, prêts à partager."

### Objections anticipées

| Objection | Réponse |
|-----------|---------|
| "Je n'ai pas de board" | Utile aussi pour toi-même, prendre du recul sur tes chiffres chaque semaine |
| "Mon EC me fait déjà ça" | Ton EC te donne une situation tous les 3 mois. Toi tu as besoin de weekly. |
| "Je préfère tout contrôler moi-même" | Tu gardes le contrôle, tu peux éditer avant envoi. C'est juste la compile qui est automatisée. |
| "Mes données sont sensibles" | Lecture seule, hébergement FR, RGPD compliant |

---

## 🔗 Synergies avec l'écosystème Alexis

### FiscalGPT
- Cross-sell : utilisateurs FiscalGPT → Business Review
- Upsell : questions fiscales intégrées au reporting

### ExpliqueMaCompta
- Feature merger possible : comprendre SA compta + avoir son reporting
- Même persona cible

### Clawdbot PME
- Business Review généré par l'agent
- "Hey Clawdbot, génère mon business review de janvier"

### Formation IA
- Use case concret dans la formation
- "Voici comment automatiser vos reportings"

---

## 📝 Noms possibles

| Nom | Dispo .fr | Dispo .com | Vibe |
|-----|-----------|------------|------|
| **MondayPack** | ✅ | ✅ | Clair, anglais, international |
| **LundiPack** | ✅ | - | FR, simple, mémorable |
| **BoardReady** | ✅ | - | Pro, anglais |
| **PiloteCEO** | ✅ | - | FR, ambitieux |
| **ReviewAuto** | ✅ | - | Explicite |
| **SlidePilot** | ✅ | - | Visuel |
| **CockpitCEO** | ✅ | - | Aviation, pilotage |

**Recommandation :** MondayPack.com — international, mémorable, .com dispo

---

## ✅ Prochaines étapes

1. **Valider la douleur** — 5 interviews dirigeants PME/SaaS
2. **Tester API Pennylane** — POC récupération données
3. **Maquette Figma** — 5 slides type
4. **Landing page** — Collecte emails waitlist
5. **Décision Go/No-Go** — Basée sur intérêt + faisabilité technique

---

## 💭 Questions ouvertes

- Pennylane API : rate limits ? coût ? accès partenaire ?
- Différenciation vs DAF temps partiel 800€/mois ?
- Marché adressable réel en France ? (estimation : 50k PME avec CA 0,5-5M€)
- Potentiel expansion EU (Pennylane existe en DE, ES, IT) ?

---

*Draft complet — Prêt pour review Alexis*
