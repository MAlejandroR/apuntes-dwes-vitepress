---
title: Docker
---

::: objetivos Un mismo entorno de ejecución  para todos y para desplegar
- Imagen, contenedor y volumen
- Entender y crear ficheros  `Dockerfile` y `docker-compose` para crear el entorno
- Crear el recurso (fichero) desde nuestro host, y que lo ejecute el apache/nginx del docker
- Dedicaremos **una semana y media (~10-13 h)** de clase, no un recorte de 20 minutos
:::

En este módulo,  <color>Docker</color> es una parte de él: es **el entorno**. Evitaremos que  cada una en clase,  instale Apache y PHP de forma individual, esto crearía algo muy _heterogéneo_ en el aula:
 * Instalación en windows, linux
 * Instalo apache con   Xampp, Wampp, Lamp, directamente los paquetes ...
 * Diferentes versiones 
 * Generaría el problema de  “en mi máquina sí/no”.
 * <color>El contenedor iguala el entorno de ejecución</color>.

En el módulo de <color>Despliegue</color> profundizaréis en Docker y su historia. Fue creado por [Solomon Hykes — Docker](https://www.docker.com/contributors/solomon-hykes/)       dentro de - [Solomon Hykes: Docker, dotCloud — Y Combinator](https://www.ycombinator.com/blog/solomon-hykes-docker-dotcloud-interview/), la empresa que había fundado, y que se presentó públicamente en marzo de 2013, con su primera versión pública (0.1.0) ese mismo mes.

:::info Versión de docker
Docker se presentó públicamente en 2013 con su versión **0.1**.
Actualmente, Docker Engine se encuentra en la versión **29.8.1** (septiembre de 2026).
[Versiones de Docker Engine](https://docs.docker.com/engine/release-notes/)
:::
---

::: definicion Docker, para este módulo
Una forma de empaquetar PHP, Apache y lo que haga falta en un **contenedor Linux**. Lo levantas igual en Ubuntu, en Windows (con WSL) y, más adelante, en un servidor.
:::

1. Entender **imagen** frente a **contenedor** (y por qué no es una máquina virtual)
2. Tener el motor instalado y comprobarlo
3. Los comandos de cada día (`run`, `exec`, `logs`, Compose)
4. Dejar el entorno **escrito**: `Dockerfile` + `compose`
5. Escribir PHP en una carpeta del portátil mapeada a `/var/www/html`

<CardPane>
<Card header="1. Conceptos" color="#2496ed">
[Imagen, contenedor, kernel](/02_entornos_herramientas/docker/conceptos). Por qué en Windows hace falta WSL.
</Card>
<Card header="2. Instalación" color="#16a34a">
[Motor en Ubuntu o Docker Desktop](/02_entornos_herramientas/docker/instalacion). El repositorio externo de `apt`.
</Card>
<Card header="3. Comandos" color="#0f766e">
[Estados, `run`, puertos, volúmenes, `exec`](/02_entornos_herramientas/docker/comandos) y limpieza mínima.
</Card>
<Card header="4. Dockerfile" color="#d97706">
[La receta](/02_entornos_herramientas/docker/dockerfile). En clase partimos de `php:8.3-apache`.
</Card>
<Card header="5. Compose" color="#4f46e5">
[El laboratorio](/02_entornos_herramientas/docker/compose): servicio `web`, puerto 8800, carpeta `app`.
</Card>
<Card header="6. Práctica" color="#e11d48">
[Ruta de la semana](/02_entornos_herramientas/docker/practica), del `hello-world` al compose de clase.
</Card>
</CardPane>

::: pageinfo El resultado que buscamos
- Código en el anfitrión (PhpStorm), no “dentro” del contenedor a ciegas
- Volumen `./app` → `/var/www/html`
- Navegador: `http://localhost:8800`
- Si “no arranca”: `docker compose ps` y `docker compose logs -f`

Los recortes de ficheros también están en [Instalaciones](/02_entornos_herramientas/instalaciones/). La chuleta de terminal, en [Comandos Linux](/02_entornos_herramientas/linux).
:::

::: referencias Documentación
- [docs.docker.com/get-started](https://docs.docker.com/get-started/)
- Motor: [docs.docker.com/engine](https://docs.docker.com/engine/)
:::
