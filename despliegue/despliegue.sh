npm run docs:build


rsync -avzP -e "ssh -p 22321" \
  ./docs/.vitepress/dist \
  debian@manuel.web.infenlaces.com:/home/debian/www/servidor/apuntes/
