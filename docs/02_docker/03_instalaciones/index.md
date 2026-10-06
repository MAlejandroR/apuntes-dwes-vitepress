---
title: Instalación
---

::: objetivos Qué hay que tener el primer día
- Motor de Docker funcionando
- El plugin de Compose (`docker compose`, con espacio)
- Un `hello-world` que salga limpio
:::

::: referencias Páginas oficiales
Los pasos de repositorio cambian. Si algo no cuadra, **gana la página oficial**.

- [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
:::

En [Comandos Linux](/02_entornos_herramientas/linux) vimos que `apt` solo instala lo que conocen **sus repositorios**. Docker **no** está (completo) en los oficiales de Ubuntu: hay que añadir el repositorio de Docker Inc. Abajo está el recorte; no hace falta memorizar cada línea.

## Ubuntu (motor + Compose)

1. Paquetes de apoyo:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
```

2. Clave y repositorio **externo** (`/etc/apt/sources.list.d/`):

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo ${UBUNTU_CODENAME:-$VERSION_CODENAME}) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

3. Instalar y comprobar:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Hoy el comando es <Color>docker compose</Color> (plugin), no el binario antiguo `docker-compose`.

4. Para no usar `sudo` en cada comando:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

En terminales ya abiertas, cierra sesión o reinicia. Si sale `permission denied` sobre `/var/run/docker.sock`, el grupo no está aplicado.

```bash
docker version
docker compose version
docker run --rm hello-world
```

## Windows (Docker Desktop)

Docker **no corre nativo** sobre un kernel Windows para contenedores Linux. Desktop monta un Linux (**WSL2**, lo que usamos).

1. Instala **Docker Desktop** y, en el asistente, elige WSL2.
2. **Arranca** Desktop (icono de la ballena). Sin eso no hay motor.
3. Trabaja en Windows Terminal / PowerShell igual que en Linux. En este módulo **no** uses *Switch to Windows containers*.


