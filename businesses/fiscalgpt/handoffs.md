# FiscalGPT - Handoffs

## Regles

- Chaque handoff doit contenir:
  - ce qui a ete fait
  - ou se trouve le livrable
  - ce qui manque
  - la prochaine action attendue

## Template

### YYYY-MM-DD HH:MM - from -> to

- Done:
- Files:
- Risks / gaps:
- Next:

---

## 2026-03-12 - victor-tech -> main | TASK-FG-006 : Prérequis Stripe + Analytics

**Done:** Liste complète des prérequis techniques pour brancher Stripe et les analytics.

**Files:**
- `businesses/fiscalgpt/funnel.md` — contexte et flux d'activation
- `businesses/fiscalgpt/pricing.md` — plan Solo 19€/mois
- `businesses/fiscalgpt/kpis-v1.md` — métriques cibles

---

### Prérequis Stripe — Phase 1

#### CONNUS (immédiatement actionnable)

| # | Prérequis | Effort estimé | Notes |
|---|-----------|---------------|-------|
| 1 | **Compte Stripe** associé à une entité légale française | 1h | Stripe France accepte auto-entrepreneur et SAS. Vérification identité = ~2 jours. |
| 2 | **Stripe Checkout** — produit "Plan Solo 19€/mois" | 2h | Mode hosted (aucun dev front requis). Créer un Price recurring=monthly, amount=1900. |
| 3 | **Webhook Stripe** → backend FiscalGPT | 3h | Events à écouter : `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`. Nécessite une URL HTTPS stable (VPS ou Vercel). |
| 4 | **Magic link auth** (email) | 4-6h | Pas besoin de password. Libs recommandées : NextAuth (magic-link) ou Supabase Auth. Lié à l'email fourni au Stripe Checkout. |
| 5 | **Compteur de questions** par utilisateur | 2-3h | Stocké en DB (Supabase ou Postgres). Déclenche le paywall à la 3ème question pour les non-payants. |
| 6 | **Gate produit** (vérification abonnement actif) | 2h | À chaque question : vérifier que `subscription.status = active` via Stripe API ou flag local mis à jour par webhook. |

**Total effort Stripe + Auth + Gate ≈ 14-18h dev (2 journées).**

#### INCONNUS / À CLARIFIER avant de coder

| Inconnu | Impact | Comment le lever |
|---------|--------|-----------------|
| Stack technique actuelle de FiscalGPT | Bloquant | Alexis doit confirmer : Next.js ? Python Flask ? Autre ? |
| Hébergement actuel | Bloquant | URL stable pour les webhooks Stripe — VPS, Vercel, Railway ? |
| Entité légale disponible | Bloquant | Stripe exige IBAN + K-Bis ou extrait Siren. Quel véhicule utilise Alexis ? |
| RGPD minimal | Non-bloquant J1 | Stripe gère le paiement (pas de stockage CB côté FiscalGPT). Ajouter CGU + politique de confidentialité avant toute vente. |

---

### Prérequis Analytics — Phase 1

#### CONNUS

| # | Prérequis | Effort | Notes |
|---|-----------|--------|-------|
| 1 | **Plausible Analytics** compte créé | 30 min | Recommandé vs GA4 : RGPD natif, pas de cookie banner, setup minimal. 9€/mois. |
| 2 | **Snippet** `<script>` dans le `<head>` de la landing | 15 min | `data-domain="fiscalgpt.fr"` |
| 3 | **Goals Plausible** (4 events custom) | 30 min | `essai_started`, `question_asked`, `checkout_opened`, `payment_success` |
| 4 | **Events front** déclenchés côté JS | 2h | `plausible('essai_started')` etc. à câbler sur les boutons et étapes clés. |

**Total effort Analytics ≈ 3h.**

#### INCONNUS

| Inconnu | Impact | Comment le lever |
|---------|--------|-----------------|
| Nom de domaine fiscalgpt.fr déjà acheté ? | Moyen | Si non, acheter maintenant (~10€/an) avant de brancher Plausible. |

---

### Ordre d'implémentation recommandé

```
Jour 1 (½ journée)
  1. Confirmer stack + hébergement + entité légale (→ Alexis)
  2. Ouvrir compte Stripe + créer Price recurring 19€
  3. Acheter fiscalgpt.fr si pas encore fait

Jour 2 (1 journée)
  4. Brancher Stripe Checkout + webhook
  5. Implémenter magic link auth
  6. Compteur questions + gate produit

Jour 3 (½ journée)
  7. Plausible snippet + 4 goals
  8. Tests end-to-end : essai gratuit → paywall → paiement → accès
```

---

**Risks / gaps:**
- L'entité légale non confirmée est le seul vrai bloquant (Stripe refuse d'activer sans IBAN vérifié).
- Le stack technique inconnu peut doubler les estimations.
- Sans fiscalgpt.fr en production, les webhooks Stripe ne peuvent pas être testés en live.

**Next:**
- Alexis confirme : stack, hébergement, entité → TASK-FG-007 (implémentation) peut démarrer.
- Si entité non disponible : créer SAS ou utiliser micro-entreprise existante.
