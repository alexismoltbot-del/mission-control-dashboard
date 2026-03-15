# GEO Agency - Go / No-Go Packet

_Rédigé par Bidi — 2026-03-14_
_TASK-GEO-009 — Integrated launch review_

---

## Verdict

**→ LAUNCH WITH CAVEATS**

Le produit est prêt sur le plan commercial, financier et opérationnel.
Le seul vrai bloquant est technique : le site n'est pas encore buildé.
Tout ce qui conditionne le build est déjà décidé, à une exception près (direction design).

---

## Analyse par QA Gate

| Gate | Statut | Notes |
|------|--------|-------|
| **Gate 1 — Offer clarity** | ✅ VERT | Pricing complet (890 / 2900 / 1500€/mois), livrables explicites, exclusions documentées |
| **Gate 2 — Trust** | ✅ VERT | Aucun claim insoutenable, process visible, support explicite, SLA affiché |
| **Gate 3 — Conversion path** | ⚠️ ORANGE | Structure définie, CTA identifié, mais le site n'est pas construit |
| **Gate 4 — Auth and care** | ⚠️ ORANGE | Stack décidé (Supabase + magic link), onboarding Emma prêt, mais non implémenté |
| **Gate 5 — Technical hygiene** | ⚠️ ORANGE | Events mappés, stack validé, mais déploiement non commencé |
| **Gate 6 — A/B readiness** | ✅ VERT | 2 tests définis, métriques choisies, events mappés |

---

## Signaux verts (blocages levés)

- **Pricing** : tranché, défendable, source de vérité unique (pricing.md)
- **Stack** : décidé (Next.js + Vercel + Supabase + Stripe + PostHog + Resend)
- **Séquence de build** : documentée en 10 étapes ordonnées avec dépendances
- **Customer care** : Emma a livré les emails, la FAQ, la checklist onboarding, le protocole d'escalade
- **QA gates** : rédigées, critères de blocage clairs
- **A/B tests** : 2 tests prêts (hero copy + CTA label), métriques définies
- **Onboarding client** : séquence email complète, wording prêt à copier-coller
- **Design** : 4 directions produites + hybrid recommandé (TASK-GEO-013 en review)
- **US market** : scanné, décision-ready (TASK-GEO-012 done)

---

## Risques bloquants

### Risque 1 — Design direction non validée (critique)
**Quoi :** TASK-GEO-013 est en review. Anna a livré les 4 directions + la recommandation hybrid.
Victor ne peut pas démarrer TASK-GEO-014 (front build brief) sans que la direction soit choisie.
**Impact :** le build est retardé d'autant.
**Action requise d'Alexis :** lire `businesses/geo-agency/design-directions-v1.md` et confirmer la direction hybrid ou choisir une alternative.

### Risque 2 — Implémentation batch 1 non démarrée (critique)
**Quoi :** TASK-GEO-008 est en waiting_human. Victor attend APR-GEO-008-INIT.
**Impact :** 10 étapes de build (Supabase, Stripe, Next.js, auth, checkout…) non démarrées.
**Action requise d'Alexis :** valider APR-GEO-008-INIT pour débloquer Victor.

### Risque 3 — Pas de preuve client pour phase 1 (gérable)
**Quoi :** les case studies de direction 2 nécessitent des résultats réels. Phase 1 sera sans preuve externe.
**Mitigation :** utiliser la direction hybrid avec case study clairement labellisé [EXEMPLE] ou cibler Direction 3 (founder trust) en attendant les premiers retours. Décision d'Alexis.

### Risque 4 — Prix site vs stack (mineur)
**Quoi :** le fichier stack mentionne 490€ et 1490€ pour Stripe, mais pricing.md dit 890€ et 2900€.
**Impact :** incohérence à corriger avant la config Stripe. Victor doit utiliser pricing.md comme référence.
**Action :** Victor corrige les prix dans la config Stripe avant déploiement.

---

## Prochaines actions débloquées par Alexis

| Priorité | Action | Qui | Dépend de |
|----------|--------|-----|-----------|
| 🔴 P0 | Valider APR-GEO-008-INIT | Alexis | — |
| 🔴 P0 | Choisir la direction design (hybrid recommandé) | Alexis | lecture design-directions-v1.md |
| 🟡 P1 | Front build brief (TASK-GEO-014) | Victor | choix design |
| 🟡 P1 | Config Stripe avec bons prix (890/2900€) | Victor | APR-GEO-008 |

---

## Approvals en attente (récapitulatif)

| ID | Objet | Deadline | Urgence |
|----|-------|----------|---------|
| APR-GEO-008-INIT | Démarrer la séquence de build (14 étapes) | 2026-03-14 | 🔴 Overdue |
| APR-FG-007-STACK | FiscalGPT : stack + entité légale avant Stripe | 2026-03-14 | 🟡 À décider |

---

## Verdict final

Le produit GEO Agency est **client-ready sur le plan conceptuel et commercial**.
Il n'est pas encore client-ready sur le plan technique (site non construit).

**Débloquer les 2 approvals ci-dessus = 1 décision = Victor peut démarrer le build demain.**

Estimation réaliste pour un site en ligne : 5–10 jours ouvrés après feu vert.

---

_Source de vérité : ce fichier remplace le template vide go-no-go.md._
_Décision finale : Alexis._
