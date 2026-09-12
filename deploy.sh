#!/usr/bin/env bash

set -euo pipefail

DIST="docs/.vitepress/dist"

echo "================================="
echo " Generando sitio"
echo "================================="build.sh


echo
echo "================================="
echo " Desplegando"
echo "================================="

rsync -avz --delete \
    "$DIST/" \
    debian@bancodelibros:~/www/servidor/apuntes/


echo
echo "================================="
echo " Deploy completado"
echo "================================="