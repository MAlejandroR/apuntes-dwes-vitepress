---
title: Practicando
---

::: pageinfo
#### Practicando

Creamos en nuestro servidor web dos sitios virtuales o virtual host, llamados `www.informatica.com` y `www.musica.com`.
Cada uno de ellos va a tener esta peculiaridad de comportamiento: `www.informatica.com` va a ir a buscar los recursos a la carpeta `/var/www/informatica`, y `www.musica.com` a `/var/www/musica`.
:::

### Creando los ficheros de configuración

Para configurar dos sitios en Apache, vamos a crear dos archivos de configuración en `sites-available` y luego activarlos.

Lo primero vamos a la carpeta `/etc/apache2/sites-available`, y nos copiamos el fichero de configuración que hay ahí <Color>000-default.conf</Color> a por ejemplo <Color>informatica.conf</Color> y <Color>musica.conf</Color>.
Recuerda que son ficheros de configuración y debemos hacerlo como superusuario:

```bash{1}
sudo cp 000-default.conf informatica.conf
sudo cp 000-default.conf musica.conf
```

- Modificamos el fichero con la nueva configuración.
- Para ello lo editamos con un editor, por ejemplo **gedit**:

```bash{1}
sudo gedit informatica.conf
```

- y añadimos las siguientes líneas:

```apache{2,3}
<VirtualHost *:80>
ServerName www.informatica.com
DocumentRoot /var/www/informatica
</VirtualHost>
```

- El fichero original tiene muchas más líneas que podemos eliminar.
- Todas las líneas que empiecen por **#** son comentarios que no tienen efecto en la configuración.
- Hacemos lo mismo en <Color>musica.conf</Color>:

```bash{1}
sudo gedit musica.conf
```

- y añadimos su configuración:

```apache{2,3}
<VirtualHost *:80>
ServerName www.musica.com
DocumentRoot /var/www/musica
</VirtualHost>
```

### Modificación del archivo hosts

Para realizar pruebas en local, añade los siguientes dominios al archivo `hosts` en tu equipo.

En Ubuntu, el archivo se encuentra en `/etc/hosts`; en Windows, en `c:\windows\system32\drivers\etc\hosts`. Añade estas líneas:

```bash{1,2}
127.0.0.1 www.informatica.com
127.0.0.1 www.musica.com
```

Luego, puedes probar que los dominios responden ejecutando:

```bash{1}
ping www.informatica.com
ping www.musica.com
```

### Activación de los sitios

Una vez que hayas creado estos archivos de configuración en `sites-available`, debes activarlos usando los siguientes comandos:

```bash{1}
sudo a2ensite informatica.conf
sudo a2ensite musica.conf
sudo systemctl reload apache2
```

Esto creará los enlaces simbólicos en `sites-enabled` y recargará Apache para aplicar la configuración.

#### Creando el directorio

Ahora debemos crear los directorios que hemos especificado para que Apache vaya ahí a buscar los recursos cuando se los soliciten.

Lo podemos hacer con nuestro IDE, por ejemplo PhpStorm.

Vamos a crear carpetas en <Color>/var/www</Color>, por lo que tenemos que tener permisos de escritura y ser propietarios.

![Permisos de /var/www](./img.png)

Ahí vemos que esta carpeta es de root, y nosotros no podremos crear recursos.
Para ello ejecutamos el comando de cambiar de propietario (en nuestro ordenador somos <Color>alumno</Color>). Yo en el ejemplo, como en mi equipo soy <Color>manuel</Color>, pongo a ese usuario.
Podemos especificar la carpeta con ruta absoluta:

```bash{1}
sudo chown manuel:manuel /var/www
```

y me habrá cambiado el propietario:

![Propietario de /var/www](./img_1.png)

Ahora creamos las carpetas y recursos y ya los puedo acceder desde el navegador.
