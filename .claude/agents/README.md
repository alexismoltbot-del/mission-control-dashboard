# Agent Fleet — Alexis Bidinot

Structure inspirée de Vadim @VadimStrizheus — "a company is now a folder"

## Équipe
| Agent | Fichier | Rôle |
|-------|---------|------|
| Bidi | bidi.md | Coordinateur général, interface Alexis |
| Anna | anna.md | Marketing, LinkedIn, Substack, PMF |
| Franck | franck.md | Finance, dépenses, revenus, factures |
| John | john.md | Opérations, clients, admin, process |
| Jimmy | jimmy.md | Dev |

## Comment spawner un agent
```
sessions_spawn(task="[mission]", agentId="main", runtime="subagent")
```

## Contexte partagé
```
~/.openclaw/shared/
├── tasks/board.md           ← Tâches de toute l'équipe
├── discussions/YYYY-MM-DD.md ← Échanges entre agents
├── outputs/                  ← Livrables par agent
└── context/                  ← Contexte partagé
```

## Mise à jour
Dernière mise à jour : 2026-03-02 par Bidi
