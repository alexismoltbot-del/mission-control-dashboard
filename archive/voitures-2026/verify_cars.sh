#!/bin/bash
# Verify each car listing URL with Qwen local model

RESULTS_FILE="/tmp/car_verification_results.jsonl"
> "$RESULTS_FILE"

# Get all individual listing URLs (not search pages)
cat /tmp/notion_cars.json | jq -c '.[] | select(.url | test("/lst/") | not)' > /tmp/individual_cars.jsonl

COUNT=0
TOTAL=$(wc -l < /tmp/individual_cars.jsonl | tr -d ' ')

echo "Vérification de $TOTAL annonces individuelles avec Qwen..."
echo "=========================================="

while IFS= read -r entry; do
    COUNT=$((COUNT + 1))
    ID=$(echo "$entry" | jq -r '.id')
    VEHICULE=$(echo "$entry" | jq -r '.vehicule')
    TYPE=$(echo "$entry" | jq -r '.type')
    URL=$(echo "$entry" | jq -r '.url')
    
    echo ""
    echo "[$COUNT/$TOTAL] $VEHICULE"
    echo "  URL: $URL"
    
    # Fetch the page content
    CONTENT=$(curl -sL --max-time 15 \
        -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
        "$URL" 2>/dev/null | \
        sed 's/<script[^>]*>.*<\/script>//g; s/<style[^>]*>.*<\/style>//g; s/<[^>]*>//g' | \
        tr -s '[:space:]' ' ' | \
        cut -c1-3000)
    
    if [ -z "$CONTENT" ] || [ ${#CONTENT} -lt 50 ]; then
        echo "  ⚠️  Impossible de récupérer le contenu"
        echo "{\"id\":\"$ID\",\"vehicule\":\"$VEHICULE\",\"type\":\"$TYPE\",\"url\":\"$URL\",\"status\":\"fetch_failed\",\"qwen\":\"N/A\"}" >> "$RESULTS_FILE"
        continue
    fi
    
    # Ask Qwen - save content to temp file to avoid escaping issues
    echo "$CONTENT" > /tmp/page_content.txt
    
    PROMPT=$(python3 -c "
import json
with open('/tmp/page_content.txt') as f:
    content = f.read()[:2500]
prompt = f'''Analyse cette page web. Quel est le MODELE EXACT du véhicule? Réponds en UNE ligne: MODELE: <marque modèle exact> | IS_MODEL_Y: <oui/non> | DETAILS: <année, km, prix>

Page: {content}'''
print(json.dumps(prompt))
")
    
    QWEN_RESPONSE=$(curl -s --max-time 90 http://localhost:11434/api/generate \
        -d "{\"model\":\"qwen3:32b\",\"prompt\":$PROMPT,\"stream\":false,\"options\":{\"temperature\":0.1,\"num_predict\":150}}" 2>/dev/null | \
        jq -r '.response // "error"')
    
    # Clean response - remove thinking tags
    CLEAN_RESPONSE=$(echo "$QWEN_RESPONSE" | sed 's/<think>.*<\/think>//g' | tr -d '\n' | sed 's/^ *//')
    
    echo "  📋 Notion dit: $TYPE"
    echo "  🤖 Qwen dit: $CLEAN_RESPONSE"
    
    QWEN_ESCAPED=$(echo "$CLEAN_RESPONSE" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read().strip()))")
    echo "{\"id\":\"$ID\",\"vehicule\":\"$VEHICULE\",\"type\":\"$TYPE\",\"url\":\"$URL\",\"status\":\"checked\",\"qwen\":$QWEN_ESCAPED}" >> "$RESULTS_FILE"
    
done < /tmp/individual_cars.jsonl

echo ""
echo "=========================================="
echo "Terminé! $COUNT annonces vérifiées."
