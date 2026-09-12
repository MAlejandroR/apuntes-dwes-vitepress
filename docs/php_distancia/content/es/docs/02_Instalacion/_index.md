+++
title = 'Instalación'
date = 2024-10-15T07:04:49+02:00
draft = false
icon = "fas fa-download"
weight = 20
+++

## Instalando en Ubuntu

* En un sistema Ubuntu, puedes instalar Apache y PHP utilizando los siguientes comandos:

{{< color >}}Actualizar los repositorios: {{< /color >}}

{{< highlight php "linenos=table, hl_lines=1" >}}
#Actualizar repositorios
sudo apt update
#Instalar Apache2
sudo apt install apache2
#Instalar php y el módulo de php para apache 
sudo apt install php libapache2-mod-php

{{< / highlight >}}
Depué de realizar estas tareas, debes de resetear apache para ponerlo todo en funcionamiento
{{< highlight php "linenos=table, hl_lines=1" >}}
sudo systemctl restart apache2

{{< / highlight >}}

## Instalando en Windows con XAMPP

XAMPP es una solución sencilla para tener Apache, PHP, y MySQL en Windows. Sigue estos pasos para instalarlo:

{{< color >}}Descargar XAMPP {{< /color >}}
Ve al sitio web oficial de XAMPP [https://www.apachefriends.org](https://www.apachefriends.org) y descarga la versión que incluye PHP.

{{< color >}}Instalar XAMPP{{< /color >}}
Ejecuta el instalador y sigue las instrucciones. Asegúrate de seleccionar Apache y PHP durante la instalación.

{{< color >}} Iniciar los servicios {{< /color >}}:
Abre el panel de control de XAMPP y asegúrate de iniciar Apache.

{{< color >}}Comprobar instalación{{< /color >}}
Abre tu navegador y visita `http://localhost/`. Deberías ver la página de bienvenida de XAMPP.

## Creación de docker 

* Es esta la solución que vamos a utilizar.
* Para ello crearemos un {{< color >}} docker-compose.yaml {{< /color >}}, que nos levante un servicio con php y apache2.
* Por si queremos realizar modificaciones sobre la imagen original, la imagen la vamos a crear a patir de un {{< color >}} Dockerfile {{< /color >}}
* Cada proyecto que creemos o bien tendremos esta estructura, o bien los crearemos todos a partir de la carpeta compartida
 
{{< imgproc docker_folder Fill "230x87" >}}

{{< /imgproc >}}

{{% line %}}  

El contenido de los ficheros:

{{< highlight docker "linenos=table, hl_lines=2 3 4 5 8" >}}
services:
    web:
        build : .
        ports:
            - 8800:80
        volumes:
            - ./../app:/var/www/html
        container_name: web
{{< / highlight >}}

{{< alert title="Info" color="warning" >}}
* Creamos el servicio (contenedor ) ***web***
* A partir del **Dockerfile** que tenemos en **la misma carpeta**
* Proyectamos el puerto **8800** para acceder a él
* Mapeamos la carpeta **./../app** para escribir nuestros programas
{{< /alert >}}

El Dockerfile 
{{< highlight php "linenos=table, hl_lines=1" >}}
#Usa la imagen base de PHP con Apache
FROM php:8.3-apache
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update
***Añadir o modificar la configuración de Apache para listar directorios si no hay index***
RUN echo '<Directory /var/www/html>' >> /etc/apache2/apache2.conf
RUN echo 'Options +Indexes' >> /etc/apache2/apache2.conf
RUN echo '</Directory>' >> /etc/apache2/apache2.conf


# Exponer el puerto 80 Algo recomendado, aunque no nodecesrio
EXPOSE 80
{{< / highlight >}}

La imagen de la estructura la podríamos organizar de la siguiente manera
{{< imgproc estructura_docker Fill "504x297" >}}

{{< /imgproc >}}
# Instalación de PhpStorm

Vamos a usar esta herramienta y se os facilitarán claves para acceder. Puedes descargarla desde el sitio oficial:

{{<referencias title="PhpStorm - Descargas oficiales" subtitle="Enlaces para Windows y Linux" icon-image="inter.gif">}}
https://www.jetbrains.com/es-es/phpstorm/download/
{{</referencias>}}

{{<alert title="Nota Importante" color="yellow">}}
Debemos registrarnos en JetBrains con una cuenta de Gmail. Inicialmente, podemos usar el acceso gratuito de 30 días.
{{</alert>}}

## Instalación  de phpstorm
{{<definicion title="¿Qué es PhpStorm?" icon="icon-code">}}
PhpStorm es un entorno de desarrollo integrado (IDE) diseñado específicamente para el desarrollo en PHP. Ofrece herramientas avanzadas como depuración, soporte para frameworks, integración con control de versiones y edición de HTML, CSS y JavaScript, todo en una interfaz intuitiva.
{{</definicion>}}

### Instalación en ubuntu

{{<color>}}PhpStorm se puede instalar fácilmente en sistemas Ubuntu utilizando Snap.{{< /color>}} Snap es un sistema de paquetes que resuelve problemas de dependencias y simplifica las instalaciones en Ubuntu (introducido desde la versión 16.04).

{{% line %}}

{{< color >}} Instalación mediante Snap {{< /color >}}

1. Asegúrate de tener Snap habilitado. Para más información sobre Snap, consulta:
   {{<referencias title="Snap en Ubuntu" subtitle="Guía básica" >}}
   https://blogubuntu.com/que-es-ubuntu-snap
   {{</referencias>}}

2. Ejecuta el siguiente comando para instalar PhpStorm:
   {{< highlight dockerfile "linenos=table, hl_lines=1" >}}
   sudo snap install phpstorm --classic
   {{< /highlight >}}

{{< color >}} Instalación manual {{< /color >}}

Si prefieres instalar PhpStorm manualmente:

1. Descarga el archivo desde el sitio oficial:
   {{< highlight dockerfile "linenos=table" >}}
   wget https://download.jetbrains.com/webide/PhpStorm-2020.2.2.tar.gz
   {{< /highlight >}}

2. Extrae el contenido en el directorio recomendado `/opt`:
   {{< highlight dockerfile "linenos=table" >}}
   sudo tar xvfz PhpStorm-2020.2.2.tar.gz -C /opt/
   {{< /highlight >}}
   {{<definicion title="Parámetros del comando tar" icon="icon-tar">}}
    - **x**: Extraer archivos.
    - **f**: Utilizar un archivo.
    - **z**: Operar sobre un archivo comprimido gzip.
    - **v**: Mostrar las acciones de forma detallada (verbose).
      {{</definicion>}}

3. Cambia al directorio de instalación y ejecuta el script:
   {{< highlight dockerfile "linenos=table" >}}
   cd /opt/PhpStorm-181.5281.19/bin
   ./phpstorm.sh
   {{< /highlight >}}

#### Instalación en Windows

1. Visita la página de descarga:
   {{<referencias title="Descarga de PhpStorm para Windows" subtitle="Instalación guiada" >}}
   https://www.jetbrains.com/es-es/phpstorm/download/#section=windows
   {{</referencias>}}

2. Descarga y ejecuta el instalador siguiendo los pasos indicados.

{{% line %}}

#### Activar la licencia de phpstorm a través del instituto

Abrimos el {{<color>}}IDE PhpStorm{{< /color>}}. Si es la primera vez, se nos pedirá que aportemos la licencia o que iniciemos la versión gratuita de 30 días. Si ya hemos iniciado previamente, podemos acceder al registro desde el menú **Help**.
{{< imgproc permisos1 Fill "400x450" >}}

{{< /imgproc >}}
1. Se visualizará una página para activar la licencia.
2. Seleccionamos la opción de activación mediante servidor de licencias.
{{< imgproc permisos2 Fill "400x450" >}}

{{< /imgproc >}} 
3. Establecemos la siguiente URL del servidor:  
   {{< highlight dockerfile "linenos=table, hl_lines=1" >}}
   https://cpilosenlaces.fls.jetbrains.com
   {{< /highlight >}}

4. Finalmente, presionamos la opción **Activate** para completar el proceso.

{{<desplegable title="¿Por qué usar Snap para instalar PhpStorm?">}}
{{< imgproc snap Fill "400x450" >}}
Snap resuelve problemas de dependencias y ofrece una instalación rápida y segura, ideal para mantener PhpStorm actualizado automáticamente.
{{< /imgproc >}}
{{</desplegable>}}

{{<alert title="Nota adicional" color="blue">}}
Si tienes alguna duda, consulta la sección de preguntas frecuentes de JetBrains o contacta al soporte.
{{</alert>}}


### Temas de permisos de **Apache**

A pesar de que no somos administradores/as, debemos tener conocimientos sobre ciertos temas.  
Lo primero que debemos tener claro es que cuando **PHP** le dice en el script a Apache que actúe sobre el sistema de ficheros, en última instancia, es el usuario **apache** quien ejecuta las acciones.

Lee atentamente el siguiente cuadro y asegúrate de entender cada punto; si no, pregunta.

#### Puntos fundamentales sobre permisos

1. En **Linux**, todo **fichero** tiene un **propietario**, y también todo **proceso** o **aplicación**, como lo es {{< color >}} el servidor web apache {{< /color >}}.
    - El **propietario** del proceso es el **usuario que lanzó** dicho proceso.
    - Cuando un proceso quiere actuar sobre un fichero, el usuario que lo lanzó debe tener **permisos sobre el fichero**.
    - El usuario que lanza el programa o servicio **Apache** es **www-data**.
    - Para cambiar el propietario de un fichero o su grupo, usamos la siguiente sentencia:

   {{< highlight php "linenos=table, hl_lines=1" >}}
   sudo chown usuario:grupo fichero (-R)
   {{< / highlight >}}

   **Nota**: El parámetro `-R` es opcional y actúa de forma recursiva.

2. En PHP, un **directorio es igual que un fichero** cuyo contenido son los ficheros y directorios que contiene.

#### Para dar permisos sobre un fichero a un usuario

Usamos la siguiente sentencia:

{{< highlight php "linenos=table, hl_lines=1" >}}
sudo chmod permisos fichero (-R)
{{< / highlight >}}

**Nota**:
- **permisos** es un número de tres dígitos en **octal** (ver tabla abajo).
- **fichero** es el archivo al cual queremos asignar permisos; se puede usar `*` para aplicar a todos.
- `-R` es un parámetro opcional que actúa de forma recursiva.

| Número | Binario | Lectura (r) | Escritura (w) | Ejecución (x) |
| ------ | ------- | ----------- | ------------- | ------------- |
| 0      | 000     | ❌          | ❌            | ❌            |
| 1      | 001     | ❌          | ❌            | ✔️            |
| 2      | 010     | ❌          | ✔️            | ❌            |
| 3      | 011     | ❌          | ✔️            | ✔️            |
| 4      | 100     | ✔️          | ❌            | ❌            |
| 5      | 101     | ✔️          | ❌            | ✔️            |
| 6      | 110     | ✔️          | ✔️            | ❌            |
| 7      | 111     | ✔️          | ✔️            | ✔️            |

Por ejemplo:

{{< highlight php "linenos=table, hl_lines=1" >}}
chmod 766 file.txt   # Brinda acceso total al dueño, y lectura y escritura a los demás
chmod 770 file.txt   # Brinda acceso total al dueño y al grupo, y elimina permisos a los demás
chmod 635 file.txt   # Permite lectura y escritura al dueño, escritura y ejecución al grupo, y lectura y ejecución al resto
{{< / highlight >}}

> **Nota**: Recuerda que es el usuario **apache** quien debe tener los permisos necesarios (**leer (r), escribir (w), ejecutar (x)**).

#### Establecer propietaro a carpetas

El comando {{< color >}} chown {{< /color >}} en Linux, permite {{< color >}} cambiar el propietario y el grupo de uno o varios archivos o directorios {{< /color >}}. 

{{< highlight bash "linenos=table, hl_lines=1" >}}
    sudo chown usuario:grupo archivo_o_directorio
{{< / highlight >}}

* {{< color >}} Usuario {{< /color >}} se refiere al nuevo propietario del archivo o directorio.
* {{< color >}} grupo  {{< /color >}} es el grupo al que se le asignarán los permisos sobre ese archivo o directorio. 
* Al añadir el parámetro {{< color >}} -R {{< /color >}} al comando, {{< color >}} chown {{< /color >}} aplica el cambio de propietario y grupo de manera recursiva, afectando todos los archivos y carpetas dentro del directorio especificado.


Para el caso de servidores web, el directorio {{< color >}} /var/www/html {{< /color >}} es donde suelen almacenarse los archivos públicos del sitio (valor que contiene la directiva {{< color >}} DocumentRoot {{< /color >}} en la configuración del virtual host del servidor.

{{< color >}} El propietario {{< /color >}} de este directorio debería ser {{< color >}} el usuario del sistema {{< /color >}} que necesita subir o modificar los archivos.

{{< color >}} El grupo {{< /color >}} debería asignarse al usuario que ejecuta Apache {{< color >}} (generalmente `www-data`) {{< /color >}}

 Esto permite que el sistema gestione los archivos correctamente

{{< alert title="Importante" color="success" >}}
* El usuario del sistema tiene permisos de escritura para crear, modificar o eliminar archivos según sea necesario.
* El grupo de Apache (`www-data`) puede acceder a los archivos para servirlos a través del servidor web.
 {{< /alert >}}

Para establecer este tipo de permisos en `/var/www/html`, puedes ejecutar:

{{< highlight php "linenos=table, hl_lines=1" >}}
sudo chown usuario:www-data /var/www/html -R
{{< / highlight >}}

Con esta configuración, los archivos se gestionarán con permisos de usuario para editar contenido y permisos de grupo para que Apache pueda acceder y servir el sitio web de manera segura.




