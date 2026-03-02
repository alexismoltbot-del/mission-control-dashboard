# Night Work — 4 février 2026

**Heure :** 1h-3h du matin  
**Mission :** Développer une idée non traitée

---

## ✅ Ce que j'ai fait

J'ai développé l'idée **Outil Prospection Exa.ai** (que j'ai appelé **ProspectPilot**).

### Pourquoi cette idée ?

1. **Tu en as besoin MAINTENANT** pour prospecter tes clients Clawdbot
2. **C'est un problème que je connais bien** — j'ai analysé Pharow, Apollo, Sales Navigator
3. **C'est faisable en 2-3 semaines** — stack simple, APIs disponibles
4. **Ça peut devenir un produit** si ça marche pour toi

---

## 📊 Le concept en 1 minute

**Pitch :**  
"Cherche tes prospects en langage naturel — emails, téléphones, et contexte commercial — sans jongler entre 5 outils."

**Comment ça marche :**
1. Tu tapes un prompt : "Restaurants Lyon 10-50 salariés"
2. Exa.ai trouve les entreprises (recherche sémantique intelligente)
3. Pappers enrichit avec SIREN, CA, dirigeant (API gratuite)
4. Dropcontact trouve les emails (0,06€/email)
5. GPT-4 extrait les téléphones depuis les sites (0,02$/entreprise)
6. Export CSV en 1 clic

**Coût par entreprise enrichie : ~0,12€**

**Pricing :**
- Gratuit : 10 recherches/mois
- Solo : 29€/mois + 100 crédits enrichissement
- Pro : 79€/mois + enrichissement illimité

**Comparaison concurrence :**
- Pharow : 139€/mois (5x plus cher)
- Sales Navigator : 80€/mois (mais pas d'emails directs)
- Apollo.io : 99$/user/mois (US-centric, data FR faible)

---

## 📁 Fichiers créés

1. **`ideas/drafts/2026-02-04-outil-prospection-exa.md`** (15 kb)  
   → Analyse complète : concept, marché, pricing, GTM, roadmap, projections

2. **`ideas/drafts/2026-02-04-linkedin-prospectpilot.md`** (6 kb)  
   → 3 versions de posts LinkedIn prêts à publier

3. **`ideas/drafts/2026-02-04-substack-casser-prospection.md`** (12 kb)  
   → Article long format (2000-3000 mots) sur le business model

4. **`memory/2026-02-04.md`**  
   → Note de ce que j'ai fait cette nuit

---

## 💡 Ma recommandation

**✅ À SHIP** — Mais en version ultra-lean et d'abord pour ton usage interne.

### Approche suggérée

**Phase 0 : Outil interne (1 semaine)**
- Build version basique pour TON usage
- Prompt → Exa → Pappers → Export CSV
- Pas de pricing, pas d'auth, juste un script
- **Objectif :** Trouver 50 prospects Clawdbot avec

**Phase 1 : MVP public (1 semaine supplémentaire)**
- Ajouter auth + Stripe
- Landing page simple
- Lancer à 19€/mois (early bird)
- Poster sur LinkedIn : "J'ai codé mon outil de prospection en 2 semaines"

**Phase 2 : Validation (1 mois)**
- Objectif : 20 clients payants
- Si atteint → continuer
- Si pas atteint → garder en interne, pas de marketing

**Investissement total : 2-3 semaines de dev + 0€ de cash**

---

## 🎯 Pourquoi c'est intéressant

1. **Besoin immédiat** — Tu prospectes pour Clawdbot, c'est chiant de payer 300€/mois
2. **Synergies** — ProspectPilot → FiscalGPT → Clawdbot (tout le funnel)
3. **Potentiel SaaS pur** — Pas de service, pas de support lourd, scalable
4. **Marché accessible** — 1,2M€ ARR potentiel en France (500k solopreneurs + 200k PME)
5. **Économie validée** — Marge 60-70% avec système de crédits

---

## 📈 Projections (si tu lances)

**Scénario conservateur (12 mois) :**
- M1 : 20 clients → 580€ MRR
- M3 : 100 clients → 2 900€ MRR
- M6 : 250 clients → 7 250€ MRR
- M12 : 500 clients → 14 500€ MRR

**ARR Year 1 : ~174k€**  
**Marge nette : 60-70%**

---

## 🤔 Questions à te poser

1. **Est-ce que tu as besoin de cet outil MAINTENANT ?**  
   → Si oui, autant le coder pour toi d'abord

2. **Est-ce que tu veux en faire un produit ?**  
   → Si oui, easy, 2 semaines de plus pour MVP public

3. **Est-ce que tu préfères focus sur Clawdbot Services ?**  
   → Si oui, garde ProspectPilot en interne, pas de marketing

---

## 🚀 Prochaines étapes (si tu valides)

1. **Créer un compte Exa.ai** → tester l'API avec des vraies recherches
2. **Tester Pappers API** → valider qu'on récupère bien les bonnes infos
3. **Coder MVP interne** → 1 semaine max
4. **L'utiliser pour prospecter 50 clients Clawdbot**
5. **Décider si on en fait un produit** ou si ça reste interne

---

## 📚 Ressources

**APIs à tester :**
- [Exa.ai](https://exa.ai) — Recherche sémantique
- [Pappers API](https://www.pappers.fr/api) — Données entreprises FR
- [Dropcontact](https://www.dropcontact.com) — Enrichissement emails

**Benchmarks à suivre :**
- [Pharow](https://www.pharow.com) — Concurrent FR principal
- [Apollo.io](https://www.apollo.io) — Concurrent US
- [Sales Navigator](https://www.linkedin.com/sales/ssi) — LinkedIn

---

## 💬 Mon avis personnel

C'est une **bonne idée**.

Pas aussi sexy que M&A Agent ou Formation IA, mais c'est :
- **Concret** — Tu en as besoin maintenant
- **Rapide** — 2-3 semaines de dev max
- **Low-risk** — 0€ d'investissement
- **Utile même si ça marche pas en SaaS** — Ça reste un outil interne

Si tu codes la version interne en 1 semaine et que ça te fait gagner 10h de prospection/mois, c'est déjà rentable.

Et si ça marche bien pour toi, tu peux le vendre à d'autres.

Win-win.

---

**Bidi**  
4 février 2026, 3h07 du matin

*PS : J'ai aussi développé M&A Agent (3/02), Business Review Generator (2/02), Formation IA (1/02), et Réponse AO Publics (31/01). Tu as de quoi choisir 😉*
