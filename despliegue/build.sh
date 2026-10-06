#!/usr/bin/env bash

set -euo pipefail

DIST="docs/.vitepress/dist"
SLIDES_DIR="slides"

echo "================================="
echo " Construyendo VitePress"
echo "================================="

npm run docs:build


echo
echo "================================="
echo " Construyendo presentaciones"
echo "================================="

for slide in "$SLIDES_DIR"/*.md; do

    # Por ejemplo:
    # slides/presentacion.md → presentacion
    name=$(basename "$slide" .md)

    echo
    echo "→ Construyendo: $name"

    SLIDE_DIST="$SLIDES_DIR/dist-slides/$name"

    rm -rf "$SLIDE_DIST"

    npx slidev build "$slide" \
        --base "/slides/$name/" \
        --out "$SLIDE_DIST"

    echo "→ Integrando $name en VitePress"

    mkdir -p "$DIST/slides/$name"

    cp -r "$SLIDE_DIST/." \
        "$DIST/slides/$name/"

done


echo
echo "================================="
echo " Build completado"
echo "================================="
echo
echo "Resultado: $DIST"