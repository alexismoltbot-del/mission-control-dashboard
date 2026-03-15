# 🗺️ Carte des Agents OpenClaw — 13 mars 2026

## Vue d'ensemble

**4 clusters** d'agents + **1 standalone** = **~30 agents** au total.

```
┌──────────────────────────────────────────────────────────────────┐
│                         ALEXIS (humain)                         │
│                    Décide · Arbitre · Signe                     │
└────────┬──────────────┬──────────────┬──────────────┬───────────┘
         │              │              │              │
    ┌────┴────┐   ┌─────┴─────┐  ┌────┴────┐  ┌─────┴──────┐
    │ FACTORY │   │  RENEGO   │  │COURRIER │  │ GEO AGENCY │
    │ (Usine) │   │ (ReneGo) │  │   IA    │  │    V1      │
    │ 9 agents│   │ 7 agents │  │7 agents │  │ 6 agents   │
    └─────────┘   └──────────┘  └─────────┘  └────────────┘
         │              │              │              │
      + Bruno B     (crons actifs) (pas de cron)  (pas de cron)
      (standalone)
```

---

## 1. 🏭 FACTORY — L'Usine à Business

**Dossier :** `/Users/alexis/agents/` + crons OpenClaw
**But :** Opérer tous les business d'Alexis en continu

```
                       ┌─────────┐
                       │  BIDI   │  CEO / Orchestrateur
                       │ (main)  │  Priorise, corrige, synthétise
                       └────┬────┘
                            │
         ┌──────────┬───────┼───────┬──────────┐
         │          │       │       │          │
    ┌────┴───┐ ┌────┴───┐ ┌┴─────┐ ┌┴────────┐ ┌┴───────┐
    │  ANNA  │ │  JADE  │ │VICTOR│ │  EMMA   │ │ FRANCK │
    │Content │ │Voiture │ │ CTO  │ │ CS/Ops  │ │  CFO   │
    └────────┘ └────────┘ └──────┘ └─────────┘ └────────┘
                                        │
                                   ┌────┴───┐
                                   │  LÉO   │
                                   │ Growth │
                                   └────────┘
```

| Agent | Rôle | Fréquence cron | Modèle | Santé |
|-------|------|----------------|--------|-------|
| **Bidi** | Orchestrateur système + approval digest WhatsApp | 3x/j + 2x/j digest | sonnet | ⚠️ |
| **Anna** | Contenu : LinkedIn, Substack, livrables éditoriaux | 2x/j (9h, 18h) | sonnet | ⚠️ |
| **Jade** | Voiture : comparatifs, vente Fiat, parking Neuilly | 4x/j + 2x/j relances | sonnet | ✅ / ⚠️ |
| **Victor** | Infra, scripts, monitoring, templates automation | 3x/j | sonnet | ✅ |
| **Emma** | Onboarding, docs, support, handoffs clients | 2x/j | sonnet | ✅ |
| **Franck** | Finance, pricing, cash, CGV, facturation | 1x/j (8h10) | sonnet | ✅ |
| **Léo** | Growth, KPIs, funnel, A/B tests | 1x/j (20h20) | sonnet | ❌ 2 err |

**Flux :** Chaque agent lit `shared/system/views/tasks-by-owner.md` → prend une tâche `ready`/`running` → avance d'un pas → met à jour → `refresh_openclaw_system.py`. Bidi surveille et notifie Alexis via WhatsApp.

---

## 2. 🔄 RENEGO — Équipe Sprint ReneGo

**Dossier :** `/Users/alexis/Documents/Playground/renego-commodites-fr/openclaw-team/agents/`
**But :** Lancer ReneGo (négociation factures box internet FR) d'ici le 15 mars
**Sprint :** 12-15 mars 2026

```
  ┌─────────────┐     ┌────────────┐
  │ RESEARCH US │     │ OFFERS FR  │
  │ Veille US   │     │ Veille prix│
  └──────┬──────┘     └─────┬──────┘
         │                  │
         │  handoffs/       │  handoffs/
         │  research-to-pm  │  offers-to-pm
         ▼                  ▼
       ┌─────────────────────┐
       │         PM          │
       │  Orchestration      │
       │  sprint + décisions │
       └──┬──────────┬───────┘
          │          │
    pm-to-dev    pm-to-growth
          │          │
          ▼          ▼
    ┌──────────┐  ┌──────────┐
    │   DEV    │  │  GROWTH  │
    │  Code    │  │ Landing  │
    │  produit │  │ GTM/copy │
    └────┬─────┘  └──────────┘
         │
    dev-to-qa
         │
         ▼
    ┌──────────┐
    │    QA    │
    │ Launch   │
    │  gate    │
    └────┬─────┘
         │
    qa-to-pm → PM Approval Ping → WhatsApp Alexis
```

| Agent | Rôle | Fréquence | Modèle | Santé |
|-------|------|-----------|--------|-------|
| **Research US** | Comparables US (Rocket Money, Billshark…) | 6x/j | gpt-5.4 | ❌ 5 err |
| **Offers FR** | Veille offres box FR, prix, liens | 6x/j | gpt-5.4 | ❌ 5 err |
| **PM** | Backlog, décisions, handoffs, sprint | 6x/j | gpt-5.4 | ❌ 5 err |
| **Dev** | Code produit, fixes, vérifications | 6x/j | gpt-5.4 | ❌ 5 err |
| **QA** | Gate qualité, régressions, verdict GO/NO-GO | 6x/j | opus | ❌ 5 err |
| **Growth** | Positionnement, landing copy, plan lancement | 6x/j | gpt-5.4 | ❌ 5 err |
| **PM Approval Ping** | Notifie Alexis si décision bloquée | 1x/h | sonnet | ✅ |

