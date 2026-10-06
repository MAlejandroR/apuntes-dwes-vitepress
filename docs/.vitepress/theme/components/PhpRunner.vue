<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { php } from '@codemirror/lang-php'

// Para el coloreado de sintaxis
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'


/*
 * ========================================
 * COLOREADO DE SINTAXIS PHP
 * ========================================
 *
 * Definimos los colores utilizados por CodeMirror
 * para los diferentes elementos del lenguaje PHP.
 */
const phpHighlight = HighlightStyle.define([
  {
    tag: tags.meta,
    color: '#c678dd'
  },
  {
    tag: tags.variableName,
    color: '#e06c75'
  },
  {
    tag: tags.keyword,
    color: '#c678dd'
  },
  {
    tag: tags.string,
    color: '#98c379'
  },
  {
    tag: tags.number,
    color: '#d19a66'
  },
  {
    tag: tags.comment,
    color: '#7f848e',
    fontStyle: 'italic'
  },
  {
    tag: tags.function(tags.variableName),
    color: '#61afef'
  }
])


/*
 * ========================================
 * PROPS DEL COMPONENTE
 * ========================================
 *
 * filename:
 *   Nombre del fichero que mostramos en la cabecera.
 *
 * description:
 *   Breve explicación de lo que pretende mostrar
 *   el ejemplo.
 */
const props = withDefaults(
    defineProps<{
      filename?: string
      description?: string
    }>(),
    {
      filename: 'ejemplo.php',
      description: 'Código ejemplo para probar'
    }
)


/*
 * ========================================
 * CÓDIGO RECIBIDO DESDE EL SLOT
 * ========================================
 *
 * El código PHP se escribe dentro del componente:
 *
 * <PhpRunner>
 *
 * ```php
 * <?php
 * echo "Hola";
 * ```
 *
 * </PhpRunner>
 *
 * VitePress genera un <code> a partir del bloque Markdown.
 * En onMounted buscamos ese elemento y recuperamos
 * su contenido.
 */
const slotContent = ref<HTMLElement | null>(null)

const code = ref('')

let initialCode = ''


onMounted(() => {

  // Buscamos el elemento <code> generado por VitePress
  const codeElement = slotContent.value?.querySelector('code')

  if (codeElement) {

    // Guardamos el código original.
    // Se utilizará posteriormente para Restaurar.
    initialCode = codeElement.textContent ?? ''

    // Cargamos el código en CodeMirror
    code.value = initialCode
  }
})


/*
 * ========================================
 * CONFIGURACIÓN DE CODEMIRROR
 * ========================================
 */
const extensions = [
  php(),
  syntaxHighlighting(phpHighlight)
]


/*
 * ========================================
 * SALIDA DEL PROGRAMA
 * ========================================
 *
 * Contenido devuelto por el servidor PHP.
 */
const output = ref('')


/*
 * Tipo de resultado obtenido.
 *
 * success        -> ejecución correcta
 * code-error     -> error producido por PHP
 * security-error -> código bloqueado por seguridad
 * server-error   -> problema al contactar o ejecutar
 *                  el servicio remoto
 */
const outputType = ref<
    'success' |
    'code-error' |
    'security-error' |
    'server-error' |
    ''
>('')


/*
 * ========================================
 * MODO DE VISUALIZACIÓN
 * ========================================
 *
 * text:
 *   Muestra literalmente la salida producida por PHP.
 *
 * html:
 *   Interpreta la salida como un documento HTML.
 *
 * Por defecto comenzamos siempre mostrando texto.
 */
const outputView = ref<'text' | 'html'>('text')


/*
 * Indica si actualmente estamos esperando
 * la respuesta del servidor.
 */
const loading = ref(false)


/**
 * ========================================
 * EJECUTAR CÓDIGO
 * ========================================
 *
 * Envía el contenido actual de CodeMirror al servidor.
 *
 * El servidor ejecuta el código PHP y devuelve
 * un JSON con:
 *
 * - output
 * - error
 * - exitCode
 * - limitError
 */
