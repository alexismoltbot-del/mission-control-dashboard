# 🏠 Amorti.ai — Tableau d'Amortissement 2.0

*Reboot complet d'un outil bancal mais essentiel — 20 février 2026*

---

## 🎯 CONCEPT

**Amorti.ai est un tableau d'amortissement intelligent pour les emprunteurs et investisseurs immobiliers.**

Contrairement aux outils actuels (tableau-amortissement.org désuet, Excel à créer soi-même, simulateurs des courtiers qui cachent leur commission), Amorti.ai offre :
- Une **UX moderne et visuelle** (graphiques interactifs)
- Des **scénarios comparables** en un clic (rachat de prêt, remboursement anticipé, durée modulable)
- **API taux temps réel** — pas de saisie manuelle approximative
- **Export pro** (PDF stylisé, XLS analysable)
- Une **intelligence financière** qui explique les arbitrages

---

## 📊 MARCHÉ

### Données clés (France 2024)

| Indicateur | Chiffre |
|------------|---------|
| Volume crédits immobiliers | ~150 milliards €/an |
| Nombre de prêts immobiliers/an | ~800 000 |
| Stock de crédits immobiliers en cours | 1 200+ milliards € |
| Investisseurs locaux (LMNP, SCI) | 2,5+ millions |
| Taux moyen 2024 (hors assurance) | ~3,2% (vs 1% en 2021) |
| Coût moyen assurance emprunteur | ~0,25-0,45% du capital |

### Segments cibles prioritaires

1. **Acheteurs primo-accédants** 
   - Besoin : comprendre leur engagement, comparer offres
   - Volume : 400 000+/an
   - Frein : complexité mathématique, jargon bancaire

2. **Investisseurs immobiliers**
   - Besoin : optimisation fiscale, comparaison rentabilité, montages
   - Volume : 2,5M millions, 300 000 actifs/an
   - Frein : manque d'outils intégrés SCPI/crédit/fiscalité

3. **Courtage / CGPI / Banques**
   - Besoin : outil white-label, rapports clients
   - Modèle : B2B2C, licence ou SaaS courtiers

4. **Notaires / Agences immo**
   - Besoin : accompagner clients, simuler capacité d'emprunt
   - Cas d'usage : avant compromis, lors de consultations

---

## 🏆 CONCURRENTS ANALYSIS

### Concurrents directs

| Outil | Forces | Faiblesses | Positionnement |
|-------|--------|------------|----------------|
| **tableau-amortissement.org** | Gratuit, connu | UX atroce, mobile KO, pas de comparaison, pub agressive | Generic 2005 |
| **Pretto** | Design moderne, courtage intégré | Pas d'outil standalone gratuit avancé | Courtage online |
| **Meilleurtaux** | Notoriété, réseau courtiers | Simulateur basique, capture lead forcée | Courtage online |
| **Empruntis** | Historique, comparateur | UX datée, pas d'outils perso avancés | Courtage online |
| **Excel maison** | Flexible, gratuit | Do-it-yourself, erreurs fréquentes, pas de mises à jour | DIY |
| **Banques en ligne** | Intégré compte | Vise à vendre LEUR crédit | Canal captif |

### Lacunes à exploiter

1. **Pas d'outil "standalone" moderne** — tous les bons outils sont liés au courtage
2. **Aucune comparaison multi-scénarios** — on ne peut pas comparer 3 durées côte à côte
3. **Pas de data temps réel** — taux saisis manuellement (erreurs, obsolète)
4. **Mobile inexistant** — tous les outils desktop-centric
5. **Pas d'optimisation** — "quel remboursement anticipé en 2027 revient au meilleur coût ?"

---

## ✨ FEATURES AMORTI.AI

### MVP (Semaine 1)

| Feature | Priorité | Description |
|---------|----------|-------------|
| Calcul tableau classique | P0 | Amortissement linéaire, capital + intérêts + assurance |
| Graphique interactif | P0 | Pie chart répartition, courbe capital restant dû |
| Scénarios | P1 | Comparer 2-3 tableaux côte à côte |
| Export PDF | P1 | Rapport stylisé pour signature banquier |
| Partage lien | P2 | URL unique pour partager calcul |

### V2 (Mois 2)

| Feature | Description |
|---------|-------------|
| API Taux temps réel | Intégration taux BCE + barèmes banques |
| Optimisateur remboursement | "Quand rembourser pour économiser max ?" |
| Rachat de prêt calculator | Comparer ancien prêt vs nouveau |
| Mode investisseur | Rentabilité nette, fiscalité LMNP/SCI |
| Export XLS avancé | Tableau détaillé pour Excel geeks |

### V3 (Roadmap)

| Feature | Description |
|---------|-------------|
| Alertes taux | Notifier quand rachat devient intéressant |
| Connexion bancaires | Import auto crédits (via PSD2) |
| API publique | Pour courtiers, Fintechs |
| Intelligence IA | Recommandations personnalisées |

---

## 💰 MODÈLE ÉCONOMIQUE

### Gratuit (Freemium)
- Tableau basique
- 1 scénario
- Export PDF standard
- Publicités discrètes

