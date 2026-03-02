#!/bin/bash
# =============================================================================
# Organize Downloads folder by file type and date
# Usage: ./organize-downloads.sh [--dry-run]
# =============================================================================

DOWNLOADS_DIR="$HOME/Downloads"
DRY_RUN=false

# Check for dry-run flag
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "🔍 Mode aperçu (aucun fichier ne sera déplacé)"
    echo ""
fi

# File type mappings
declare -A TYPE_FOLDERS=(
    # Images
    ["jpg"]="Images" ["jpeg"]="Images" ["png"]="Images" ["gif"]="Images" 
    ["webp"]="Images" ["svg"]="Images" ["heic"]="Images" ["raw"]="Images"
    ["bmp"]="Images" ["tiff"]="Images" ["ico"]="Images"
    
    # Documents
    ["pdf"]="Documents" ["doc"]="Documents" ["docx"]="Documents" 
    ["xls"]="Documents" ["xlsx"]="Documents" ["ppt"]="Documents" 
    ["pptx"]="Documents" ["txt"]="Documents" ["rtf"]="Documents"
    ["odt"]="Documents" ["ods"]="Documents" ["odp"]="Documents"
    ["pages"]="Documents" ["numbers"]="Documents" ["key"]="Documents"
    
    # Videos
    ["mp4"]="Videos" ["mov"]="Videos" ["avi"]="Videos" ["mkv"]="Videos"
    ["wmv"]="Videos" ["flv"]="Videos" ["webm"]="Videos" ["m4v"]="Videos"
    
    # Audio
    ["mp3"]="Audio" ["wav"]="Audio" ["flac"]="Audio" ["aac"]="Audio"
    ["ogg"]="Audio" ["m4a"]="Audio" ["wma"]="Audio"
    
    # Archives
    ["zip"]="Archives" ["rar"]="Archives" ["7z"]="Archives" ["tar"]="Archives"
    ["gz"]="Archives" ["bz2"]="Archives" ["xz"]="Archives" ["dmg"]="Archives"
    ["pkg"]="Archives" ["iso"]="Archives"
    
    # Code
    ["js"]="Code" ["ts"]="Code" ["py"]="Code" ["rb"]="Code" ["go"]="Code"
    ["rs"]="Code" ["java"]="Code" ["c"]="Code" ["cpp"]="Code" ["h"]="Code"
    ["css"]="Code" ["html"]="Code" ["json"]="Code" ["xml"]="Code"
    ["yaml"]="Code" ["yml"]="Code" ["sh"]="Code" ["sql"]="Code"
    ["swift"]="Code" ["kt"]="Code" ["md"]="Code"
    
    # Apps
    ["app"]="Apps" ["exe"]="Apps" ["msi"]="Apps"
)

cd "$DOWNLOADS_DIR" || exit 1

echo "📂 Organisation de: $DOWNLOADS_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

moved=0
skipped=0

# Process each file (not directories)
for file in *; do
    # Skip if not a file
    [[ ! -f "$file" ]] && continue
    
    # Skip hidden files and this script
    [[ "$file" == .* ]] && continue
    
    # Get file extension (lowercase)
    ext="${file##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Get modification date (YYYY-MM)
    mod_date=$(stat -f "%Sm" -t "%Y-%m" "$file" 2>/dev/null || date -r "$file" "+%Y-%m" 2>/dev/null)
    
    # Determine type folder
    type_folder="${TYPE_FOLDERS[$ext]:-Other}"
    
    # Create destination path: Type/YYYY-MM/
    dest_dir="$DOWNLOADS_DIR/$type_folder/$mod_date"
    dest_path="$dest_dir/$file"
    
    # Check if destination already exists
    if [[ -e "$dest_path" ]]; then
        echo "⏭️  Skip (existe déjà): $file"
        ((skipped++))
        continue
    fi
    
    if $DRY_RUN; then
        echo "📄 $file → $type_folder/$mod_date/"
    else
        mkdir -p "$dest_dir"
        mv "$file" "$dest_path"
        echo "✅ $file → $type_folder/$mod_date/"
    fi
    ((moved++))
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if $DRY_RUN; then
    echo "🔍 Aperçu terminé: $moved fichiers à déplacer, $skipped à ignorer"
    echo ""
    echo "👉 Pour exécuter vraiment: ./organize-downloads.sh"
else
    echo "✅ Terminé: $moved fichiers déplacés, $skipped ignorés"
fi