async function executeCode() {

  loading.value = true

  // Limpiamos cualquier ejecución anterior
  output.value = ''
  outputType.value = ''

  try {

    /*
     * Servicio PHP encargado de ejecutar
     * el código de los ejemplos.
     */
    const response = await fetch(
        'https://php-runner.web.infenlaces.com/ejecutar.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            code: code.value
          })
        }
    )


    /*
     * Convertimos la respuesta del servidor a JSON.
     */
    const result = await response.json()


    /*
     * ----------------------------------------
     * ERROR DEL SERVIDOR
     * ----------------------------------------
     *
     * Por ejemplo:
     * 500, 404, etc.
     */
    if (!response.ok) {

      outputType.value = 'server-error'

      output.value =
          result.error ??
          `Error HTTP ${response.status}`

      return
    }


    /*
     * ----------------------------------------
     * CÓDIGO BLOQUEADO POR SEGURIDAD
     * ----------------------------------------
     *
     * El servidor ha detectado alguna operación
     * que no permitimos en este entorno.
     */
    if (result.limitError) {

      outputType.value = 'security-error'
      output.value = result.limitError

      return
    }


    /*
     * ----------------------------------------
     * ERROR EN EL CÓDIGO PHP
     * ----------------------------------------
     *
     * PHP ha terminado con error o ha devuelto
     * información de error.
     */
    if (result.exitCode !== 0 || result.error) {

      outputType.value = 'code-error'
      output.value = result.error

      return
    }


    /*
     * ----------------------------------------
     * EJECUCIÓN CORRECTA
     * ----------------------------------------
     */
    outputType.value = 'success'
    output.value = result.output


  } catch (error) {

    /*
     * Aquí normalmente llegaremos si existe
     * un problema de red o si la respuesta
     * recibida no puede procesarse.
     */
    outputType.value = 'server-error'

    output.value =
        error instanceof Error
            ? error.message
            : 'Se ha producido un error inesperado'

  } finally {

    /*
     * Tanto si la ejecución ha funcionado
     * como si ha fallado, dejamos de mostrar
     * el estado "Ejecutando...".
     */
    loading.value = false
  }
}


/**
 * ========================================
 * RESTAURAR CÓDIGO
 * ========================================
 *
 * Recupera exactamente el código que inicialmente
 * se recibió mediante el slot.
 */
function resetCode() {

  // Restauramos el código original
  code.value = initialCode

  // Eliminamos cualquier resultado anterior
  output.value = ''
  outputType.value = ''

  // Recuperamos la vista inicial
  outputView.value = 'text'
}

</script>


