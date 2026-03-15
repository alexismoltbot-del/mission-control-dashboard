# Content Quality Crew

**Version:** 1.0  
**Créé:** 2026-03-02  
**Seuil de publication:** 92/100 (tous critères ≥ 9)

## Usage

Déclenche ce skill quand tu dois produire du contenu de qualité publication :
- Posts LinkedIn (Alexis)
- Articles Substack
- Threads
- Blog posts Forge IA

## Invocation

```
Utilise le content-quality-crew pour écrire un post LinkedIn sur [sujet].
Audience: [dirigeants PME / investisseurs / etc]
Angle: [ex: pourquoi les PME françaises ratent leur transformation IA]
Ton: [direct, sans bullshit / inspirant / technique]
Longueur: [ex: 300 mots / long-form 1500 mots]
```

## Pipeline automatique

```
Brief → Researcher → Writer → Critic → Judge → Supervisor
                                  ↑_________|  (si LOOP, max 3 tours)
```

### Étapes

1. **Researcher** (sonnet-4-6) — Analyse le sujet, angles, faits
   - Output: `research.md`
   
2. **Writer** (opus-4-6) — Rédige le draft complet
   - Output: `draft_v{n}.md`
   
3. **Critic** (opus-4-6, persona HBR 20 ans) — Critique JSON + version révisée
   - Output: `critique_{n}.json`
   - Contient: scores 6 critères + suggestions + revised_version
   
4. **Judge** (opus-4-6, panel éditeurs) — Verdict final
   - Output: `verdict_{n}.json`
   - PUBLISH READY si tous critères ≥ 9 ET score ≥ 92
   - Sinon LOOP → retour Critic (max 3 tours)
   
5. **Supervisor** (sonnet-4-6) — Décision + notifs
   - Copie `final.md` si PUBLISH READY
   - Notifie Telegram
   - Log Mission Control

## Fichiers de rôles

- `roles/researcher.md` — Prompt Researcher
- `roles/writer.md` — Prompt Writer  
- `roles/critic.md` — Prompt Critic (persona HBR)
- `roles/judge.md` — Prompt Judge (grille 6 critères)
- `roles/supervisor.md` — Prompt Supervisor (orchestration)

## Logs

Tous les runs loggés dans :
```
~/.openclaw/shared/content-pipeline/{task_id}/
├── brief.md
├── research.md
├── draft_v1.md → draft_vN.md
├── critique_1.json → critique_N.json
├── verdict_1.json → verdict_N.json
└── final.md  (si PUBLISH READY)
```

## Intégration Mission Control

Workflow "Content Production" dans Mission Control Builderz :
- Kanban: Research → Draft → Review → Approved/Blocked
- Quality gate: require_approval + minimum_score: 92
- Live Feed: scores en temps réel
- Webhook Telegram sur PUBLISH READY

## Critères Judge (6 axes, tous ≥ 9 requis)

| Critère | Poids | Description |
|---------|-------|-------------|
| Précision factuelle | 20% | Claims exacts, vérifiables |
| Profondeur analytique | 20% | Insights non-évidents |
| Originalité | 20% | Angle unique, mémorable |
| Clarté & structure | 15% | Flow logique, lisible |
| Ton & voix | 10% | Authentique, cohérent persona Alexis |
| Impact & valeur lecteur | 15% | Apprend, change, agit |

**Score = (P×20 + D×20 + O×20 + C×15 + T×10 + I×15) / 10**
