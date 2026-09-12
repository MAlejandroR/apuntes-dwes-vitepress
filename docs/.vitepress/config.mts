import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import container from 'markdown-it-container'
import type MarkdownIt from 'markdown-it'
import { goatCounter } from './site'

function dawsContainers(md: MarkdownIt) {
  function labeledBox(
    name: string,
    className: string,
    kicker: string,
    defaultSub: string,
  ) {
    md.use(container, name, {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const sub =
            tokens[idx].info
              .trim()
              .replace(new RegExp(`^${name}\\s*`, 'i'), '')
              .trim() || defaultSub
          return `<div class="${className}">
<p class="${className}__kicker">${md.utils.escapeHtml(kicker)}</p>
<p class="${className}__sub">${md.utils.escapeHtml(sub)}</p>
<div class="${className}__body">\n`
        }
        return '</div></div>\n'
      },
    })
  }

  labeledBox('objetivos', 'daws-objetivos', 'Objetivos', 'Qué veremos aquí')
  labeledBox(
    'finalidad',
    'daws-finalidad',
    'Finalidad',
    'Al terminar el tema deberás…',
  )
  labeledBox(
    'referencias',
    'daws-referencias',
    'Referencias',
    'Dónde buscar información',
  )
  labeledBox('definicion', 'daws-definicion', 'Definición', 'Concepto')
  labeledBox('previo', 'daws-previo', 'Conocimiento previo', 'Antes de seguir')
  labeledBox('actividad', 'daws-actividad', 'Actividad', 'Para hacer ahora')
  labeledBox('pregunta', 'daws-pregunta', 'Pregunta', 'Para pensar en clase')

  md.use(container, 'pageinfo', {
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<div class="daws-pageinfo">\n'
      }
      return '</div>\n'
    },
  })
}

export default withMermaid(
  defineConfig({
    lang: 'es',
    title: 'DAWS',
    description:
      'Desarrollo web en entorno servidor: PHP, Laravel, Docker, Git y el viaje de una petición HTTP.',
    srcExclude: ['php_distancia/**'],
    // outDir: '../dist',
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
          { text: 'Qué son', link: '/construccion' },
          { text: 'Git', link: '/construccion' },
          { text: 'Docker', link: '/construccion' },
          { text: 'IA en clase', link: '/construccion' },
          { text: 'Comandos Linux', link: '/construccion' },
          { text: 'Redes', link: '/02_entornos_herramientas/redes/' },
          { text: 'Modelo OSI', link: '/02_entornos_herramientas/osi/' },
          { text: 'Internet', link: '/02_entornos_herramientas/internet/' },
          { text: 'WWW', link: '/02_entornos_herramientas/www/' },
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
