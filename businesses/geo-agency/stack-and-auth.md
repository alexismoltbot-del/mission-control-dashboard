# GEO Agency — Stack de lancement (v2, décisions finales)

> Ce fichier est la référence opérationnelle pour TASK-GEO-008 (batch 1).
> Pas de "à valider" — tout est tranché.

---

## 1. Architecture de lancement minimale

### Hosting
**Vercel (frontend) + Supabase (DB + Auth + Storage)**

- Vercel : déploiement Next.js, Edge Functions, preview branches, zero-config CI
- Supabase : Postgres managé, Auth intégré (magic link natif), stockage fichiers livrables
- Domaine : custom sur Vercel, DNS Cloudflare
- Pas de VPS, pas de Railway, pas de Docker en phase 1

### Auth — Magic Link Email
**Supabase Auth (magic link natif)**

- Email envoyé via **Resend** (SMTP custom dans Supabase Auth settings)
- Pas de mot de passe, pas d'OAuth social en phase 1
- Session JWT gérée par Supabase client SDK
- Table `profiles` liée à `auth.users` via trigger Postgres
- Magic link expire après 1h, one-time use

**Pourquoi pas un service dédié (Auth0, Clerk) :** Supabase Auth couvre le besoin, évite une dépendance supplémentaire, et le client Supabase est déjà présent pour la DB.

### Checkout — Stripe Checkout
**Stripe Checkout (hosted page, pas de form custom)**

- Liens Stripe Checkout générés côté serveur (API route Next.js)
- `success_url` → `/onboarding?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url` → `/pricing`
- Webhook Stripe → route `/api/webhooks/stripe` → mise à jour table `orders` en DB
- Pas de Stripe Elements, pas de Payment Links statiques (on veut le session_id pour tracking)

Offres à configurer en phase 1 :
| Produit | Prix | Type |
|---------|------|------|
| GEO Audit | 490€ HT | one-time |
| GEO Pack | 1 490€ HT | one-time |

### Analytics — PostHog Cloud
**PostHog Cloud (pas self-hosted en phase 1)**

- Plan gratuit jusqu'à 1M events/mois — largement suffisant
- SDK `posthog-js` dans Next.js via `_app.tsx` ou layout root
- Identify user après `auth.onAuthStateChange` avec `posthog.identify(userId, { email })`
- Self-hosted envisageable phase 2 si volume ou compliance l'exige

### Support
**Email + page `/support`**

- Email dédié : `support@[domaine]` (alias Resend ou forwardé vers boîte Alexis)
- Page `/support` : FAQ minimale (5 questions) + lien mailto + SLA affiché (48h ouvrées)
- Pas de live chat, pas de Intercom en phase 1

### Intake client
**Typeform embedded — affiché post-paiement ET dans le portail**

- Un seul Typeform par type d'offre (Audit / Pack)
- Embedded dans la page `/onboarding` après vérification du `checkout_session_id`
- Accessible aussi dans le portail client `/dashboard/intake`
- Réponses stockées via Typeform webhook → table `intake_responses` en DB (ou simplement consultées dans Typeform dashboard phase 1)

---

## 2. Séquence de build (ordre + dépendances)

```
[1] Setup Supabase projet
    └─ Tables: profiles, orders, intake_responses
    └─ Auth: magic link activé, Resend configuré comme SMTP

[2] Setup Stripe
    └─ Produits + prix créés
    └─ Webhook configuré (local: stripe-cli listen)
    └─ Variables d'env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

[3] Next.js project init (Vercel deploy dès le début)
    └─ /app ou /pages router — trancher dès init
    └─ Supabase client + Stripe SDK installés
    └─ PostHog SDK installé

[4] Auth flow
    └─ Page /login → formulaire email → magic link
    └─ Callback route /auth/callback
    └─ Middleware protège /dashboard/*

[5] Checkout flow
    └─ Page /pricing → bouton → API route /api/checkout/create
    └─ Stripe Checkout session créée
    └─ Webhook /api/webhooks/stripe → ordre créé en DB

[6] Onboarding post-paiement
    └─ Page /onboarding?session_id=xxx
    └─ Vérifie session Stripe + crée magic link auto (ou redirige vers /login)
    └─ Affiche Typeform embedded

[7] Portail client /dashboard
    └─ Vue commandes
    └─ Vue intake (si non complété)
    └─ Vue livrables (placeholder phase 1)
    └─ Lien support

[8] Analytics events (voir section 3)

[9] Page /support

[10] QA end-to-end + go-live
```