### Premium — 4,99€/mois ou 39€/an
- Scénarios illimités
- Export XLS + PDF personnalisé
- API taux temps réel
- Pas de pub
- Support email

### Pro (Notaires, Agences, CGPI) — 29€/mois
- White-label léger (logo, couleurs)
- Rapports clients multi-format
- Intégration iframe site web
- 1-5 collaborateurs

### Enterprise (Banques, Courtiers) — Sur devis
- API complète
- Marque blanche 100%
- SLA garanti
- Connexion bancaire possible

---

## 🛠️ STACK TECHNIQUE

### Frontend
- **Next.js 14** + TypeScript
- **Tailwind CSS** pour UI rapide
- **Recharts** pour graphiques interactifs
- **Framer Motion** pour animations

### Backend
- **Node.js** + Express ou Next.js API routes
- **PostgreSQL** pour stockage calculs/scénarios
- **Redis** pour cache taux temps réel
- **Puppeteer** pour génération PDF

### API & Data
- **API BCE / ECB** pour taux directeurs
- **Scrapping réglementé** des barèmes banques
- **PDFKit** ou **Puppeteer** pour exports

### Hébergement
- **Vercel** (frontend + edge functions)
- **Railway** ou **Supabase** (DB + backend)
- **Cloudflare** (CDN + caching)

---

## 📈 STRATÉGIE GO-TO-MARKET

### Phase 1 — Traction gratuite (Mois 1-3)

1. **SEO longue traîne**
   - "tableau amortissement 2026"
   - "calcul remboursement anticipé immobilier"
   - "comparer durée prêt 20 vs 25 ans"
   - "simulateur rachat de prêt 2026"

2. **Reddit & Forums**
   - r/vosfinances
   - r/immobilier
   - Forum Crédit/Immobilier

3. **Content marketing**
   - Instagram/TikTok : "Ce que votre banquier ne veut pas que vous sachiez"
   - LinkedIn : "Pourquoi les 20 ans c'est le nouveau 25"

### Phase 2 — Monetisation (Mois 3-6)

- Launch Premium
- Partenariats courtiers (lead generation rémunérée)
- Affiliation assurance emprunteur

### Phase 3 — Expansion (Mois 6-12)

- Marchés européens (BE, CH, LU, ES)
- API publique pour Fintechs
- Intégration comptabilité (Tiime, Pennylane)

---

## 🎨 UX/UI CONCEPT

### Page d'accueil

```
┌─────────────────────────────────────────────┐
│  💰 Amorti.ai                               │
│  Comprenez votre prêt en 30 secondes        │
├─────────────────────────────────────────────┤
│                                             │
│  [ Montant: 300 000 € ]                     │
│  [ Durée: 20 ans ▼ ]   [ Taux: 3.5% ]       │
│  [ Assurance: 0.36% ]                       │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  💡 Votre mensualité estimée        │   │
│  │                                     │   │
│  │           1 789 €                   │   │
│  │            /mois                    │   │
│  │                                     │   │
│  │  💰 Capital:  1 250 €              │   │
│  │  📈 Intérêts:   435 €              │   │
│  │  🛡️ Assurance:  104 €              │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [ 📊 Voir le tableau complet ]             │
│                                             │
└─────────────────────────────────────────────┘
```

### Page résultat

