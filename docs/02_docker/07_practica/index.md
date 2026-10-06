---
title: Práctica de la semana
---

::: actividad Ruta mínima
Hazlo en orden. Si uno falla, no pases al siguiente: mira [comandos](../04_comandos/index.md) y los logs.
:::

## 1. El motor responde

```bash
docker version
docker compose version
docker run --rm hello-world
```

Si `permission denied` en Linux: grupo `docker` y sesión nueva ([instalación](../04_comandos/index.md).

## 2. Un Linux de usar y tirar

```bash
docker run --rm -it ubuntu:24.04 bash
```

Dentro: `pwd`, `ls`, `whoami`. Sales con `exit`. Ese contenedor desaparece (`--rm`). Es la misma idea que la [chuleta Linux](../../02_entornos_herramientas/linux.md), pero aislada.

## 3. PHP a pelo (sin Compose)

```bash
mkdir -p app
echo '<?php phpinfo();' > app/index.php

docker run -d --name web -p 8800:80 \
  -v "$PWD/app:/var/www/html" php:8.3-apache
```

Navegador: `http://localhost:8800`. Cambia el `index.php` en el anfitrión y recarga.

```bash
docker exec -it web bash
# ls /var/www/html
exit
docker logs web
docker stop web && docker rm web
```

## 4. El laboratorio escrito

Copia (o escribe) el `Dockerfile` y el `compose` de [Instalaciones](../03_instalaciones/index.md) / [Compose](../06_compose/index.md). Desde la carpeta del compose:

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
```

Otra vez `http://localhost:8800`. Edita `app/` con PhpStorm. Para tumbarlo: `docker compose down`.

::: pregunta Qué tienes que poder explicar
- Qué es imagen y qué es contenedor
- Por qué el código vive en `app/` y no lo “guardas” con `commit`
- Qué significa `8800:80`
- Qué haces si el contenedor está `Exited`
:::
