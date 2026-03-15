# GEO Agency - A/B Tests & Funnel KPIs v1

_Last updated: 2026-03-12 by leo_

---

## Context

At launch, traffic will be low. This means:

- run **one test at a time**, maximum
- statistical significance will take weeks — that's fine
- prioritize learning over proof in phase 1
- minimum viable measurement beats elaborate dashboards

---

## Funnel KPI hierarchy

These are the numbers that matter, in order of importance:

| # | KPI | Event name | Why it matters |
|---|-----|------------|----------------|
| 1 | Visits | `page_view` | Total addressable audience reaching the site |
| 2 | CTA click-through rate | `cta_click` | First signal of promise/audience fit |
| 3 | Pricing page views | `pricing_view` | Interest beyond curiosity |
| 4 | Checkout starts | `checkout_start` | Real purchase intent |
| 5 | Purchases | `purchase` | Revenue |
| 6 | Auth completions | `auth_complete` | Activation (client crosses the threshold) |
| 7 | Intake completions | `intake_complete` | Operational readiness — client is workable |

**North star for phase 1:** `checkout_start` rate (visits → checkout). Target: 2–5%.

---

## Test prioritization logic

Only 3 variables affect checkout_start before the visitor sees pricing:

1. Whether the hero promise creates enough pull (headline)
2. Whether the CTA label creates enough urgency (button copy)
3. Whether pricing is visible early or revealed after click

These are the only 3 tests worth running at launch. Everything else is noise.

---

## Test 1 — Hero promise (run first)

**Hypothesis:** "source AI systems can cite" converts better than "visibility to AI search" because it is outcome-specific and credible.

| | Variant A | Variant B |
|--|-----------|-----------|
| **Copy** | Become a source AI systems can index, trust, and cite | Get visible in AI search results and LLM answers |
| **Frame** | Technical credibility | Outcome promise |

- **Primary metric:** `cta_click` rate (clicks / visits)
- **Secondary metric:** time-on-page before click
- **Minimum sample:** 50 unique visitors per variant before reading results
- **Duration estimate at low traffic:** 3–4 weeks
- **Risk if wrong:** only hero copy changes, nothing else breaks

---

## Test 2 — Primary CTA label (run after Test 1 concludes)

**Hypothesis:** "Launch my GEO audit" converts better because it frames the action as starting something, not requesting a commodity.

| | Variant A | Variant B |
|--|-----------|-----------|
| **Label** | Launch my GEO audit | Get my AI visibility audit |
| **Frame** | Active / ownership | Passive / service request |

- **Primary metric:** `checkout_start` rate (checkout_starts / cta_clicks)
- **Secondary metric:** `cta_click` rate
- **Minimum sample:** 50 unique visitors per variant
- **Run sequentially** after Test 1 — do not layer

---

## Test 3 — Pricing visibility (run only if Tests 1+2 show stalled checkout)

**Hypothesis:** Showing pricing on the homepage removes friction and increases checkout starts — but may filter out clients who need context first.

| | Variant A | Variant B |
|--|-----------|-----------|
| **Placement** | Pricing section on homepage | Pricing on dedicated page after CTA click |
| **Risk** | Anchors price before trust | Adds a step, risks drop-off |

- **Primary metric:** `checkout_start` rate (checkout_starts / visits)
- **Secondary metric:** drop-off between `cta_click` and `pricing_view`
- **Hold this test** until Test 1 and Test 2 results are in — do not run blind

---

## Instrumentation checklist

Before going live, confirm these events fire correctly:

- [ ] `page_view` — fires on every page load with `page_name` param
- [ ] `cta_click` — fires on every primary CTA click with `variant` param
- [ ] `pricing_view` — fires when pricing section enters viewport
- [ ] `checkout_start` — fires on Stripe checkout redirect
- [ ] `purchase` — fires on Stripe webhook success event
- [ ] `auth_complete` — fires after magic link auth confirmed
- [ ] `intake_complete` — fires on intake form submission

**Recommended tool:** Plausible (privacy-first, no GDPR banner, script-ready) or Posthog (feature flags + A/B built-in). Lock the choice before launch.

---

## Low-traffic guardrails

- Do not declare a winner before 50 visits per variant
- Do not run more than one test at a time if weekly visits < 200
- Do not change pricing, copy, and layout simultaneously — that is not a test, it is a relaunch
- Keep event names stable — changing them mid-test destroys the data

---

## Status

- Test 1: **ready to instrument**
- Test 2: **ready to sequence after Test 1**
- Test 3: **on hold pending Test 1 + Test 2 results**
