#!/bin/bash

# Agrega los cambios al repositorio git
git add *
git commit -m "$1"
git push origin main

# Elimina el directorio public
sudo rm -r ./public

# Genera el sitio con Hugo
hugo -d public

# Sincroniza los archivos al servidor remoto usando rsync con puerto SSH 22123
rsync -avz -e "ssh -p 22123" ./public/  admin@web.infenlaces.com:web/web.infenlaces.com/public_html/distancia/dwes/php
