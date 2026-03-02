#!/bin/bash
# Verify car listings with Qwen 8B local
# Fetches each URL, asks Qwen to identify the actual vehicle model

RESULTS_FILE="/tmp/car_verify_results.txt"
> "$RESULTS_FILE"

# Individual URLs only (not search pages)
cat /tmp/notion_cars.json | jq -c '.[] | select(.url | test("/lst/") | not)' > /tmp/individual_cars.jsonl

COUNT=0
TOTAL=$(wc -l < /tmp/individual_cars.jsonl | tr -d ' ')
ERRORS=0
MISMATCHES=0

echo "🔍 Vérification de $TOTAL annonces avec Qwen 8B..."
echo "==========================================" | tee -a "$RESULTS_FILE"

while IFS= read -r entry; do
    COUNT=$((COUNT + 1))
    ID=$(echo "$entry" | jq -r '.id')
    VEHICULE=$(echo "$entry" | jq -r '.vehicule')
    TYPE=$(echo "$entry" | jq -r '.type')
    URL=$(echo "$entry" | jq -r '.url')
    
    echo "" | tee -a "$RESULTS_FILE"
    echo "[$COUNT/$TOTAL] $VEHICULE" | tee -a "$RESULTS_FILE"
    echo "  URL: $URL" | tee -a "$RESULTS_FILE"
    echo "  Notion type: $TYPE" | tee -a "$RESULTS_FILE"
    
    # Fetch page
    CONTENT=$(curl -sL --max-time 20 \
        -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
        "$URL" 2>/dev/null | \
        sed 's/<script[^>]*>.*<\/script>//g; s/<style[^>]*>.*<\/style>//g; s/<[^>]*>//g' | \
        tr -s '[:space:]' ' ' | \
        cut -c1-2000)
    
    if [ -z "$CONTENT" ] || [ ${#CONTENT} -lt 50 ]; then
        echo "  ⚠️  FETCH FAILED" | tee -a "$RESULTS_FILE"
        ERRORS=$((ERRORS + 1))
        continue
    fi
    
    # Save content for Qwen
    echo "$CONTENT" > /tmp/page_content_tmp.txt
    
    # Build prompt with Python to handle escaping
    PROMPT_JSON=$(python3 -c "
import json
with open('/tmp/page_content_tmp.txt') as f:
    c = f.read()[:1800]
p = 'Analyse cette page web d un site d annonces automobiles. Identifie le MODELE EXACT du vehicule (marque + modele). Reponds UNIQUEMENT avec: MODELE: <marque modele> | EST_MODEL_Y: oui/non /no_think\n\nPage:\n' + c
print(json.dumps(p))
")
    
    # Call Qwen
    RESPONSE=$(curl -s --max-time 120 http://localhost:11434/api/generate \
        -d "{\"model\":\"qwen3:8b\",\"prompt\":$PROMPT_JSON,\"stream\":false,\"options\":{\"temperature\":0.1,\"num_predict\":200}}" 2>/dev/null | \
        python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('response','ERROR'))" 2>/dev/null)
    
    if [ -z "$RESPONSE" ] || [ "$RESPONSE" = "ERROR" ]; then
        echo "  ⚠️  QWEN FAILED" | tee -a "$RESULTS_FILE"
        ERRORS=$((ERRORS + 1))
        continue
    fi
    
    echo "  🤖 Qwen: $RESPONSE" | tee -a "$RESULTS_FILE"
    
    # Check for mismatch
    if echo "$TYPE" | grep -qi "Model Y" && ! echo "$RESPONSE" | grep -qi "model y"; then
        echo "  ❌ MISMATCH: Notion dit Model Y mais Qwen dit autre chose!" | tee -a "$RESULTS_FILE"
        MISMATCHES=$((MISMATCHES + 1))
    elif ! echo "$TYPE" | grep -qi "Model Y" && echo "$RESPONSE" | grep -qi "model y"; then
        echo "  ⚠️  NOTE: Pas marqué Model Y dans Notion mais Qwen pense que c'est un Model Y" | tee -a "$RESULTS_FILE"
    fi
    
done < /tmp/individual_cars.jsonl

echo "" | tee -a "$RESULTS_FILE"
echo "==========================================" | tee -a "$RESULTS_FILE"
echo "📊 RÉSUMÉ:" | tee -a "$RESULTS_FILE"
echo "  Total vérifié: $COUNT" | tee -a "$RESULTS_FILE"
echo "  Erreurs fetch/qwen: $ERRORS" | tee -a "$RESULTS_FILE"
echo "  Incohérences Model Y: $MISMATCHES" | tee -a "$RESULTS_FILE"

echo ""
echo "=== URLS DE RECHERCHE NON VÉRIFIABLES ==="
echo "21 URLs AutoScout24 pointent vers des pages de recherche (/lst/), pas des annonces individuelles."
echo "Ces entrées sont problématiques car le lien ne pointe pas vers un véhicule spécifique."
