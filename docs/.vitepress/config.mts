import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { fetchVisitCount, goatCounter } from './site'
import { dawsContainers } from "./markdows/containers";



const dawsVisitCount = await fetchVisitCount()

export default withMermaid(
  defineConfig({
    lang: 'es',
    title: 'DAWS',
    description:
      'Desarrollo web en entorno servidor: PHP, Laravel, Docker, Git y el viaje de una petición HTTP.',
    srcExclude: ['php_distancia/**'],
    // outDir: '../dist',
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
      { text: 'Inicio', link: '/' },
      {
        text: 'Contenido',
        link:'/000_Presentacion/01_presentacion',
      },
      { text: 'PHP', link: '/04_php/' },
    ],
    sidebar: [
      {
        text: 'Nuestro módulo: DWES',
        collapsed: true,
        items: [
          { text: 'Inicio', link: '/' },
          { text: 'Presentacion', link: '/000_Presentacion/01_presentacion' },
          { text: 'Motivación', link: '/000_Presentacion/02_motivacion' },
        ],
      },
      {
        text: '1. Introducción',
        items: [
          { text: 'Introducción al desarrollo web', link: '/01_Conceptos_generales/' },
        ],
      },
      {
        text: '2. Entorno y Herramientas',
        collapsed: true,
        items: [
          // { text: 'Qué son', link: '/construccion' },
          // { text: 'Git', link: '/construccion' },
          // { text: 'Docker', link: '/construccion' },
          // { text: 'IA en clase', link: '/construccion' },
          { text: 'Redes', link: '/02_entornos_herramientas/redes/' },
          { text: 'Modelo OSI', link: '/02_entornos_herramientas/osi/' },
          { text: 'Internet', link: '/02_entornos_herramientas/internet/' },
          { text: 'WWW', link: '/02_entornos_herramientas/www/' },
          { text: 'Comandos Linux', link: '/02_entornos_herramientas/linux.md' },
          {
            text: 'Docker',
            link:'/02_entornos_herramientas/docker/00_index',
            collapsed: true,
            items: [
              { text: 'Conceptos', link: '/02_entornos_herramientas/docker/01_conceptos' },
              { text: 'Imágenes y Contenedores', link: '/02_entornos_herramientas/docker/02_contenedor_imagenes' },
              { text: 'Instalación', link: '/02_entornos_herramientas/docker/03_instalacion' },
              { text: 'Comandos', link: '/02_entornos_herramientas/docker/04_comandos' },
              { text: 'Dockerfile', link: '/02_entornos_herramientas/docker/dockerfile' },
              { text: 'Compose', link: '/02_entornos_herramientas/docker/compose' },
              { text: 'Práctica de la semana', link: '/02_entornos_herramientas/docker/practica' },
            ],
          },
          // { text: 'Qué son', link: '/02_entornos_herramientas/' },
          // { text: 'Git', link: '/02_entornos_herramientas/git' },
          // { text: 'Docker', link: '/02_entornos_herramientas/docker' },
          // { text: 'IA en clase', link: '/02_entornos_herramientas/ia' },
          // { text: 'Comandos Linux', link: '/02_entornos_herramientas/linux' },
          // { text: 'Redes', link: '/02_entornos_herramientas/redes/' },
          // { text: 'Modelo OSI', link: '/02_entornos_herramientas/osi/' },
          // { text: 'Internet', link: '/02_entornos_herramientas/internet/' },
          // { text: 'WWW', link: '/02_entornos_herramientas/www/' },
          {
            text: 'Instalaciones',
            collapsed: true,
            items: [
              { text: 'Herramientas', link: '/02_entornos_herramientas/instalaciones/' },
              { text: 'Apache', link: '/02_entornos_herramientas/instalaciones/apache/' },
              {
                text: 'Práctica virtual hosts',
                link: '/02_entornos_herramientas/instalaciones/apache/practica/',
              },
              {
                text: 'PhpStorm y permisos',
                link: '/02_entornos_herramientas/instalaciones/phpstorm',
              },
            ],
          },
        ],
      },
      {
        text: '3. Conceptos de la web',
        items: [
          { text: 'Aplicación web', link: '/construccion' },
          { text: 'Qué es PHP', link: '/construccion' },
          // { text: 'Aplicación web', link: '/03_conceptos_web/' },
          // { text: 'Qué es PHP', link: '/03_conceptos_web/php' },
        ],
      },
      {
        text: '4. PHP',
        collapsed: true,
        items: [
          { text: 'El lenguaje', link: '/construccion' },
          { text: 'Empezando', link: '/construccion' },
          { text: 'Escribiendo', link: '/construccion' },
          { text: 'Declaraciones', link: '/construccion' },
          { text: 'Control selectivo', link: '/construccion' },
          { text: 'Control repetitivo', link: '/construccion' },
          { text: 'Expresiones', link: '/construccion' },
          { text: 'Más detalles', link: '/construccion' },
          { text: 'Funciones propias', link: '/construccion' },
          { text: 'Funciones', link: '/construccion' },
          { text: 'Práctica funciones', link: '/construccion' },
          { text: 'Ejercicios', link: '/construccion' },
          { text: 'Arrays', link: '/construccion' },
          { text: 'Ejercicios arrays', link: '/construccion' },
          { text: 'Formularios', link: '/construccion' },
          { text: 'Ejercicios formularios', link: '/construccion' },
          { text: 'Persistencia', link: '/construccion' },
          { text: 'Cookies', link: '/construccion' },
          { text: 'Sesiones', link: '/construccion' },
          { text: 'Objetos', link: '/construccion' },
          { text: 'Básico', link: '/construccion' },
          { text: 'Sintaxis', link: '/construccion' },
          { text: 'Herencia', link: '/construccion' },
          { text: 'Sobrecarga', link: '/construccion' },
          { text: 'Estático', link: '/construccion' },
          { text: 'Expresiones regulares', link: '/construccion' },
          { text: 'Bases de datos', link: '/construccion' },
          { text: 'Repaso SQL', link: '/construccion' },
          { text: 'SQL', link: '/construccion' },
          { text: 'MySQL', link: '/construccion' },
          { text: 'MySQLi', link: '/construccion' },
          { text: 'PDO', link: '/construccion' },
        ],
      },
      //     { text: 'El lenguaje', link: '/04_php/' },
      //     { text: 'Empezando', link: '/04_php/03_empezando/' },
      //     { text: 'Escribiendo', link: '/04_php/04_escribiendo/' },
      //     { text: 'Declaraciones', link: '/04_php/05_declaraciones/' },
      //     { text: 'Control selectivo', link: '/04_php/06_control_selectivo/' },
      //     { text: 'Control repetitivo', link: '/04_php/07_control_repetitivo/' },
      //     { text: 'Expresiones', link: '/04_php/08_expresiones/' },
      //     { text: 'Más detalles', link: '/04_php/09_mas_detalles/' },
      //     { text: 'Funciones propias', link: '/04_php/10_funciones_propias/' },
      //     { text: 'Funciones', link: '/04_php/11_funciones/' },
      //     { text: 'Práctica funciones', link: '/04_php/11_funciones/practica/' },
      //     { text: 'Ejercicios', link: '/04_php/12_ejercicios/' },
      //     { text: 'Arrays', link: '/04_php/13_arrays/' },
      //     { text: 'Ejercicios arrays', link: '/04_php/13_arrays/ejercicios/' },
      //     { text: 'Formularios', link: '/04_php/14_formularios/' },
      //     {
      //       text: 'Ejercicios formularios',
      //       link: '/04_php/14_formularios/ejercicios/',
      //     },
      //     { text: 'Persistencia', link: '/04_php/15_persistencia/' },
      //     { text: 'Cookies', link: '/04_php/15_persistencia/cookies/' },
      //     { text: 'Sesiones', link: '/04_php/15_persistencia/sesiones/' },
      //     { text: 'Objetos', link: '/04_php/16_objetos/' },
      //     { text: 'Básico', link: '/04_php/16_objetos/basico/' },
      //     { text: 'Sintaxis', link: '/04_php/16_objetos/sintaxis/' },
      //     { text: 'Herencia', link: '/04_php/16_objetos/herencia/' },
      //     { text: 'Sobrecarga', link: '/04_php/16_objetos/sobrecarga/' },
      //     { text: 'Estático', link: '/04_php/16_objetos/estatico/' },
      //     {
      //       text: 'Expresiones regulares',
      //       link: '/04_php/17_expresiones_regulares/',
      //     },
      //     { text: 'Bases de datos', link: '/04_php/18_bases_datos/' },
      //     { text: 'Repaso SQL', link: '/04_php/18_bases_datos/repaso/' },
      //     { text: 'SQL', link: '/04_php/18_bases_datos/sql/' },
      //     { text: 'MySQL', link: '/04_php/18_bases_datos/mysql/' },
      //     { text: 'MySQLi', link: '/04_php/18_bases_datos/mysqli/' },
      //     { text: 'PDO', link: '/04_php/18_bases_datos/pdo/' },
      //   ],
      // },
      {
        text: '5. Laravel',
        items: [{ text: 'Próximamente', link: '/05_laravel/' }],
      },
    ],
    outline: 'deep',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MAlejandroR/apuntes-dwes-vitepress.git' },

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
