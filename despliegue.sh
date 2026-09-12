npm run docs:build

npx slidev build slides/presentacion.md \
  --base /slides/presentacion/ \
  --out slides/dist-slides/

 mkdir -p docs/.vitepress/dist/slides/presentacion

 cp -r slides/dist-slides/presentacion/. \
   docs/.vitepress/dist/slides/presentacion/

rsync -avzP -e "ssh -p 22321" \
  ./docs/.vitepress/dist \
  debian@bancodelibros.catedu.es:/home/debian/www/servidor/apuntes/