<template>

  <!--
    ========================================
    SLOT ORIGINAL
    ========================================

    Este bloque contiene el Markdown procesado
    por VitePress.

    Lo necesitamos para obtener el código inicial.

    El CSS de php-runner__slot puede utilizarse
    para decidir si además queremos mostrar
    externamente el bloque original.
  -->
  <div
      ref="slotContent"
      class="php-runner__slot"
  >
    <slot/>
  </div>


  <div class="php-runner">

    <!-- =====================================
         CABECERA
         ===================================== -->
    <div class="php-runner__header">

      <div class="php-runner__title">

        <i class="fa-brands fa-php"></i>

        <span>PHP</span>

        <!--
          Solo mostramos la descripción
          cuando existe.
        -->
        <span
            v-if="description"
            class="php-runner__description"
        >
          {{ description }}
        </span>

      </div>


      <!-- Nombre del fichero -->
      <span class="php-runner__filename">
        {{ filename }}
      </span>

    </div>


    <!-- =====================================
         EDITOR CODEMIRROR
         ===================================== -->
    <div class="php-runner__editor">

      <Codemirror
          v-model="code"
          :extensions="extensions"
          :tab-size="4"
          :indent-with-tab="true"
      />

    </div>


    <!-- =====================================
         BARRA DE ACCIONES
         ===================================== -->
    <div class="php-runner__actions">

      <!-- Ejecutar código -->
      <button
          class="php-runner__button php-runner__button--run"
          :disabled="loading"
          @click="executeCode"
      >

        <i class="fa-solid fa-play"></i>

        {{ loading ? 'Ejecutando...' : 'Ejecutar' }}

      </button>


      <!-- Restaurar código inicial -->
      <button
          class="php-runner__button"
          :disabled="loading"
          @click="resetCode"
      >

        <i class="fa-solid fa-rotate-left"></i>

        Restaurar

      </button>

    </div>


    <!-- =====================================
         SALIDA
         ===================================== -->
    <div class="php-runner__output">

      <!-- Cabecera de salida -->
      <div class="php-runner__output-header">

        <i class="fa-solid fa-terminal"></i>

        <span>Salida</span>

      </div>


      <!-- ===================================
           EJECUCIÓN CORRECTA
           =================================== -->
      <div
          v-if="outputType === 'success'"
          class="php-runner__result php-runner__result--success"
      >

        <div class="php-runner__result-title">

          <i class="fa-solid fa-circle-check"></i>

          Resultado

        </div>


        <!--
          ====================================
          SELECTOR TEXTO | HTML
          ====================================

          Permite visualizar la misma salida
          de dos formas diferentes.

          TEXTO:
            muestra literalmente la salida.

          HTML:
            interpreta las etiquetas HTML.
        -->
        <div class="php-runner__view-selector">

          <!-- Vista TEXTO -->
          <button
              type="button"
              :class="{ active: outputView === 'text' }"
              @click="outputView = 'text'"
          >

            <i class="fa-solid fa-terminal"></i>

            Texto

          </button>


          <!-- Vista HTML -->
          <button
              type="button"
              :class="{ active: outputView === 'html' }"
              @click="outputView = 'html'"
          >

            <i class="fa-solid fa-globe"></i>

            HTML

          </button>

        </div>


        <!--
          ====================================
          SALIDA COMO TEXTO
          ====================================

          <pre> conserva espacios y saltos de línea.

          Las etiquetas HTML NO se interpretan.

          Si PHP devuelve:

          <h1>Hola</h1>

          veremos literalmente esa etiqueta.
        -->
        <pre v-if="outputView === 'text'">{{ output }}</pre>


        <!--
          ====================================
          SALIDA COMO HTML
          ====================================

          srcdoc convierte la salida PHP en el
          contenido de un documento HTML.

          El iframe utiliza sandbox para aislar
          ese HTML de la página VitePress.
        -->
        <iframe
            v-else
            class="php-runner__preview"
            :srcdoc="output"
            sandbox
            title="Resultado HTML de la ejecución PHP"
        ></iframe>

      </div>


      <!-- ===================================
           ERROR EN EL CÓDIGO PHP
           =================================== -->
      <div
          v-else-if="outputType === 'code-error'"
          class="php-runner__result php-runner__result--code-error"
      >

        <div class="php-runner__result-title">

          <i class="fa-solid fa-circle-xmark"></i>

          Hay un error en tu código

        </div>


        <p>
          Revisa el código e inténtalo de nuevo.
        </p>


        <!--
          Los errores siempre se muestran
          como texto, nunca como HTML.
        -->
        <pre>{{ output }}</pre>

      </div>


      <!-- ===================================
           CÓDIGO BLOQUEADO
           =================================== -->
      <div
          v-else-if="outputType === 'security-error'"
          class="php-runner__result php-runner__result--security-error"
      >

        <div class="php-runner__result-title">

          <i class="fa-solid fa-shield-halved"></i>

          Código no permitido

        </div>


        <p>
          El código contiene una operación que no está permitida
          en este entorno de prácticas.
        </p>


        <pre>{{ output }}</pre>

      </div>


      <!-- ===================================
           ERROR DEL SERVIDOR
           =================================== -->
      <div
          v-else-if="outputType === 'server-error'"
          class="php-runner__result php-runner__result--server-error"
      >

        <div class="php-runner__result-title">

          <i class="fa-solid fa-triangle-exclamation"></i>

          Error del servidor

        </div>


        <p>
          No ha sido posible ejecutar el código.
        </p>


        <pre>{{ output }}</pre>

      </div>


      <!-- ===================================
           TODAVÍA NO SE HA EJECUTADO
           =================================== -->
      <div
          v-else
          class="php-runner__output-empty"
      >

        Pulsa «Ejecutar» para ver el resultado.

      </div>

    </div>

  </div>

</template>


<style scoped>

/* ========================================
   COMPONENTE
   ======================================== */

.php-runner {
  margin: 1.5rem 0;

  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;

  overflow: hidden;

  background: var(--vp-c-bg-soft);
}


/* ========================================
   CABECERA
   ======================================== */

.php-runner__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.65rem 1rem;

  background: var(--vp-c-bg-alt);

  border-bottom: 1px solid var(--vp-c-divider);
}


.php-runner__title {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  font-weight: 600;
}


.php-runner__title i {
  font-size: 1.4rem;
}


.php-runner__filename {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;

  color: var(--vp-c-text-2);
}


.php-runner__description {
  margin-left: 0.75rem;
  padding-left: 0.75rem;

  border-left: 1px solid var(--vp-c-divider);

  color: var(--vp-c-text-2);

  font-size: 0.85rem;
  font-weight: 400;
  font-style: italic;
}


/* ========================================
   EDITOR
   ======================================== */

.php-runner__editor {
  background: var(--vp-code-block-bg);
}


/*
 * Se conserva esta clase por compatibilidad
 * con tu versión anterior del componente.
 */
