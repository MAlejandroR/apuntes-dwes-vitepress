---
title: Persistencia
---

### La persistencia en php

::: definicion
- <Color>La persistencia</Color> permite conservar los datos entre distintas interacciones entre el cliente y el servidor, asegurando que la información no se pierda durante la navegación o el cierre de la sesión.
:::

<Color>En la programación web</Color>, el protocolo HTTP es **sin estado** (stateless), lo que significa que no guarda información sobre interacciones previas entre el cliente y el servidor.

Esta característica, puede suponer  una limitación () para aplicaciones que necesitan recordar datos entre solicitudes, como las preferencias de usuario, las sesiones activas o los datos en procesos largos.

Para superar esta limitación, existen diversas estrategias de persistencia que permiten mantener la información necesaria:

- **Campos ocultos**: Utilizar inputs ocultos en formularios para transferir datos entre páginas. Esta técnica es sencilla pero limitada a interacciones basadas en formularios.
- **Sesiones**: Guardar información temporalmente en el servidor, asociada a un cliente mediante un identificador que suele almacenarse en cookies o en la URL.
- **Cookies**: Almacenar pequeños fragmentos de datos en el navegador del cliente que persisten entre visitas. Son útiles para recordar preferencias o configuraciones, aunque tienen limitaciones de tamaño y posibles problemas de privacidad.
- **Ficheros**: Guardar datos en archivos en el servidor. Es una solución simple y rápida para pequeños volúmenes de información, pero no escalable para sistemas grandes.
- **Bases de datos**: Utilizar sistemas robustos para almacenar información estructurada y persistente. Son ideales para aplicaciones complejas que requieren escalabilidad.

Además, en desarrollos modernos, encontramos otras opciones como:
- **Storage del navegador**: APIs como `localStorage` y `sessionStorage` permiten guardar datos directamente en el navegador, facilitando aplicaciones dinámicas sin necesidad de enviar solicitudes constantes al servidor.
- **JWT (JSON Web Tokens)**: Utilizar tokens para mantener el estado de la autenticación o datos entre cliente y servidor, especialmente en aplicaciones basadas en APIs REST.

Estas estrategias pueden combinarse según las necesidades específicas de la aplicación.


<div class="daws-iframe">
<iframe src="https://es.wikieducator.org/index.php?curid=6679" width="100%" height="2500">WikiEducator </iframe>
</div>
