#!/bin/bash
# backup-config.sh — Backup quotidien config OpenClaw vers GitHub privé
# Repo : https://github.com/alexismoltbot-del/bidi-config

set -euo pipefail

BACKUP_DIR="$HOME/.openclaw/backup"
WORKSPACE="$HOME/.openclaw/workspace"
LOG="$HOME/.openclaw/logs/backup-config.log"
mkdir -p "$(dirname "$LOG")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup démarré..." >> "$LOG"

cd "$BACKUP_DIR"

# 1. openclaw.json sanitisé
python3 -c "
import json, re
with open('$HOME/.openclaw/openclaw.json', 'r') as f:
    content = f.read()
cleaned = re.sub(r'\"apiKey\":\s*\"[^\"]+\"', '\"apiKey\": \"KEYCHAIN:see-readme\"', content)
with open('$BACKUP_DIR/openclaw.json', 'w') as f:
    f.write(cleaned)
"

# 2. Fichiers markdown du workspace
cp "$WORKSPACE"/*.md . 2>/dev/null || true

# 3. Scripts
rsync -a --delete "$WORKSPACE/scripts/" ./scripts/ 2>/dev/null || true

# 4. Crontab
crontab -l > crontab.txt 2>/dev/null || true

# 5. Memory (derniers 7 jours seulement)
mkdir -p ./memory
find "$WORKSPACE/memory" -name "*.md" -mtime -7 -exec cp {} ./memory/ \; 2>/dev/null || true

# Commit et push si changements
if ! git diff --quiet || ! git diff --cached --quiet; then
    git add .
    git commit -m "Backup auto — $(date '+%Y-%m-%d %H:%M')"
    git push origin main
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Push OK" >> "$LOG"
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Rien à commiter" >> "$LOG"
fi
