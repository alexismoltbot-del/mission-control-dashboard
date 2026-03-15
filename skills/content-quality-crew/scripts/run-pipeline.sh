#!/usr/bin/env zsh
# Content Quality Crew — Pipeline Runner
# Usage: ./run-pipeline.sh "Sujet du post" [format] [audience] [ton]
# Ex:    ./run-pipeline.sh "Pourquoi les PME françaises ratent l'IA" linkedin "dirigeants PME" "direct sans bullshit"

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PIPELINE_DIR="$HOME/.openclaw/shared/content-pipeline"
LOG_DIR="$HOME/.openclaw/shared/logs/content-quality"
TELEGRAM_ID="6820925284"

SUJET="${1:-}"
FORMAT="${2:-linkedin}"
AUDIENCE="${3:-dirigeants PME français}"
TON="${4:-direct, sans bullshit, challenge les idées reçues}"
LONGUEUR="${5:-400 mots}"

if [ -z "$SUJET" ]; then
  echo "Usage: $0 \"Sujet\" [format] [audience] [ton] [longueur]"
  exit 1
fi

# Generate task_id
TASK_ID="cq-$(date +%Y%m%d-%H%M%S)"
TASK_DIR="$PIPELINE_DIR/$TASK_ID"
mkdir -p "$TASK_DIR" "$LOG_DIR"

echo "🚀 Content Quality Crew — Task $TASK_ID"
echo "📝 Sujet: $SUJET"
echo "📦 Format: $FORMAT | Audience: $AUDIENCE"
echo ""

# === BRIEF ===
cat > "$TASK_DIR/brief.md" << BRIEF
# Brief — $TASK_ID
- **Sujet :** $SUJET
- **Format :** $FORMAT
- **Audience :** $AUDIENCE
- **Ton :** $TON
- **Longueur :** $LONGUEUR
- **Créé :** $(date "+%Y-%m-%d %H:%M")
BRIEF

# === HELPER: call claude ===
call_claude() {
  local model="$1"
  local prompt="$2"
  claude --model "$model" --dangerously-skip-permissions -p "$prompt" 2>/dev/null
}

# === STEP 1: RESEARCHER ===
echo "🔍 [1/5] Researcher (sonnet-4-6)..."
RESEARCHER_PROMPT="$(cat "$SKILL_DIR/roles/researcher.md")

---
BRIEF:
$(cat "$TASK_DIR/brief.md")

Produis le research brief complet en Markdown."

call_claude "claude-sonnet-4-6" "$RESEARCHER_PROMPT" > "$TASK_DIR/research.md"
echo "   ✅ research.md créé ($(wc -w < "$TASK_DIR/research.md") mots)"

# === LOOP: Writer → Critic → Judge ===
MAX_TOURS=3
TOUR=1
VERDICT="LOOP"
SCORE=0

while [ "$VERDICT" = "LOOP" ] && [ $TOUR -le $MAX_TOURS ]; do
  echo ""
  echo "--- Tour $TOUR/$MAX_TOURS ---"

  # STEP 2: WRITER
  echo "✍️  [2] Writer (opus-4-6)..."
  if [ $TOUR -eq 1 ]; then
    WRITER_PROMPT="$(cat "$SKILL_DIR/roles/writer.md")

---
RESEARCH BRIEF:
$(cat "$TASK_DIR/research.md")

BRIEF ORIGINAL:
$(cat "$TASK_DIR/brief.md")

Rédige le draft complet."
  else
    PREV=$((TOUR - 1))
    WRITER_PROMPT="$(cat "$SKILL_DIR/roles/writer.md")

---
Tu es au tour $TOUR. Voici le draft précédent et les instructions du Judge :

DRAFT PRÉCÉDENT:
$(cat "$TASK_DIR/draft_v${PREV}.md")

INSTRUCTIONS JUDGE:
$(python3 -c "import json,sys; d=json.load(open('$TASK_DIR/verdict_${PREV}.json')); print(d.get('instructions_finales',''))" 2>/dev/null || echo "Améliore le draft")

CRITIQUE DU CRITIC:
$(python3 -c "import json,sys; d=json.load(open('$TASK_DIR/critique_${PREV}.json')); print(d.get('instructions_pour_revision',''))" 2>/dev/null || echo "Révise en profondeur")

Produis la version révisée."
  fi
  
  call_claude "claude-opus-4-6" "$WRITER_PROMPT" > "$TASK_DIR/draft_v${TOUR}.md"
  echo "   ✅ draft_v${TOUR}.md créé"

  # STEP 3: CRITIC
  echo "🔴 [3] Critic (opus-4-6, HBR persona)..."
  CRITIC_PROMPT="$(cat "$SKILL_DIR/roles/critic.md")