⚠️ **6/7 agents cassés** — même erreur : `Channel is required when multiple channels are configured`.

---

## 3. 📬 COURRIERIA — Équipe Projet CourrierIA V1

**Dossier :** `/Users/alexis/Documents/Playground/courrieria-agent-team-v1/agents/`
**But :** Construire CourrierIA V1 (gestion courrier automatisée pour PME)
**Pas de crons actifs** — architecture définie, prête à être orchestrée

```
                    ┌──────────────┐
                    │      PM      │
                    │ Orchestrator │
                    └──────┬───────┘
                           │
        ┌──────────┬───────┼───────┬──────────┐
        │          │       │       │          │
  ┌─────┴────┐ ┌───┴────┐ ┌┴──────┐ ┌┴───────┐ ┌┴──────────┐
  │DOCUMENT  │ │WORKFLOW│ │PRODUCT│ │ TRUST  │ │GTM LAUNCH │
  │   AI     │ │AUTOMAT.│ │BUILDER│ │COMPLI. │ │           │
  └────┬─────┘ └───┬────┘ └───┬───┘ └────────┘ └───────────┘
       │           │           │
       └─────────┐ │ ┌─────────┘
                 ▼ ▼ ▼
              ┌─────────┐
              │ QA RISK │
              │ Verdict │
              └─────────┘
```

| Agent | Rôle | Livrables |
|-------|------|-----------|
| **PM** | Scope, distribution, arbitrage, vérité du run | job.yaml, backlog, final-pack |
| **Document AI** | Taxonomie, extraction, OCR, seuils confiance | doc-engine-spec |
| **Workflow Automation** | Matrice courrier→action, drafts, escalades | action-engine-spec |
| **Product Builder** | Flow upload→inbox→action, intégration | product-build-notes |
| **Trust & Compliance** | RGPD, rétention, claims, gates humains | trust-pack |
| **GTM Launch** | Pricing, landing, onboarding, FAQ, demo | commercial-pack |
| **QA Risk** | Tests, findings, verdict GO/NO-GO | qa-report |

---

## 4. 🌐 GEO AGENCY V1 — Équipe SEO/GEO pour LLMs

**Dossier :** `.../renego-commodites-fr/openclaw-team/geo-agency-v1/agents/`
**But :** Agence GEO — indexation et citation dans ChatGPT, Perplexity, Gemini
**Pas de crons actifs** — blueprint défini

```
              ┌──────────────┐
              │      PM      │
              └──────┬───────┘
                     │
     ┌───────┬───────┼───────┬────────┐
     │       │       │       │        │
  ┌──┴──┐ ┌──┴───┐ ┌┴─────┐ ┌┴──────┐ ┌┴──────┐
  │GEO  │ │GEO   │ │GEO   │ │PRODUC│ │QA    │
  │RSCH │ │CONT. │ │TECH  │ │BUILD.│ │RISK  │
  └─────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

| Agent | Rôle |
|-------|------|
| **PM** | Scope, distribution, pack final |
| **GEO Research** | Audit citations LLM, analyse concurrents |
| **GEO Content Entity** | Briefs contenu, entités, structuration |
| **GEO Tech** | llms.txt, schema.org, tickets techniques |
| **Product Builder** | Intégration des recommandations |
| **QA Risk** | Vérification claims, verdict |

---

## 5. 📧 BRUNO B — Agent Standalone

**Dossier :** `/Users/alexis/agents/bruno-b/`
**But :** Envoyer des emails de conseil stratégique (immo/acquisition) à un client

```
  ┌───────────┐    due?     ┌────────────┐    email    ┌──────────┐
  │ Cron 2x/j │───────────▶│  Bruno B   │───────────▶│  Client  │
  │10h15/16h15│            │  (rédige)  │   SMTP     │ AMB SARL │
  └───────────┘            └────────────┘            └──────────┘
```

| Fréquence | Modèle | Santé |
|-----------|--------|-------|
| 2x/jour | sonnet | ✅ OK |

---

## 📊 Résumé santé globale

| Cluster | Agents | Crons actifs | ✅ | ⚠️ | ❌ |
|---------|--------|-------------|---|---|---|
| Factory | 9 | 10 | 5 | 4 | 1 |
| Renego | 7 | 7 | 1 | 0 | 6 |
| CourrierIA | 7 | 0 | — | — | — |
| GEO Agency | 6 | 0 | — | — | — |
| Bruno B | 1 | 1 | 1 | 0 | 0 |
| **Total** | **~30** | **18** | **7** | **4** | **7** |

## 🔧 Actions recommandées

1. **Renego (urgent)** : fixer le `delivery.channel` sur les 6 crons cassés — même erreur depuis 5 runs
2. **Factory** : erreurs de write sur `shared/system/approvals/` — problème permissions ou path
3. **Léo** : 2 erreurs consécutives, va trigger une alerte WhatsApp au prochain échec
4. **CourrierIA + GEO Agency** : pas de crons — à activer quand prêts à lancer
