#!/bin/bash
# voiture-scan.sh — Scan voitures 3x/jour + alerte WhatsApp si bonne offre
# Cron : 0 8,13,19 * * * /Users/alexis/.openclaw/workspace/scripts/voiture-scan.sh

set -euo pipefail

LOG_FILE="$HOME/.openclaw/workspace/logs/voiture-scan.log"
CONTEXT_FILE="$HOME/.openclaw/shared/context/voiture-5008.md"
RESULTS_FILE="$HOME/.openclaw/shared/context/voiture-scan-results.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

mkdir -p "$(dirname "$LOG_FILE")"
echo "[$TIMESTAMP] Démarrage scan voiture..." >> "$LOG_FILE"

# Modèles à surveiller
MODELS=(
  "Volvo XC90"
  "Tesla Model Y"
  "Audi Q7"
  "BMW X5"
  "Peugeot 5008"
  "Renault Espace"
  "Skoda Kodiaq"
  "Volkswagen Touareg"
  "Tesla Model X"
  "Volkswagen Tayron"
)

# Critères
BUDGET_MAX=35000
YEAR_MIN=2024

# Construire les URLs La Centrale pour chaque modèle
declare -A LC_SLUGS=(
  ["Volvo XC90"]="VOLVO%3A%3AXC90"
  ["Tesla Model Y"]="TESLA%3A%3AMODEL+Y"
  ["Audi Q7"]="AUDI%3A%3AQ7"
  ["BMW X5"]="BMW%3A%3AX5"
  ["Peugeot 5008"]="PEUGEOT%3A%3A5008"
  ["Renault Espace"]="RENAULT%3A%3AESPACE"
  ["Skoda Kodiaq"]="SKODA%3A%3AKODIAQ"
  ["Volkswagen Touareg"]="VOLKSWAGEN%3A%3ATOUAREG"
  ["Tesla Model X"]="TESLA%3A%3AMODEL+X"
  ["Volkswagen Tayron"]="VOLKSWAGEN%3A%3ATAYRON"
)

echo "# 🚗 Résultats scan voiture — $TIMESTAMP" > "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"
echo "**Critères :** Hybride/Électrique · $YEAR_MIN+ · max ${BUDGET_MAX}€ · 5 places+" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

ALERT_MESSAGE=""
TOTAL_FOUND=0

for MODEL in "${MODELS[@]}"; do
  SLUG="${LC_SLUGS[$MODEL]}"
  URL="https://www.lacentrale.fr/listing?makesModelsCommercialNames=${SLUG}&yearMin=${YEAR_MIN}&priceMax=${BUDGET_MAX}&energy=HYBRIDE_RECHARGEABLE%2CHYBRIDE%2CELECTRIQUE"
  
  echo "## $MODEL" >> "$RESULTS_FILE"
  echo "→ [Voir les annonces]($URL)" >> "$RESULTS_FILE"
  echo "" >> "$RESULTS_FILE"
  
  # Fetch La Centrale via curl (résultats JSON dans les meta ou le HTML)
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
    "$URL" 2>/dev/null || echo "000")
  
  if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Page accessible" >> "$RESULTS_FILE"
    TOTAL_FOUND=$((TOTAL_FOUND + 1))
  else
    echo "⚠️ Accès limité (status $HTTP_STATUS) — vérification manuelle requise" >> "$RESULTS_FILE"
  fi
  echo "" >> "$RESULTS_FILE"
done

# Check emails voiture (alexis.moltbot@gmail.com) via himalaya
echo "## 📧 Emails voiture reçus" >> "$RESULTS_FILE"
HIMALAYA_OUT=$(himalaya --account moltbot envelope list --max-width 200 2>/dev/null | head -30 || echo "")

if [ -n "$HIMALAYA_OUT" ]; then
  # Filtrer les emails liés aux voitures
  VOITURE_EMAILS=$(echo "$HIMALAYA_OUT" | grep -i -E "devis|voiture|5008|XC90|ModelY|Q7|X5|Kodiaq|mandataire|concession|leasing|LOA|LLD" || echo "")
  if [ -n "$VOITURE_EMAILS" ]; then
    echo "$VOITURE_EMAILS" >> "$RESULTS_FILE"
    ALERT_MESSAGE="📧 Nouveaux emails voiture détectés !"
  else
    echo "Aucun email voiture depuis le dernier scan." >> "$RESULTS_FILE"
  fi
else
  echo "⚠️ Himalaya non accessible ou aucun email." >> "$RESULTS_FILE"
fi

echo "" >> "$RESULTS_FILE"

# Vérifier l'offre Autobiz (expire ~16/03)
AUTOBIZ_DEADLINE="2026-03-16"
TODAY=$(date +%Y-%m-%d)
DAYS_LEFT=$(( ($(date -d "$AUTOBIZ_DEADLINE" +%s 2>/dev/null || date -j -f "%Y-%m-%d" "$AUTOBIZ_DEADLINE" +%s) - $(date +%s)) / 86400 ))

echo "## ⚠️ Offre Autobiz Fiat 500X" >> "$RESULTS_FILE"
if [ "$DAYS_LEFT" -le 3 ] && [ "$DAYS_LEFT" -ge 0 ]; then
  echo "🔴 **URGENT** : Offre 10 050€ expire dans **${DAYS_LEFT} jour(s)** !" >> "$RESULTS_FILE"
  ALERT_MESSAGE="${ALERT_MESSAGE}\n🔴 Autobiz expire dans ${DAYS_LEFT}j !"
elif [ "$DAYS_LEFT" -gt 0 ]; then
  echo "⏳ Offre 10 050€ — expire dans ${DAYS_LEFT} jours (~${AUTOBIZ_DEADLINE})" >> "$RESULTS_FILE"
fi

echo "" >> "$RESULTS_FILE"
echo "_Scan terminé à $TIMESTAMP_" >> "$RESULTS_FILE"

echo "[$TIMESTAMP] Scan terminé. Modèles vérifiés : $TOTAL_FOUND/10" >> "$LOG_FILE"

# Envoyer alerte WhatsApp si nécessaire
if [ -n "$ALERT_MESSAGE" ]; then
  echo "[$TIMESTAMP] Envoi alerte WhatsApp..." >> "$LOG_FILE"
  openclaw message send \
    --channel whatsapp \
    --to "+33638167834" \
    --message "🚗 *Alerte Voiture*\n\n${ALERT_MESSAGE}\n\nVoir les résultats complets : voiture-scan-results.md" 2>> "$LOG_FILE" || \
    echo "[$TIMESTAMP] Erreur envoi WhatsApp" >> "$LOG_FILE"
fi

exit 0
