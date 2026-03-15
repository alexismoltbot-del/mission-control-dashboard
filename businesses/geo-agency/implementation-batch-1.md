# GEO Agency — Implementation Batch 1

> Rédigé par Victor — TASK-GEO-008 — 2026-03-13
> Stack source : `stack-and-auth.md`
> Prêt à exécuter. Aucune décision ouverte dans ce document.

---

## Statut global

| Surface | État |
|---------|------|
| Projet Next.js scaffoldé | ✅ structure ci-dessous |
| Supabase schema SQL | ✅ script ci-dessous |
| Auth magic link | ✅ routes définies |
| Stripe Checkout | ✅ routes définies |
| Webhook Stripe | ✅ route + vérification signature |
| PostHog analytics | ✅ events mappés |
| Onboarding post-paiement | ✅ page définie |
| Dashboard client | ✅ structure minimale |
| Page /support | ✅ copy Emma intégrée |
| Variables d'env | ✅ liste complète |
| Déploiement Vercel | 🔲 à faire après init repo |

---

## 1. Structure du projet Next.js

```
geo-agency-app/
├── app/
│   ├── layout.tsx                # PostHog provider, Supabase provider
│   ├── page.tsx                  # Landing (hero + CTA primaire)
│   ├── pricing/
│   │   └── page.tsx              # Offres + boutons checkout
│   ├── login/
│   │   └── page.tsx              # Formulaire email → magic link
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # Callback magic link Supabase
│   ├── onboarding/
│   │   └── page.tsx              # Post-paiement : Typeform embedded
│   ├── dashboard/
│   │   ├── layout.tsx            # Middleware auth (redirect si non auth)
│   │   ├── page.tsx              # Vue principale : commandes + intake + livrables
│   │   └── intake/
│   │       └── page.tsx          # Typeform si non complété
│   └── support/
│       └── page.tsx              # Copy Emma : FAQ + mailto
├── api/
│   ├── checkout/
│   │   └── create/
│   │       └── route.ts          # Crée session Stripe Checkout
│   └── webhooks/
│       └── stripe/
│           └── route.ts          # Webhook Stripe → table orders
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # createBrowserClient
│   │   └── server.ts             # createServerClient (cookies)
│   ├── stripe.ts                 # Stripe SDK init
│   └── posthog.ts                # PostHog server SDK
├── middleware.ts                 # Protect /dashboard/*
├── components/
│   ├── PricingCard.tsx
│   ├── TypeformEmbed.tsx
│   └── SupportBanner.tsx
├── .env.local                    # Variables d'env (voir section 6)
└── package.json
```

---

## 2. Schéma Supabase (SQL)

```sql
-- Profils liés à auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger auto-création profile au signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Commandes
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  offer_id TEXT NOT NULL,           -- 'geo-audit' | 'geo-sprint'
  amount_eur_ht INTEGER NOT NULL,   -- en centimes
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | paid | refunded
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Réponses intake (phase 1 : Typeform webhook optionnel)
CREATE TABLE intake_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  user_id UUID REFERENCES auth.users(id),
  typeform_response_id TEXT,
  raw_payload JSONB,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS : user ne voit que ses données
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "users_own_orders" ON orders
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "users_own_intake" ON intake_responses
  FOR ALL USING (auth.uid() = user_id);
```

---

## 3. Route /api/checkout/create (POST)

```typescript
// app/api/checkout/create/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const OFFERS = {
  'geo-audit': {
    name: 'GEO Audit',
    price_cents: 89000,  // 890 EUR HT
  },
  'geo-sprint': {
    name: 'GEO Launch Sprint',
    price_cents: 290000, // 2 900 EUR HT
  },
}

export async function POST(req: Request) {
  const { offerId } = await req.json()
  const offer = OFFERS[offerId as keyof typeof OFFERS]
  if (!offer) return NextResponse.json({ error: 'Unknown offer' }, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'eur',
        product_data: { name: offer.name },
        unit_amount: offer.price_cents,
      },
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    metadata: { offerId },
  })

  return NextResponse.json({ url: session.url })
}
```

