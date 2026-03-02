#!/bin/zsh
set -euo pipefail

CHANNEL_ID="1478073525460930751"   # #mission-control
STATE_FILE="/Users/alexis/.openclaw/state/mission-control-discord.hash"
BOARD="/Users/alexis/.openclaw/shared/tasks/board.md"
DISC="/Users/alexis/.openclaw/shared/discussions/$(date +%F).md"

[ -f "$BOARD" ] || exit 0

HASH_INPUT=$(cat "$BOARD"; [ -f "$DISC" ] && cat "$DISC" || true)
NEW_HASH=$(printf "%s" "$HASH_INPUT" | shasum -a 256 | awk '{print $1}')
OLD_HASH=""
[ -f "$STATE_FILE" ] && OLD_HASH=$(cat "$STATE_FILE")

# only post on change
if [ "$NEW_HASH" = "$OLD_HASH" ]; then
  exit 0
fi

in_review=$(awk 'BEGIN{s=0} /^## IN REVIEW/{s=1;next} /^## /{s=0} s && /- \[[ x]\]/{c++} END{print c+0}' "$BOARD")
in_progress=$(awk 'BEGIN{s=0} /^## IN PROGRESS/{s=1;next} /^## /{s=0} s && /- \[[ x]\]/{c++} END{print c+0}' "$BOARD")
backlog=$(awk 'BEGIN{s=0} /^## BACKLOG/{s=1;next} /^## /{s=0} s && /- \[[ x]\]/{c++} END{print c+0}' "$BOARD")
done=$(awk 'BEGIN{s=0} /^## DONE/{s=1;next} /^## /{s=0} s && /- \[[x]\]/{c++} END{print c+0}' "$BOARD")

sessions=$(openclaw status --deep 2>/dev/null | sed -n 's/^│ Sessions *│ \([^·]*\).*/\1/p' | head -1 | xargs || echo "n/a")

timestamp=$(TZ=Europe/Paris date '+%d/%m %H:%M')
msg="🎛️ Mission Control update (${timestamp})
- In progress: ${in_progress}
- In review: ${in_review}
- Backlog: ${backlog}
- Done: ${done}
- Sessions: ${sessions}

Source: shared/tasks/board.md"

openclaw message send --channel discord --target "channel:${CHANNEL_ID}" --message "$msg" >/dev/null 2>&1 || true
printf "%s" "$NEW_HASH" > "$STATE_FILE"
