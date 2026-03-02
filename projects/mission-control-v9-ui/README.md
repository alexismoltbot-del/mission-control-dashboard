# Mission Control V9 — Dashboard Forge IA

Dashboard de supervision premium pour les agents IA. Design dark glassmorphism, animations Framer Motion, polling live toutes les 5s.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **Lucide React** (icônes)
- **Port:** 3001

## Lancement

```bash
cd projects/mission-control-v9-ui
npm install
npm run dev
```

Ouvre: http://localhost:3001

## Build production

```bash
npm run build
npm start
```

## Sections

| Section | Description |
|---------|-------------|
| **Metrics Bar** | Compteurs live en haut (tâches, agents actifs, completion %) |
| **Kanban** | Vue 4 colonnes: Backlog / En cours / En revue / Terminé |
| **Agents Panel** | Anna, Bidi, Franck, John, Jimmy avec statut live |
| **Activity Feed** | Timeline des discussions inter-agents |
| **Cron Jobs** | Jobs planifiés avec statut et schedule |

## Sources de données

| API | Fichier lu |
|-----|-----------|
| `/api/board` | `/Users/alexis/.openclaw/shared/tasks/board.md` |
| `/api/discussions` | `/Users/alexis/.openclaw/shared/discussions/*.md` |
| `/api/agents` | Agrégé depuis board.md + discussions/ |
| `/api/crons` | `crontab -l` du système |

> Si les fichiers n'existent pas, le dashboard affiche des données mock.

## Design

- Background: `#0a0a0a`
- Accent: `#E8601C` (orange Forge IA)
- Font: Inter
- Cards: glassmorphism `rgba(255,255,255,0.02)` + `backdrop-filter: blur(20px)`
- Grid background subtil
- Animations: entrée, hover, pulse dots live

## Agents & couleurs

| Agent | Couleur | Rôle |
|-------|---------|------|
| Bidi | `#E8601C` | Coordinateur Général |
| Anna | `#a855f7` | Dir. Marketing |
| Franck | `#22c55e` | Dir. Financier |
| John | `#3b82f6` | Opérations |
| Jimmy | `#f59e0b` | Développeur |

## Structure des fichiers

```
src/
├── app/
│   ├── globals.css          # Styles globaux + variables CSS
│   ├── layout.tsx           # Layout root (Google Fonts Inter)
│   ├── page.tsx             # Page principale + polling 5s
│   └── api/
│       ├── board/route.ts   # Parse board.md → tâches Kanban
│       ├── discussions/route.ts  # Parse discussions/*.md → feed
│       ├── agents/route.ts  # Statuts agents depuis fichiers
│       └── crons/route.ts   # Lecture crontab système
├── components/
│   ├── MetricsBar.tsx       # Barre métriques sticky en haut
│   ├── KanbanBoard.tsx      # Vue Kanban 4 colonnes
│   ├── AgentsPanel.tsx      # Panel agents avec statuts live
│   ├── ActivityFeed.tsx     # Timeline activité inter-agents
│   └── CronPanel.tsx        # Panel cron jobs
└── lib/
    ├── types.ts             # Interfaces TypeScript partagées
    └── utils.ts             # Helpers (couleurs, dates, etc.)
```

---

Built by @jimmy · Mission Control V9 · Forge IA
