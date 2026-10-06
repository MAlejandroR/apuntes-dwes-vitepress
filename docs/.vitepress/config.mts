import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { fetchVisitCount, goatCounter } from './site'
import { dawsContainers } from './markdows/containers'

const dawsVisitCount = await fetchVisitCount()

export default withMermaid(
    defineConfig({
        lang: 'es',
        title: 'DAWS',
        description:
            'Desarrollo web en entorno servidor: PHP, Laravel, Docker, Git y el viaje de una petición HTTP.',

        srcExclude: ['php_distancia/**'],

        vite: {
            define: {
                __DAWS_VISIT_COUNT__: JSON.stringify(dawsVisitCount),
            },
        },

        markdown: {
            lineNumbers: true,
            config(md) {
                dawsContainers(md)
            },
        },

        mermaid: {
            theme: 'default',
            securityLevel: 'loose',
        },

        head: goatCounter
            ? [
                [
                    'script',
                    {
                        'data-goatcounter': `https://${goatCounter}.goatcounter.com/count`,
                        async: 'true',
                        src: '//gc.zgo.at/count.js',
                    },
                ],
            ]
            : [],

        themeConfig: {
            nav: [
                {
                    text: 'Inicio',
                    link: '/',
                },
                {
                    text: 'Contenido',
                    link: '/000_Presentacion/01_presentacion',
                },
                {
                    text: 'PHP',
                    link: '/04_php/',
                },
            ],

            sidebar: [
                // ============================================================
                // EL MÓDULO
                // ============================================================
                {
                    text: `
                        <span class="sidebar-title">
                            <i class="fa-solid fa-desktop"></i>
                            <span>El módulo: DWES</span>
                        </span>
                    `,
                    collapsed: true,
                    items: [
                        {
                            text: 'Inicio',
                            link: '/',
                        },
                        {
                            text: 'Presentación',
                            link: '/000_Presentacion/01_presentacion',
                        },
                        {
                            text: 'Motivación',
                            link: '/000_Presentacion/02_motivacion',
                        },
                    ],
                },

                // ============================================================
                // FUNDAMENTOS WEB
                // ============================================================
                {
                    text: `
                        <span class="sidebar-title">
                            <i class="fa-solid fa-globe"></i>
                            <span>Fundamentos Web</span>
                        </span>
                    `,
                    collapsed: true,
                    items: [
                        {
                            text: 'Introducción al desarrollo web',
                            link: '/01_Conceptos_generales/',
                        },
                        {
                            text: 'Redes',
                            link: '/02_entornos_herramientas/redes/',
                        },
                        {
                            text: 'Modelo OSI',
                            link: '/02_entornos_herramientas/osi/',
                        },
                        {
                            text: 'Internet',
                            link: '/02_entornos_herramientas/internet/',
                        },
                        {
                            text: 'WWW',
                            link: '/02_entornos_herramientas/www/',
                        },
                    ],
                },

                // ============================================================
                // ENTORNO DE SERVIDOR
                // ============================================================
                {
                    text: `
                        <span class="sidebar-title">
                            <i class="fa-solid fa-terminal"></i>
                            <span>Entorno de servidor</span>
                        </span>
                    `,
                    collapsed: true,
                    items: [
                        {
                            text: 'Linux',
                            link: '/02_entornos_herramientas/linux',
                        },
                        {
                            text: 'Herramientas',
                            link: '/02_entornos_herramientas/instalaciones/',
                        },
                        {
                            text: 'Apache',
                            link: '/02_entornos_herramientas/instalaciones/apache/',
                        },
                        {
                            text: 'Práctica: Virtual Hosts',
                            link: '/02_entornos_herramientas/instalaciones/apache/practica/',
                        },
                        {
                            text: 'PhpStorm y permisos',
                            link: '/02_entornos_herramientas/instalaciones/phpstorm',
                        },
                    ],
                },

                // ============================================================
                // DOCKER
                // ============================================================
                {
                    text: `
                        <span class="sidebar-title">
                            <i class="fa-brands fa-docker"></i>
                            <span>Docker</span>
                        </span>
                    `,
                    link: '/02_docker/',
                    collapsed: true,
                    items: [
                        {
                            text: 'Conceptos',
                            link: '/02_docker/01_conceptos',
                        },
                        {
                            text: 'Imágenes y contenedores',
                            link: '/02_entornos_herramientas/docker/02_contenedor_imagenes',
                        },
                        {
                            text: 'Instalación',
                            link: '/02_docker/03_instalacion',
                        },
                        {
                            text: 'Comandos',
                            link: '/02_docker/04_comandos',
                        },
                        {
                            text: 'Dockerfile',
                            link: '/02_docker/dockerfile',
                        },
                        {
                            text: 'Compose',
                            link: '/02_docker/compose',
                        },
                        {
                            text: 'Prácticas',
                            link: '/02_docker/practica',
                        },
                    ],
                },

                // ============================================================
                // PHP
                // ============================================================
                {
                    text: `
                        <span class="sidebar-title">
                            <i class="fa-brands fa-php"></i>
                            <span>PHP</span>
                        </span>
                    `,
                    link: '/04_php/',
                    collapsed: true,
                    items: [
                        {
                            text: 'El lenguaje',
                            link: '/04_php/01_introduccion/',
                        },
                        {
                            text: 'Empezando',
                            link: '/04_php/03_Empezando/',
                        },
                        {
                            text: 'Escribiendo',
                            link: '/construccion',
                        },
                        {
                            text: 'Declaraciones',
                            link: '/construccion',
                        },
                        {
                            text: 'Control selectivo',
                            link: '/construccion',
                        },
                        {
                            text: 'Control repetitivo',
                            link: '/construccion',
                        },
                        {
                            text: 'Expresiones',
                            link: '/construccion',
                        },
                    ],
                },

                // ============================================================
                // LARAVEL
                // ============================================================
                {
                    text: `
                        <span class="sidebar-title">
                            <i class="fa-brands fa-laravel"></i>
                            <span>Laravel</span>
                        </span>
                    `,
                    link: '/05_laravel/',
                    collapsed: true,
                    items: [
                        {
                            text: 'Próximamente',
                            link: '/05_laravel/',
                        },
                    ],
                },
            ],

            outline: 'deep',

            socialLinks: [
                {
                    icon: 'github',
                    link: 'https://github.com/MAlejandroR/apuntes-dwes-vitepress.git',
                },
            ],

            search: {
                provider: 'local',
                options: {
                    translations: {
                        button: {
                            buttonText: 'Buscar',
                            buttonAriaLabel: 'Buscar en los apuntes',
                        },
                        modal: {
                            displayDetails: 'Mostrar vista detallada',
                            resetButtonTitle: 'Limpiar búsqueda',
                            backButtonTitle: 'Cerrar búsqueda',
                            noResultsText: 'No hay resultados para',
                            footer: {
                                selectText: 'para seleccionar',
                                selectKeyAriaLabel: 'entrar',
                                navigateText: 'para navegar',
                                navigateUpKeyAriaLabel: 'arriba',
                                navigateDownKeyAriaLabel: 'abajo',
                                closeText: 'para cerrar',
                                closeKeyAriaLabel: 'escape',
                            },
                        },
                    },
                },
            },
        },
    }),
)