```
┌─────────────────────────────────────────────┐
│  📊 Votre tableau d'amortissement          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │ 🔵 Capital   │  │ 🟡 Intérêts  │        │
│  │  66%         │  │   24%        │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  📈 Graphique: Capital restant dû   │   │
│  │     /\                                │   │
│  │    /  \    [courbe dégressive]       │   │
│  │   /    \                             │   │
│  │  /      \\________________             │   │
│  │  0      10      20 ans               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [ 📥 Exporter PDF ] [ 📊 Comparer scénarios ]│
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💵 PROJECTIONS FINANCIÈRES

### Hypothèses

| Paramètre | Hypothèse |
|-----------|-----------|
| Traffic organique (M12) | 50 000 visites/mois |
| Taux conversion Premium | 2% |
| Taux conversion Pro | 0,5% des utilisateurs actifs |
| ARPU Premium | 39€/an |
| ARPU Pro | 29€/mois |
| Affiliation crédit | 50€/lead qualifié (0,1% conversion) |

### Revenus projetés (Année 1)

| Mois | Traffic | Premium | Pro | Affiliation | Total |
|------|---------|---------|-----|-------------|-------|
| M1 | 1 000 | 5 (195€) | 0 | 1 (50€) | 245€ |
| M3 | 5 000 | 20 (780€) | 2 (58€) | 3 (150€) | 988€ |
| M6 | 15 000 | 45 (1 755€) | 6 (174€) | 10 (500€) | 2 429€ |
| M12 | 50 000 | 150 (5 850€) | 15 (435€) | 30 (1 500€) | 7 785€ |

**Run rate M12 : ~93K€ ARR**

### Coûts (Année 1)

| Poste | Coût |
|-------|------|
| Dev (Alexis 20% temps) | 0€ (opportunité) |
| Infra Vercel/Railway | 200€/mois |
| Outils (Figma, Notion, etc) | 100€/mois |
| Marketing (tests ads) | 500€/mois |
| **Total mensuel** | **~800€** |
| **Total annuel** | **~9 600€** |

### Rentabilité estimée

- Seuil de rentabilité : ~400 utilisateurs Premium
- Payback period : 6-9 mois
- Potentiel à 3 ans : 300K€ ARR avec 1 dev

---

## 🚀 PLAN D'ACTION — SHIP EN 7 JOURS

### J1-J2 : Setup & Core
- [ ] Scaffold Next.js + Tailwind + shadcn/ui
- [ ] Modèle de données calcul d'amortissement
- [ ] Formulaire input (montant, durée, taux, assurance)
- [ ] Algo calcul tableau d'amortissement

### J3-J4 : UI & UX
- [ ] Tableau détaillé (mois par mois)
- [ ] Graphiques (Recharts)
- [ ] Design mobile-first
- [ ] Comparateur de scénarios

### J5-J6 : Exports & Polish
- [ ] Génération PDF (Puppeteer)
- [ ] Export XLS (xlsx.js)
- [ ] Page landing basique
- [ ] SEO meta, sitemap

### J7 : Launch
- [ ] Déploiement Vercel
- [ ] Analytics (Plausible ou PostHog)
- [ ] Post LinkedIn de lancement
- [ ] Soumission sur directories (Product Hunt, Indie Hackers)

---

## ⚠️ RISQUES & MITIGATIONS

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| **Dépendance aux taux** (marché en baisse 2024-25) | Moyen | Moyen | Positionner l'optimisation rachat de prêt |
| **Concurrence banques** | Faible | Faible | Différenciation UX + B2B |
| **Réglementation financière** | Moyen | Moyen | Disclaimer "simulateur non conseil", pas d'intermédiation |
| **Difficulté SEO** | Moyen | Moyen | Content longue traîne + partenariats |
| **Monétisation faible** | Faible | Faible | Diversification (affiliation, B2B) |

---

## 🎯 KPIs SUIVI

| KPI | Cible M3 | Cible M12 |
|-----|----------|-----------|
| Visites organiques/mois | 5 000 | 50 000 |
| Taux conversion inscrits | 10% | 8% |
| Taux conversion Premium | 1% | 2% |
| NPS utilisateurs | >40 | >50 |
| Revenus mensuels | 500€ | 8 000€ |

---

## 🔮 VISION LONG TERME

> **"Devenir le cockpit financier de l'emprunteur"**

**V2+ Roadmap :**
1. **Amorti Tracker** — Suivi multi-prêts, alertes taux
2. **Amorti Optimizer** — IA qui suggère quand renégocier
3. **Amorti B2B** — API blanche pour courtiers, Fintechs
4. **International** — Espagne, Belgique, Suisse

**Exit potentiel :**
- Courtier digital (Pretto, Meilleurtaux) — acquihire ou produit
- Neobanque (N26, Revolut) — feature crédit
- Éditeur logiciel Fintech

---

## 📚 RÉFÉRENCES & INSPIRATIONS

### Concurrents analysés
- [tableau-amortissement.org](https://www.tableau-amortissement.org/) — UX à éviter
- [Pretto](https://www.pretto.fr/) — Benchmark UX moderne
- [Meilleurtaux](https://www.meilleurtaux.com/) — Benchmark intégration
- [Empruntis](https://www.empruntis.com/) — Ancien leader

### Outils similaires réussis
- **YNAB** (budget) — Subscription model validé
- **Karl** (épargne) — Fintech B2C française
- **Finary** (patrimoine) — Dashboard financier

### Insights clés
- Les Français sont obsédés par leur crédit immobilier (discussion nationale)
- Le rachat de prêt explose avec la remontée des taux (+40% en 2024)
- Aucun outil moderne n'a pris la place du "simulateur Excel maison"

---

## ✅ VERDICT GO/NO-GO

| Critère | Score | Notes |
|---------|-------|-------|
| Taille marché | 8/10 | 800K prêts/an, 1,2T€ stock |
| Saturation | 7/10 | Beaucoup d'acteurs mais pas de leader UX moderne |
| Moat possible | 6/10 | Data temps réel, UX, communauté |
| Faisabilité technique | 9/10 | 1-2 jours pour MVP fonctionnel |
| Time to market | 9/10 | 7 jours pour MVP, 1 mois pour V1 |
| Potentiel revenus | 7/10 | 100K€ ARR réaliste seul |
| **MOYENNE** | **7,7/10** | ✅ **GO** |

---

## 📝 PROCHAINES ÉTAPES

1. **Valider le besoin** — Post LinkedIn : "Qui utilise encore Excel pour son crédit immo ?"
2. **Créer le MVP** — 7 jours de dev intensif
3. **Soft launch** — Partage cercle pro, collecte feedback
4. **Itérer** — Features les plus demandées en priorité
5. **Scaler** — SEO + contenu + partenariats

---

*Draft produit rédigé par Bidi — 20 février 2026*
*Prochaine revue : 27 février 2026*