# 🎯 NPS + Review Generator

## Executive Summary

**Concept** : Outil tout-en-un pour PME qui automatise la collecte de feedback clients (NPS/CSAT) et génère des avis vérifiés sur Google/Trustpilot.

**Douleur cible** : Les PME perdent du temps et de l'argent avec des outils fragmentés (NPS déconnecté des avis, Trustpilot coûteux à 200€/mois, setup complexe).

**Promise** : "En 10 min, collectez vos feedbacks NPS et transformez vos clients satisfaits en avis Google — sans setup technique."

---

## Pourquoi cette idée ?

### Douleur vécue chez Qiara
- Mettre en place NPS + Trustpilot + parrainage = setup complexe et coûteux
- Outils non intégrés = data en silo
- Trustpilot coûte ~200€/mois pour une PME
- Pas de lien automatique entre satisfaction (NPS) et demande d'avis

### Opportunité marché
- **NPS SaaS** : Marché mature mais fragmenté (Delighted, AskNicely, Retently, SurveyMonkey)
- **Review management** : Trustpilot (~31,5Mds€ valo), BirdEye (~300M$ levés), Yotpo
- **Gap identifié** : Aucun outil abordable combine INTELLIGEMMENT NPS + génération d'avis automatique
- **B2B SaaS NPS moyen** : 41 (benchmark 2024-2025)

### Timing parfait
- IA permet d'automatiser les demandes d'avis personnalisées
- APIs Google Reviews / Trustpilot maturité croissante
- PME cherchent des alternatives aux SaaS US chers

---

## Positionnement

### Comparatif concurrents

| Outil | Prix | NPS | Avis | IA / Auto | Setup |
|-------|------|-----|------|-----------|-------|
| **Delighted** | 29-599$/mois | ✅ | ❌ | ❌ | Technique |
| **AskNicely** | Sur devis | ✅ | ❌ | Basique | Complexe |
| **Trustpilot** | ~200€/mois | ❌ | ✅ | ❌ | Moyen |
| **BirdEye** | ~200-400$/mois | ✅ | ✅ | Basique | Complexe |
| **Our Target** | 29-79€/mois | ✅ | ✅ | 🔥 IA native | 10 min |

### Positionnement unique
**"Le seul outil qui transforme vos clients satisfaits en avis automatiquement"**

---

## Fonctionnalités MVP (1-2 jours de dev)

### Core Features V1

1. **Widget NPS** (`<script>` à copier/coller)
   - Score 0-10 standard
   - Question ouverte "Pourquoi ?"
   - Design customizable (colors, logo)
   - Trigger : after purchase (webhook / API) ou manuel

2. **Segmentation automatique**
   - Promoteurs (9-10) → Redirection avis Google/Trustpilot
   - Passifs (7-8) → Feedback interne
   - Détracteurs (0-6) → Alertes propriétaire + mail de récupération

3. **Générateur d'avis**
   - Promoteurs reçoivent mail personnalisé IA
   - Lien direct vers Google Business / Trustpilot
   - 3 templates prédéfinis rédigés par IA selon réponse NPS

4. **Dashboard simple**
   - NPS score en temps réel
   - Trend 30j/90j/1an
   - Nombre d'avis générés
   - Alertes détracteurs

### Stack technique
```
Frontend   : Next.js + shadcn/ui (v0.dev)
Backend    : Supabase (auth, DB)
Email      : Resend / Brevo
Hooks      : Make.com / n8n pour intégrations
Scoring    : OpenAI GPT-4 mini (pour suggestions mail)
Hosting    : Vercel
```

---

## Modèle économique

### Pricing (freemium)

| Plan | Prix | Limites |
|------|------|---------|
| **Free** | 0€ | 50 réponses/mois, 1 site, pas d'automation mail |
| **Starter** | 29€/mois | 500 réponses/mois, 3 sites, automation IA |
| **Pro** | 49€/mois | 2000 réponses/mois, illimité sites, API + webhooks |
| **Agency** | 79€/mois | Illimité, white-label, multi-comptes |

### Unit economics estimées
- **CAC** : ~200€ (content + ads PME)
- **LTV** : 29€ × 12 mois × 2 ans = 696€
- **LTV/CAC** : 3.5 (sain pour B2B SaaS)
- **MRR cible an 1** : 3 000€ (100 clients Starter)

