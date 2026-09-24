const favicons = [
    {
        path: '/02_entornos_herramientas/docker/',
        icon: '/favicons/docker.ico',
    },
    {
        path: '/04_php/',
        icon: '/favicons/php.png',
    },
    {
        path: '/05_laravel/',
        icon: '/favicons/laravel.jpeg',
    },
]

export function getFavicon(path: string): string {
    const favicon = favicons.find(item => path.startsWith(item.path))

    return favicon?.icon ?? '/favicons/dwes.png'
}