---
DRAFT À CRITIQUER:
$(cat "$TASK_DIR/draft_v${TOUR}.md")

BRIEF ORIGINAL:
$(cat "$TASK_DIR/brief.md")

Tour: $TOUR. Produis le JSON de critique strict. Commence directement par { sans markdown."

  call_claude "claude-opus-4-6" "$CRITIC_PROMPT" | \
    sed 's/^```json//' | sed 's/^```//' > "$TASK_DIR/critique_${TOUR}.json"
  echo "   ✅ critique_${TOUR}.json créé"

  # STEP 4: JUDGE
  echo "⚖️  [4] Judge (opus-4-6, panel éditeurs)..."
  JUDGE_PROMPT="$(cat "$SKILL_DIR/roles/judge.md")

---
DRAFT À ÉVALUER:
$(cat "$TASK_DIR/draft_v${TOUR}.md")

CRITIQUE DU CRITIC:
$(cat "$TASK_DIR/critique_${TOUR}.json")

BRIEF ORIGINAL:
$(cat "$TASK_DIR/brief.md")

task_id: $TASK_ID | Tour: $TOUR

Produis le JSON de verdict strict. Commence directement par { sans markdown."

  call_claude "claude-opus-4-6" "$JUDGE_PROMPT" | \
    sed 's/^```json//' | sed 's/^```//' > "$TASK_DIR/verdict_${TOUR}.json"
  
  # Parse verdict
  VERDICT=$(python3 -c "import json; d=json.load(open('$TASK_DIR/verdict_${TOUR}.json')); print(d.get('verdict','LOOP'))" 2>/dev/null || echo "LOOP")
  SCORE=$(python3 -c "import json; d=json.load(open('$TASK_DIR/verdict_${TOUR}.json')); print(d.get('score_sur_100', d.get('score_pondere',0)))" 2>/dev/null || echo "0")
  
  echo "   ✅ verdict_${TOUR}.json — Verdict: $VERDICT | Score: $SCORE/100"
  
  # Log to Mission Control
  echo "$(date '+%H:%M:%S') [Tour $TOUR] $VERDICT — $SCORE/100 — $SUJET" >> "$LOG_DIR/pipeline.log"

  TOUR=$((TOUR + 1))
done

FINAL_TOUR=$((TOUR - 1))

# === STEP 5: SUPERVISOR ===
echo ""
echo "🎯 [5] Supervisor..."

if [ "$VERDICT" = "PUBLISH READY" ]; then
  cp "$TASK_DIR/draft_v${FINAL_TOUR}.md" "$TASK_DIR/final.md"
  echo "   ✅ PUBLISH READY → final.md copié"
  
  # Telegram notification
  MSG="✅ PUBLISH READY%0A📄 ${SUJET}%0A📊 Score: ${SCORE}/100%0A🔗 ${TASK_ID}/final.md"
  curl -s "https://api.telegram.org/bot$(security find-generic-password -a openclaw -s telegram-bot-token -w 2>/dev/null || echo 'NO_TOKEN')/sendMessage?chat_id=${TELEGRAM_ID}&text=${MSG}" > /dev/null 2>&1 || true
  
  echo ""
  echo "🎉 PUBLISH READY — Score: $SCORE/100"
  echo "📄 Fichier: $TASK_DIR/final.md"

elif [ "$VERDICT" = "ABANDON" ]; then
  echo "🚫 ABANDON — Contenu non récupérable"
  MSG="🚫 ABANDON%0A📄 ${SUJET}%0AScore insuffisant après $MAX_TOURS tours"
  curl -s "..." > /dev/null 2>&1 || true

else
  # Max tours reached, still LOOP
  echo "⚠️  Max tours atteints ($MAX_TOURS). Dernier score: $SCORE/100"
  echo "👉 Révision manuelle requise dans: $TASK_DIR"
  MSG="⚠️ Révision manuelle requise%0A📄 ${SUJET}%0A📊 Score: ${SCORE}/100 après $MAX_TOURS tours"
  curl -s "https://api.telegram.org/bot$(security find-generic-password -a openclaw -s telegram-bot-token -w 2>/dev/null || echo 'NO_TOKEN')/sendMessage?chat_id=${TELEGRAM_ID}&text=${MSG}" > /dev/null 2>&1 || true
fi

echo ""
echo "📁 Tous les fichiers: $TASK_DIR"
echo "📋 Log: $LOG_DIR/pipeline.log"