---

## Go-To-Market

### Stratégie d'acquisition

**Phase 1 (mois 1-3)** : Bootstrap + distribution gratuite
- Lancer sur Product Hunt
- Posts LinkedIn "build in public"
- 50 beta users gratuits → testimonials

**Phase 2 (mois 4-6)** : SEO + contenu
- "Alternative Trustpilot pas chère"
- "Comment augmenter avis Google"
- Comparatifs outils NPS

**Phase 3 (mois 6-12)** : Channel partners
- Intégration e-commerce (Shopify, WooCommerce)
- Partenariats agences web / marketing
- Marketplace PME (Qonto, Pennylane, etc.)

### Unique Acquisition Hack
**"Lien direct NPS → Avis"**
- Au lieu de demander l'avis à tout le monde (spammy), on le demande SEULEMENT aux promoteurs
- Conversion prometteuse car timing parfait + client déjà satisfait
- ROI avis garanti (on ne sollicite que les fans)

---

## Metrics clés

### North Star Metric
**"Reviews générés par mois"** — car c'est le vrai ROI perçu par le client

### KPIs tracking
- NPS response rate (target : >15%)
- Conversion promoteur → avis (target : >60%)
- Churn mensuel (target : <5%)
- NPS moyen des users eux-mêmes (meta !)

---

## Roadmap produit

### V1 (Week 1-2) : MVP Core
- [ ] Widget NPS embeddable
- [ ] Dashboard basique
- [ ] Alertes email détracteurs
- [ ] Export CSV

### V2 (Month 2) : Intelligence
- [ ] Mail IA personnalisé pour avis
- [ ] Multi-langue (FR, EN, ES, DE)
- [ ] Intégrations zapier/make
- [ ] Webhooks pour e-commerce

### V3 (Month 3-4) : Growth features
- [ ] Parrainage automatisé
- [ ] Review widget affichage (site)
- [ ] Compare vs competitors
- [ ] API ouverte

### V4 (Month 6+) : Platform
- [ ] Multi-location (franchises / chaînes)
- [ ] CSAT/CES additionnels
- [ ] Benchmark sectoriel
- [ ] Marketplace templates

---

## Risques & Mitigations

| Risque | Probabilité | Mitigation |
|--------|-------------|------------|
| Trustpilot / Google bloquent l'API | Moyen | Respect stricte TOS, focus "redirection" pas scraping |
| Concurrence big players | Faible | Nicher sur PME, prix agressif, simplicité |
| Spam / abuse | Moyen | Rate limiting, détecteur faux avis, KYC basique |
| Low engagement NPS | Moyen | Best practices onboarding, templates timing optimaux |

---

## Validation rapide ( cette semaine ? )

### Tests à mener
1. **Landing page test** : Créer LP "Coming soon" + email capture
   - Budget : 100€ LinkedIn ads PME
   - Target : 100 emails = validation

2. **Fake door test** : Proposer à 5 connaissances PME
   - "Si je te fais ça pour 29€/mois, tu signes ?"
   - 3 oui = good to go

3. **Concurrence check** : S'inscrire à trials Delighted/Trustpilot
   - Identifier gaps UX
   - Noter points de friction

---

## Synthèse : Pourquoi shipper ça maintenant ?

✅ **Douleur vérifiée** : Expérimentée chez Qiara + demande PME générale
✅ **Délai court** : 1-2 jours pour MVP fonctionnel avec no-code/low-code
✅ **Marché existant** : Preuve de paiement (Trustpilot = 31,5Mds€)
✅ **Diffférenciation claire** : Lien NPS-avis automatisé, prix agressif
✅ **Scalable** : Code once, serve many
✅ **Synergies** : Stack similaire à autres produits Alexis (ALMAVI, Business Review AI)

---

## Next Steps proposés

1. **Aujourd'hui** : Vérifier si pas déjà développé ? Consulter @jimmy sur faisabilité technique
2. **Demain** : Créer landing page v0.dev type "coming soon"
3. **Cette semaine** : 5 calls PME pour valider le besoin
4. **Dans 2 semaines** : MVP fonctionnel si validation positive

---

*Draft créé le 19 février 2026 — Nuit 01:15 UTC*