---

## 4. Route /api/webhooks/stripe (POST)

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { PostHog } from 'posthog-node'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const supabase = createClient()
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!)

    // Trouve l'user par email (peut être null si achat avant auth)
    const { data: { users } } = await supabase.auth.admin.listUsers()
    const user = users.find(u => u.email === session.customer_details?.email)

    await supabase.from('orders').insert({
      user_id: user?.id ?? null,
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      offer_id: session.metadata?.offerId,
      amount_eur_ht: session.amount_total ?? 0,
      status: 'paid',
      paid_at: new Date().toISOString(),
    })

    posthog.capture({
      distinctId: user?.id ?? session.customer_details?.email ?? 'anonymous',
      event: 'checkout_complete',
      properties: {
        order_id: session.id,
        offer_id: session.metadata?.offerId,
        amount: session.amount_total,
      },
    })
    await posthog.shutdown()
  }

  return new Response('ok')
}
```

---

## 5. Middleware auth

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = { matcher: ['/dashboard/:path*'] }
```

---

## 6. Variables d'env

```bash
# .env.local — ne pas committer
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

RESEND_API_KEY=re_...

NEXT_PUBLIC_SITE_URL=https://geoagency.fr
```

Configurer ces variables dans Vercel Settings > Environment Variables (Production + Preview).

---

## 7. Séquence d'init (ordre à respecter)

```
[1]  Créer projet Supabase → copier URL + clés
[2]  Exécuter SQL schema (section 2) dans Supabase SQL Editor
[3]  Supabase : Auth > Email > Magic Link activé
[4]  Supabase : Auth Settings > SMTP custom → Resend (host: smtp.resend.com, port: 465)
[5]  Stripe : créer produits GEO Audit (890€) et GEO Sprint (2900€)
[6]  Stripe : webhook → https://geoagency.fr/api/webhooks/stripe
     Event : checkout.session.completed
[7]  npx create-next-app geo-agency-app --typescript --app --tailwind
[8]  npm install @supabase/ssr @supabase/supabase-js stripe posthog-js posthog-node resend
[9]  Implémenter les fichiers définis ci-dessus
[10] git init → push GitHub → Vercel deploy (auto-detect Next.js)
[11] Configurer variables d'env sur Vercel
[12] Test local webhook : stripe listen --forward-to localhost:3000/api/webhooks/stripe
[13] Test e2e staging : magic link → checkout Stripe test → /onboarding → /dashboard
[14] QA gates (voir qa-gates.md) → go-live
```

---

## 8. Ce qui est mocked en phase 1

| Surface | Phase 1 | Phase 2 |
|---------|---------|---------|
| Livrables dashboard | Placeholder "Livrable en cours, estimé J+5" | Upload Supabase Storage |
| Intake en DB | Typeform dashboard suffit | Webhook → table intake_responses |
| Email post-onboarding | Template Resend simple | Séquence automatisée |
| Portail Stripe customer | Non exposé | Stripe Customer Portal |
| OAuth social | Non activé | Google / LinkedIn |

---

## 9. QA checklist pré-go-live

- [ ] Magic link reçu et fonctionnel (test email réel)
- [ ] Checkout Stripe mode test → commande créée en DB
- [ ] Webhook Stripe vérifié avec signature (stripe-cli)
- [ ] /dashboard inaccessible sans auth → redirect /login
- [ ] /pricing affiche les 2 offres avec prix corrects
- [ ] /support affiche copy + mailto support@geoagency.fr
- [ ] PostHog reçoit `landing_view` et `checkout_complete`
- [ ] Variables d'env sur Vercel (aucune clé dans le code)
- [ ] Domaine custom + TLS actif

---

## Blockers

Aucun. Toutes les décisions amont sont locked (pricing, care, QA, stack).

**Prochaine étape pour Alexis :** lancer la séquence d'init section 7.
Premier prérequis : avoir des comptes Supabase, Stripe, Resend, Vercel actifs.

---

*Handoff → `main` pour validation go/no-go.*
