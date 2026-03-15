#!/bin/bash
# twitter-briefing.sh — Daily X/Twitter morning briefing for Alexis
# Runs at 7:00am via cron
# Scrapes home timeline → AI summary → Notion + WhatsApp

set -euo pipefail

LOG_FILE="$HOME/.openclaw/logs/twitter-briefing.log"
mkdir -p "$(dirname "$LOG_FILE")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting Twitter briefing..." >> "$LOG_FILE"

PROMPT='Tu es Bidi, assistant personnel dAlexis. Il est 7h00. Execute le twitter morning briefing :

## Etape 1 — Scrape X/Twitter home timeline

Ouvre le browser profile openclaw sur https://x.com/home
Clique sur longlet "Abonné" (following feed, pas "Pour vous")
Fais 6-8 scrolls pour charger 100-200 tweets
Collecte pour chaque tweet : auteur, @handle, contenu, nb likes/RTs, URL

## Etape 2 — Selection et resume

Parmi tous les tweets collectes, selectionne les 15-20 les plus pertinents selon les interets dAlexis :
- AI agents, LLMs, Claude, OpenAI, Anthropic
- SaaS B2B, PME, entrepreneuriat
- Growth, marketing B2B, LinkedIn
- Tech startup (France + international)
- Productivite, outils builders
- Tout ce qui est actionnable pour Forge IA ou les projets actifs

Exclus : crypto hype pure, politique, sport, drama Twitter

## Etape 3 — Genere le briefing

Format du briefing :
```
🐦 Twitter Morning Briefing — [DATE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 TOP STORIES (3-5 tweets)
[bullet par tweet : une ligne, essentiel, avec @handle]

🧵 THREADS INTERESSANTS (2-3)
[bullet par thread : sujet + lien]

💡 IDEES ACTIONNABLES / A CREUSER (3-5)
[bullet : idee concrete + pourquoi cest pertinent pour toi]

⚡ QUICK HITS (5-7 tweets)
[bullet ultra-court par tweet]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Stats : X tweets scannes, Y selectionnes | [HH:MM]
```

## Etape 4 — Sauvegarder dans Notion

Utilise la Notion API (key dans ~/.config/notion/api_key) pour créer une page.
Cherche dabord une page parente "Daily" ou "Journal" dans Notion avec POST https://api.notion.com/v1/search {"query": "Daily"}.
Cree une sous-page avec le titre "[DATE] Twitter Briefing" et le contenu du briefing en blocs de texte.

## Etape 5 — Envoyer sur WhatsApp

Envoie le briefing sur WhatsApp au numero +33689289360 via le channel whatsapp.
Utilise le message tool avec action=send, channel=whatsapp, target=+33689289360.
Message concis, lisible en 2 min autour du café, emojis pour aérer.

GO — execute les 5 etapes maintenant.'

/opt/homebrew/bin/openclaw agent \
  --agent briefing \
  --local \
  --message "$PROMPT" \
  --thinking medium \
  --timeout 300 \
  >> "$LOG_FILE" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Twitter briefing done." >> "$LOG_FILE"
