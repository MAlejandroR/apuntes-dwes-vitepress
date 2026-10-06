---
title: Práctica. Proxy inverso con dominios
description: Creemos un entorno profesional de desarrollo como si  fuera producción
date: 25/9/26

---
# Práctica. Proxy inverso con dominios

Varios sitios web van a convivir en tu máquina, cada uno en su contenedor. Desde el navegador solo usarás el puerto 80. Un contenedor Nginx recibirá la petición, mirará el dominio y la entregará al contenedor que corresponda.
Al terminar tendrás tres sitios y tres phpMyAdmin:
| Escribes en el navegador | Quién responde |
| --- | --- |
| `http://alumno_1.dwes.com` | Contenedor `web_1` |
| `http://alumno_2.dwes.com` | Contenedor `web_2` |
| `http://alumno_3.dwes.com` | Contenedor `web_3` |
| `http://pma_1.dwes.com` | phpMyAdmin de la base de `web_1` |
| `http://pma_2.dwes.com` | phpMyAdmin de la base de `web_2` |
| `http://pma_3.dwes.com` | phpMyAdmin de la base de `web_3` |
Ninguna URL lleva `:8001` ni otro puerto.
## Antes de empezar
Comprueba que Docker está en marcha:
```bash
docker version
```
Crea la carpeta de la práctica y entra en ella. Todos los `docker compose` de esta práctica se ejecutan desde la carpeta del servicio correspondiente (`web_1`, `web_2`, `web_3` o `proxy`), no desde la carpeta padre.
```bash
mkdir -p proxy_inverso/web_1/app proxy_inverso/web_2/app proxy_inverso/web_3/app proxy_inverso/proxy/conf.d
cd proxy_inverso
```
## 1. La red común
Los contenedores de proyectos distintos no se ven entre sí. Hay que crear una red y apuntar a ella los servicios que deban hablar.
```bash
docker network create proxy_network
```
`proxy_network` se crea una sola vez, fuera de los `docker-compose`. En los compose se declara como red externa.
::: warning
Escribir `proxy_network` al final del compose no mete los contenedores en esa red. Cada servicio que deba usarla lleva su propio bloque `networks`.
:::
## 2. Los dominios en tu equipo
El navegador pide un nombre. Tu equipo tiene que traducir ese nombre a `127.0.0.1` antes de salir a Internet. Edita `/etc/hosts` con privilegios de administrador y añade:
```text
127.0.0.1 alumno_1.dwes.com
127.0.0.1 alumno_2.dwes.com
127.0.0.1 alumno_3.dwes.com
127.0.0.1 pma_1.dwes.com
127.0.0.1 pma_2.dwes.com
127.0.0.1 pma_3.dwes.com
```
Comprueba la traducción. Tiene que salir `127.0.0.1` en las seis líneas:
```bash
getent hosts alumno_1.dwes.com alumno_2.dwes.com alumno_3.dwes.com pma_1.dwes.com pma_2.dwes.com pma_3.dwes.com
```
## 3. El primer sitio, `web_1`
Dentro de `web_1` hay tres servicios: Apache con PHP, MySQL y phpMyAdmin. De momento phpMyAdmin puede esperar al paso 7. Levanta ya la base de datos, porque el sitio y phpMyAdmin van a usarla.
Crea `web_1/app/index.php`. El texto tiene que identificar a este sitio y a ningún otro:
```php
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Alumno 1</title>
</head>
<body>
    <h1>Hola, soy web_1</h1>
    <p>Mi dominio es alumno_1.dwes.com</p>
</body>
</html>
```
Crea `web_1/docker-compose.yaml`:
```yaml
services:
  web_1:
    image: php:8.5-apache
    container_name: web1
    volumes:
      - ./app:/var/www/html
    networks:
      - proxy_network
  mysql_1:
    image: mysql:latest
    container_name: mysql_1
    environment:
      MYSQL_DATABASE: web_1
      MYSQL_USER: web_1
      MYSQL_PASSWORD: web_1
      MYSQL_ROOT_PASSWORD: root_web_1
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - proxy_network
  phpmyadmin_1:
    image: phpmyadmin
    depends_on:
      - mysql_1
    environment:
      PMA_HOST: mysql_1
      PMA_ABSOLUTE_URI: http://pma_1.dwes.com/
    networks:
      - proxy_network
networks:
  proxy_network:
    external: true
volumes:
  mysql_data:
```
Qué hace cada parte:
- `container_name` es el nombre visible en `docker ps`. Tiene que ser único en todo el equipo. Por eso este MySQL se llama `mysql_1` y no `mysql`.
- `web_1` es el nombre del servicio. Nginx lo usará para encontrar el contenedor dentro de `proxy_network`. El nombre del servicio y el nombre que escribas en `proxy_pass` tienen que coincidir.
- No hay `ports`. Apache escucha el 80 dentro de la red de Docker. Quien abre el puerto 80 del equipo será el proxy, en el paso siguiente.
- MySQL tampoco publica el 3306. phpMyAdmin llega a él por el nombre `mysql_1`.
- `PMA_HOST` le dice a phpMyAdmin cuál es su base de datos. `PMA_ABSOLUTE_URI` es la dirección que verá el navegador. Hace falta porque phpMyAdmin está detrás del proxy y, si no, el login redirige a un sitio equivocado.
  Arranca este proyecto:
```bash
cd web_1
docker compose up -d
docker compose ps
```
Los tres servicios tienen que estar `Up`. `web1` no debe mostrar un puerto del tipo `0.0.0.0:80`.
## 4. El proxy
Nginx va a ocupar el puerto 80 del equipo. Cada dominio irá en su propio fichero dentro de `proxy/conf.d`. Nginx, en la imagen oficial, lee los `.conf` de `/etc/nginx/conf.d`. El volumen tiene que montar tu carpeta exactamente en esa ruta.
Crea `proxy/docker-compose.yaml`:
```yaml
services:
  proxy:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./conf.d:/etc/nginx/conf.d:ro
    networks:
      - proxy_network
networks:
  proxy_network:
    external: true
```
Crea `proxy/conf.d/default.conf`. Este bloque atiende cualquier dominio que no tenga ficha propia:
```nginx
server {
    listen 80 default_server;
    server_name _;
    default_type text/plain;
    return 200 "Proxy activo. Este dominio no tiene sitio.\n";
}
```
Crea `proxy/conf.d/alumno_1.conf`. Un dominio, un bloque `server`:
```nginx
server {
    listen 80;
    server_name alumno_1.dwes.com;
    location / {
        proxy_pass http://web_1:80;
        proxy_set_header Host $host;
    }
}
```
`proxy_pass` no es una redirección. El navegador sigue mostrando `alumno_1.dwes.com`. Nginx pide la página a Apache y te la devuelve. Fíjate en el `;` del final de `proxy_pass`: sin ese carácter Nginx no arranca.
Arranca el proxy después de `web_1`. Nginx resuelve `web_1` al leer la configuración. Si ese contenedor todavía no existe, el proxy termina y el puerto 80 se queda cerrado.
```bash
cd ../proxy
docker compose up -d
docker compose ps
```
## 5. Comprueba el primer dominio
```bash
curl -s -H "Host: alumno_1.dwes.com" http://127.0.0.1/
```
Tiene que aparecer `Hola, soy web_1`. Abre después `http://alumno_1.dwes.com` en el navegador.
Prueba un dominio que no esté configurado:
```bash
curl -s -H "Host: noexisto.dwes.com" http://127.0.0.1/
```
Tiene que responder `Proxy activo. Este dominio no tiene sitio.`
Para ver qué está cargando Nginx:
```bash
docker exec proxy-proxy-1 nginx -T
```
El nombre del contenedor puede variar. Si ese `exec` no lo encuentra, míralo con `docker ps` y usa el que aparezca. En la configuración tienen que salir `alumno_1.dwes.com` y `proxy_pass http://web_1:80`.
## 6. El segundo y el tercer sitio
Repite el paso 3 en `web_2` y en `web_3`, cambiando los nombres. No copies el `index.php` de `web_1` sin modificarlo: si los tres dicen lo mismo, parecerán el mismo sitio.
| Proyecto | Servicio web | Contenedor | MySQL | phpMyAdmin | Base de datos |
| --- | --- | --- | --- | --- | --- |
| `web_2` | `web_2` | `web2` | `mysql_2` | `phpmyadmin_2` | `web_2` |
| `web_3` | `web_3` | `web3` | `mysql_3` | `phpmyadmin_3` | `web_3` |
En cada `index.php`, el título y el párrafo deben decir `web_2` o `web_3` y su dominio. En phpMyAdmin cambia también la URI:
```yaml
PMA_HOST: mysql_2
PMA_ABSOLUTE_URI: http://pma_2.dwes.com/
```
Haz lo mismo con `mysql_3` y `http://pma_3.dwes.com/`.
Arranca los dos proyectos:
```bash
cd ../web_2
docker compose up -d
cd ../web_3
docker compose up -d
```
Añade los virtual hosts. `proxy/conf.d/alumno_2.conf`:
```nginx
server {
    listen 80;
    server_name alumno_2.dwes.com;
    location / {
        proxy_pass http://web_2:80;
        proxy_set_header Host $host;
    }
}
```
`proxy/conf.d/alumno_3.conf` es igual, con `alumno_3.dwes.com` y `http://web_3:80`.
No pares el proxy. El fichero nuevo ya está dentro del contenedor gracias al volumen. Nginx tiene que releer la configuración:
```bash
docker exec proxy-proxy-1 nginx -s reload
```
Comprueba los tres dominios. Cada uno debe devolver su propio texto:
```bash
curl -s -H "Host: alumno_1.dwes.com" http://127.0.0.1/
curl -s -H "Host: alumno_2.dwes.com" http://127.0.0.1/
curl -s -H "Host: alumno_3.dwes.com" http://127.0.0.1/
```
## 7. phpMyAdmin por dominio
phpMyAdmin ya está en `proxy_network` y no tiene el puerto publicado. Falta decirle al proxy cómo llegar hasta él.
Crea `proxy/conf.d/pma_1.conf`:
```nginx
server {
    listen 80;
    server_name pma_1.dwes.com;
    location / {
        proxy_pass http://phpmyadmin_1:80;
        proxy_set_header Host $host;
    }
}
```
Crea `pma_2.conf` y `pma_3.conf` apuntando a `phpmyadmin_2` y `phpmyadmin_3`.
Recarga, otra vez sin parar el proxy:
```bash
docker exec proxy-proxy-1 nginx -s reload
```
Abre `http://pma_1.dwes.com`. Entra con el usuario `web_1` y la contraseña `web_1`. En los otros dos, el usuario y la contraseña son `web_2` y `web_3`. También puedes entrar como `root` con `root_web_1`, `root_web_2` o `root_web_3`.
## Errores que vas a encontrarte
**El navegador muestra "Welcome to nginx!".** Nginx está usando la configuración de la imagen, no la tuya. Revisa que el volumen sea `./conf.d:/etc/nginx/conf.d`. La carpeta `config.d` no la lee nadie. Si la ruta del volumen no existe, Docker crea una carpeta vacía y Nginx arranca sin virtual hosts.
**El contenedor del proxy se para al momento.** Mira el registro:
```bash
docker logs proxy-proxy-1
```
Si dice `host not found in upstream`, Nginx no ha podido resolver el nombre de `proxy_pass`. Arranca antes el `web` correspondiente y vuelve a levantar el proxy. Si dice `unexpected` o señala una línea de un `.conf`, falta un `;` o hay dos `location /` dentro del mismo `server`.
**`alumno_2` enseña la página de `alumno_1`.** El proxy sí está encaminando. El `index.php` de `web_2` sigue siendo una copia del de `web_1`.
**Al añadir un dominio se caen los que ya iban.** Has parado el proxy en vez de recargarlo, y el contenedor nuevo todavía no estaba en `proxy_network`. Con `nginx -s reload`, si el nombre no existe, Nginx se queda con la configuración anterior y los sitios viejos siguen en pie.
**`docker compose up` dice que el nombre del contenedor ya está en uso.** `web1`, `mysql` o el puerto `3306` están repetidos en otro proyecto. Cada proyecto necesita su `container_name` y no debe publicar el puerto de MySQL.
**phpMyAdmin pide el servidor o vuelve a una dirección rara.** Falta `PMA_HOST` o `PMA_ABSOLUTE_URI`. Después de cambiar el compose hay que recrear ese servicio: `docker compose up -d`.
## Qué se entrega
1. Los cuatro `docker-compose.yaml` y los `.conf` del proxy.
2. Captura del navegador de los tres dominios de alumno, cada uno con su texto.
3. Captura de `http://pma_1.dwes.com` ya dentro de la base de datos.
4. La salida de `docker network inspect proxy_network` en la que se vean el proxy, los tres Apache y los tres phpMyAdmin.