.php-runner__textarea {
  display: block;

  width: 100%;
  min-height: 220px;

  padding: 1rem;

  border: 0;
  outline: none;

  resize: vertical;

  background: transparent;

  color: var(--vp-code-block-color);

  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  line-height: 1.7;

  tab-size: 4;
}


/* ========================================
   BOTONES DE ACCIÓN
   ======================================== */

.php-runner__actions {
  display: flex;

  gap: 0.75rem;

  padding: 0.75rem 1rem;

  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);

  background: var(--vp-c-bg-alt);
}


.php-runner__button {
  display: inline-flex;
  align-items: center;

  gap: 0.45rem;

  padding: 0.45rem 0.9rem;

  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;

  background: var(--vp-c-bg);

  color: var(--vp-c-text-1);

  font-size: 0.9rem;
  font-weight: 500;

  cursor: pointer;

  transition:
      background 0.2s,
      border-color 0.2s;
}


.php-runner__button:hover {
  background: var(--vp-c-bg-soft);

  border-color: var(--vp-c-brand-1);
}


.php-runner__button--run {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);

  color: white;
}


.php-runner__button--run:hover {
  background: var(--vp-c-brand-2);
}


.php-runner__button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}


/* ========================================
   SALIDA
   ======================================== */

.php-runner__output {
  background: var(--vp-c-bg);
}


.php-runner__output-header {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  padding: 0.6rem 1rem;

  font-size: 0.85rem;
  font-weight: 600;

  color: var(--vp-c-text-2);

  border-bottom: 1px solid var(--vp-c-divider);
}


.php-runner__output-content {
  margin: 0;

  padding: 1rem;

  min-height: 60px;

  overflow-x: auto;

  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.6;

  white-space: pre-wrap;
}


.php-runner__output-empty {
  padding: 1rem;

  min-height: 60px;

  color: var(--vp-c-text-3);

  font-size: 0.9rem;
  font-style: italic;
}


/* ========================================
   RESULTADOS
   ======================================== */

.php-runner__result {
  padding: 1rem;
}


.php-runner__result-title {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  margin-bottom: 0.5rem;

  font-weight: 600;
}


.php-runner__result p {
  margin: 0.5rem 0;
}


.php-runner__result pre {
  margin: 0.75rem 0 0;

  padding: 0.75rem;

  border-radius: 6px;

  background: var(--vp-code-block-bg);

  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;

  white-space: pre-wrap;
}


/* Colores según el resultado */

.php-runner__result--success .php-runner__result-title {
  color: var(--vp-c-green-1);
}


.php-runner__result--code-error .php-runner__result-title {
  color: var(--vp-c-danger-1);
}


.php-runner__result--security-error .php-runner__result-title {
  color: var(--vp-c-warning-1);
}


.php-runner__result--server-error .php-runner__result-title {
  color: var(--vp-c-danger-1);
}


/* ========================================
   SELECTOR TEXTO / HTML
   ======================================== */

.php-runner__view-selector {
  display: flex;

  gap: 0.25rem;

  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}


.php-runner__view-selector button {
  display: inline-flex;
  align-items: center;

  gap: 0.4rem;

  padding: 0.35rem 0.7rem;

  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;

  background: var(--vp-c-bg-soft);

  color: var(--vp-c-text-2);

  font-size: 0.8rem;

  cursor: pointer;

  transition:
      background 0.2s,
      color 0.2s,
      border-color 0.2s;
}


/* Botón al pasar el ratón */
.php-runner__view-selector button:hover {
  border-color: var(--vp-c-brand-1);

  color: var(--vp-c-brand-1);
}


/* Botón correspondiente a la vista seleccionada */
.php-runner__view-selector button.active {
  background: var(--vp-c-brand-1);

  border-color: var(--vp-c-brand-1);

  color: white;
}


/* ========================================
   PREVISUALIZACIÓN HTML
   ======================================== */

.php-runner__preview {
  display: block;

  width: 100%;
  min-height: 120px;

  margin-top: 0.75rem;

  padding: 0;

  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;

  /*
   * El iframe representa una página HTML independiente.
   * Utilizamos fondo blanco para aproximarnos al aspecto
   * normal de una página servida por el navegador.
   */
  background: white;
}


/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 640px) {

  .php-runner__header {
    padding: 0.6rem 0.75rem;
  }


  .php-runner__textarea {
    min-height: 180px;

    font-size: 0.85rem;
  }


  .php-runner__actions {
    padding: 0.65rem 0.75rem;
  }


  /*
   * En pantallas pequeñas permitimos que
   * Texto / HTML se adapten al espacio.
   */
  .php-runner__view-selector {
    flex-wrap: wrap;
  }

}

</style>