**Dépendances critiques :**
- [4] Auth dépend de [1] (Supabase configuré)
- [5] Checkout dépend de [2] (Stripe configuré)
- [6] Onboarding dépend de [4] ET [5]
- [7] Dashboard dépend de [4] (auth middleware)
- Tout dépend de [3] (projet Next.js initialisé)

---

## 3. Events analytics à implémenter

Liste finale, sans doublon :

| Event | Déclencheur | Propriétés clés |
|-------|-------------|-----------------|
| `landing_view` | Page `/` chargée | `referrer`, `utm_source` |
| `cta_primary_click` | Click CTA hero | `cta_label`, `cta_position` |
| `pricing_view` | Page `/pricing` chargée | — |
| `pricing_offer_click` | Click sur une offre | `offer_id`, `offer_price` |
| `checkout_start` | Redirection vers Stripe | `offer_id`, `offer_price` |
| `checkout_complete` | Webhook `checkout.session.completed` | `order_id`, `offer_id`, `amount` |
| `auth_magic_link_sent` | Email magic link envoyé | — |
| `auth_complete` | `onAuthStateChange` → SIGNED_IN | `user_id` |
| `intake_started` | Typeform `form-ready` event | `order_id`, `offer_id` |
| `intake_completed` | Typeform `submit` event | `order_id` |
| `support_page_view` | Page `/support` chargée | — |
| `support_contact_click` | Click mailto support | — |
| `dashboard_view` | Page `/dashboard` chargée | `user_id` |
| `deliverable_view` | Click sur un livrable | `order_id`, `deliverable_id` |

**Règle d'implémentation :** tous les events sont appelés avec `posthog.capture(event, properties)`. Les events côté serveur (checkout_complete) sont envoyés via PostHog Node SDK depuis la route webhook.

---

## 4. Contraintes techniques

### Bloque le lancement si non fait (phase 1 obligatoire)
- Auth magic link fonctionnel (sinon client ne peut pas accéder au portail)
- Webhook Stripe vérifié avec signature (sinon fraude possible)
- Middleware auth sur `/dashboard/*` (sinon portail ouvert à tous)
- Variables d'env propres sur Vercel (pas de clés hardcodées)
- Domaine custom + HTTPS (Vercel gère le TLS automatiquement)
- Email Resend configuré (magic link ne part pas sinon)

### Peut attendre phase 2
- Self-hosted PostHog
- Portail livrables complet (phase 1 = placeholder "votre livrable sera déposé ici sous X jours")
- Intake stocké en DB (phase 1 = Typeform dashboard suffit)
- OAuth social (Google, LinkedIn)
- Facturation automatique / portail Stripe Customer
- Multi-offre dans le même checkout (upsell)
- Notifications email post-onboarding automatisées

---

## 5. Handoff Emma — Parcours client post-paiement

**Ce que le client vit, de son point de vue :**

1. **Visite `/pricing`** → choisit une offre → clique "Commencer"
2. **Stripe Checkout** (page hébergée Stripe) → paiement CB → confirmation Stripe
3. **Retour sur `/onboarding`** → message "Paiement confirmé ✓"
4. **Typeform affiché** (embedded, sans redirection) → client remplit l'intake (10–15 questions sur son site, ses objectifs, ses concurrents)
5. **Message de fin** : "Merci ! Vous recevrez un email de confirmation avec les prochaines étapes sous 24h."
6. **Email automatique** (Resend, déclenché par webhook) : confirmation + lien vers le portail
7. **Magic link dans l'email** → client clique → accède à `/dashboard`
8. **Dans le dashboard** :
   - Statut de la commande (ex: "En cours d'analyse")
   - Intake complété ou à compléter
   - Section livrables (vide jusqu'à livraison, avec date estimée affichée)
   - Lien `/support` visible en permanence

**Ce qu'Emma doit savoir pour le support :**
- Si client dit "je n'ai pas reçu le magic link" → vérifier dans Supabase Auth > Users que l'email est correct, renvoyer manuellement depuis le dashboard Supabase
- Si client dit "mon paiement n'est pas reconnu" → vérifier dans Stripe Dashboard > Payments + table `orders` en DB
- Si client veut accéder à ses livrables → aller dans `/dashboard` > section livrables (dépôt manuel par Alexis pour phase 1)
- SLA affiché : 48h ouvrées pour toute réponse support

---

## Environnement de développement

```bash
# Variables d'env requises (.env.local)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

*Rédigé par Victor — TASK-GEO-004 — 2026-03-13*
*Ce fichier remplace la version draft. Victor peut démarrer TASK-GEO-008 directement.*
