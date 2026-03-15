# Content Quality Crew — TEAM.md

## Mission
Produire du contenu de niveau publication (LinkedIn, Substack, blog) avec un pipeline multi-agents rigoureux. Rien ne sort sans passer par le Judge. Seuil : 92/100.

## Équipe

| Rôle | Modèle | Persona | Responsabilité |
|------|--------|---------|----------------|
| **Researcher** | claude-sonnet-4-6 | Analyste senior | Recherche, faits, contexte, sources |
| **Writer** | claude-opus-4-6 | Rédacteur expert | Draft initial complet |
| **Critic** | claude-opus-4-6 | Rédac chef HBR 20 ans | Critique structurée JSON + version révisée |
| **Judge** | claude-opus-4-6 | Panel d'éditeurs senior | Scoring rubric 6 critères, verdict final |
| **Supervisor** | claude-sonnet-4-6 | Coordinateur pipeline | Décide loop/publish, notif Telegram |

## Workflow

```
Task (brief + format + audience)
  │
  ▼
[Researcher] → research_brief.md (faits, angles, sources)
  │
  ▼
[Writer] → draft_v{n}.md (contenu complet)
  │
  ▼
[Critic] → critique_{n}.json (score JSON + suggestions + version révisée)
  │
  ▼
[Judge] → verdict_{n}.json (score global /100, verdict PUBLISH/LOOP)
  │
  ├── score < 92 AND tour ≤ 3 → loop back to Critic avec feedback
  └── score ≥ 92 OR tour > 3 → PUBLISH READY → Supervisor notifie
```

## Règles
- Max 3 tours de révision (après, Supervisor décide publish ou abandon)
- Tous les outputs loggés dans `shared/content-pipeline/{task_id}/`
- Webhook Telegram quand PUBLISH READY
- Mission Control: kanban automatique (Research → Draft → Review → Approved)

## Fichiers par run
```
shared/content-pipeline/{task_id}/
├── brief.md          ← input original
├── research.md       ← output Researcher
├── draft_v1.md       ← output Writer
├── critique_1.json   ← output Critic tour 1
├── verdict_1.json    ← output Judge tour 1
├── draft_v2.md       ← si loop (revision du Critic)
├── critique_2.json
├── verdict_2.json
└── final.md          ← contenu PUBLISH READY
```
