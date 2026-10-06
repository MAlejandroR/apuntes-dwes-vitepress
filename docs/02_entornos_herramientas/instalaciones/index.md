---
title: Instalación
---

<script setup>
import imgApache from './apache.jpeg'
import imgPhp from './php.jpeg'
import imgMysql from './mysql.png'
import imgXdebug from './xdebug.png'
import imgPhpstorm from './phpstorm.jpeg'
</script>

### Herramientas y aplicaciones necesarias

::: pageinfo
Para el desarrollo web necesitamos los siguientes programas.

Para programar vamos a usar el siguiente IDE:

<CardPane>
<Card header="Apache 2" href="https://httpd.apache.org/" color="#d22128" :src="imgApache">
Servidor web http/https
</Card>

<Card header="PHP" href="https://www.php.net/manual/es/intro-whatis.php" color="#4F5B93" :src="imgPhp">
Lenguaje de programación en el servidor
</Card>

<Card header="MySQL" href="https://www.mysql.com/" color="#00758f" :src="imgMysql">
Gestor de bases de datos relacionales
</Card>

<Card header="Xdebug" href="https://xdebug.org/" color="#922e2e" :src="imgXdebug">
Aplicación para depurar (interactuar durante la ejecución)
</Card>

<Card header="PhpStorm" href="https://www.jetbrains.com/es-es/phpstorm/" color="#b345f1" :src="imgPhpstorm">
IDE para desarrollar o programar
</Card>
</CardPane>
:::

### Instalando en Ubuntu

En un sistema Ubuntu, puedes instalar Apache y PHP utilizando los siguientes comandos:

<Color>Actualizar los repositorios:</Color>

```bash{2}
# Actualizar repositorios
sudo apt update
# Instalar Apache2
sudo apt install apache2
# Instalar php y el módulo de php para apache
sudo apt install php libapache2-mod-php
```

Después de realizar estas tareas, debes resetear Apache para ponerlo todo en funcionamiento:

```bash{1}
sudo systemctl restart apache2
```

### Instalando en Windows con XAMPP

XAMPP es una solución sencilla para tener Apache, PHP y MySQL en Windows. Sigue estos pasos para instalarlo:

<Color>Descargar XAMPP</Color>

Ve al sitio web oficial de XAMPP [https://www.apachefriends.org](https://www.apachefriends.org) y descarga la versión que incluye PHP.

<Color>Instalar XAMPP</Color>

Ejecuta el instalador y sigue las instrucciones. Asegúrate de seleccionar Apache y PHP durante la instalación.

<Color>Iniciar los servicios</Color>:

Abre el panel de control de XAMPP y asegúrate de iniciar Apache.

<Color>Comprobar instalación</Color>

Abre tu navegador y visita `http://localhost/`. Deberías ver la página de bienvenida de XAMPP.

### Creación de Docker

::: pageinfo
El laboratorio de clase está en [Docker](../../02_docker/index.md). Aquí quedan los recortes de `Dockerfile` y `compose` que usamos al instalar.
:::

- Es esta la solución que vamos a utilizar.
- Para ello crearemos un <Color>docker-compose.yaml</Color>, que nos levante un servicio con PHP y Apache2.
- Por si queremos realizar modificaciones sobre la imagen original, la imagen la vamos a crear a partir de un <Color>Dockerfile</Color>.
- Cada proyecto que creemos o bien tendremos esta estructura, o bien los crearemos todos a partir de la carpeta compartida.

![Carpeta Docker](./docker_folder.png)

---

El contenido de los ficheros:

```yaml{2-5,8}
services:
    web:
        build : .
        ports:
            - 8800:80
        volumes:
            - ./../app:/var/www/html
        container_name: web
```

::: warning Info
- Creamos el servicio (contenedor) **web**
- A partir del **Dockerfile** que tenemos en **la misma carpeta**
- Proyectamos el puerto **8800** para acceder a él
- Mapeamos la carpeta **./../app** para escribir nuestros programas
:::

El Dockerfile:

```dockerfile{1}
FROM php:8.3-apache
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update
# Usa la imagen base de PHP con Apache

# Añadir o modificar la configuración de Apache para listar directorios si no hay index
RUN echo '<Directory /var/www/html>' >> /etc/apache2/apache2.conf
RUN echo 'Options +Indexes' >> /etc/apache2/apache2.conf
RUN echo '</Directory>' >> /etc/apache2/apache2.conf

# Exponer el puerto 80
EXPOSE 80
```

La imagen de la estructura la podríamos organizar de la siguiente manera:

![Estructura Docker](./estructura_docker.png)

## Apache

## Servidor Apache y su funcionamiento modular

![Apache modular](./apache2.png)

Como se muestra en la imagen, Apache funciona mediante un sistema de módulos. Cada uno de estos módulos (como **PHP**, **MySQL**, **XML**, entre otros) añade funcionalidades específicas y se conecta al **núcleo de Apache**. Puedes activar o desactivar, instalar o desinstalar módulos según tus necesidades, manteniendo solo aquellos que sean esenciales.

Es importante recordar que, al instalar Apache, se abre una "puerta" en el sistema hacia redes externas, lo que puede representar una exposición al exterior. Mantener activos solo los módulos necesarios reduce esta exposición y ayuda a mejorar la seguridad del servidor.

## Consideraciones de seguridad

Cuando instalas y configuras Apache en tu sistema, estás abriendo una "puerta" que permite el acceso desde redes externas. Esto significa que, en cierta medida, tu sistema está expuesto al exterior, lo que podría representar un riesgo de seguridad si no se toman las precauciones adecuadas.

Para minimizar esta exposición, es importante:

- **Mantener actualizados** tanto Apache como sus módulos.
- **Configurar adecuadamente** los permisos y accesos, limitando el acceso a solo aquellos que necesiten interactuar con el servidor.
- **Deshabilitar módulos innecesarios**, ya que cada módulo adicional aumenta las posibles vulnerabilidades.

Recuerda que el uso seguro de Apache es esencial para proteger la infraestructura de red y los datos alojados en el servidor.
