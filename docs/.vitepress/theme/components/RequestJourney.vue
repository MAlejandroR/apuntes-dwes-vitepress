<template>
  <section id="viaje" class="viaje">
    <header class="viaje__header">
      <p class="viaje__kicker">El truco del módulo</p>
      <h2>Sigue el viaje de una petición</h2>
      <p class="viaje__lead">
        Alguien abre tu web. El navegador no “adivina” la página: manda una solicitud al
        servidor, el servidor con tecnologías como  PHP y Laravel lo cocinan, y vuelve una respuesta. Eso es DAWS.
      </p>
    </header>

    <div class="viaje__track" role="list">
      <div
        v-for="(stop, index) in stops"
        :key="stop.id"
        class="viaje__stop-wrap"
        role="listitem"
      >
        <button
          type="button"
          class="viaje__stop"
          :class="{ 'is-active': active === index, 'is-visited': index < active }"
          :style="{ '--stop': stop.color }"
          :aria-pressed="active === index"
          @click="select(index)"
        >
          <span class="viaje__badge">{{ index + 1 }}</span>
          <span class="viaje__name">{{ stop.label }}</span>
          <span class="viaje__hint">{{ stop.hint }}</span>
        </button>
        <span v-if="index < stops.length - 1" class="viaje__arrow" aria-hidden="true">
          →
        </span>
      </div>
    </div>

    <aside class="viaje__card" :style="{ borderColor: current.color }">
      <p class="viaje__step">Parada {{ active + 1 }} de {{ stops.length }}</p>
      <h3>{{ current.label }}</h3>
      <p>{{ current.story }}</p>
      <a class="viaje__link" :href="current.href" target="_blank" rel="noreferrer">
        Web oficial · {{ current.hrefLabel }}
      </a>
      <div class="viaje__actions">
        <button type="button" class="viaje__replay" @click="play">
          {{ playing ? 'Viajando…' : '¡Otra vez el viaje!' }}
        </button>
      </div>
    </aside>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const stops = [
  {
    id: 'browser',
    label: 'Navegador',
    hint: 'Tú pulsas Enter',
    color: '#4f46e5',
    href: 'https://developer.mozilla.org/es/docs/Learn_web_development/Getting_started/Your_first_website',
    hrefLabel: 'MDN',
    story:
      'El cliente (Chrome, Firefox, el móvil…) pide un recurso. Es la solicitud y aquí empieza el proceso. Sin esta petición, el servidor no se entera de nada.',
  },
  {
    id: 'http',
    label: 'HTTP',
    hint: 'GET /hola',
    color: '#0891b2',
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP',
    hrefLabel: 'MDN · HTTP',
    story:
      'La solicitud con un protocolo (HTTP/HTTPS): método, ruta, cabeceras. Request / Response. El idioma de la web.',
  },
  {
    id: 'servidor',
    label: 'Servidor (Apache)',
    hint: 'La solicitud se procesa',
    color: '#4F5B93',
    href: 'https://httpd.apache.org/docs/current/es/',
    hrefLabel: 'apache.com',
    story:
      'PHP es el lenguaje que corre detrás. No lo ve el visitante: genera HTML, habla con la base de datos, decide qué devolver.',
  },
  {
    id: 'php',
    label: 'PHP',
    hint: 'Se ejecuta en el servidor',
    color: '#4F5B93',
    href: 'https://www.php.net/manual/es/',
    hrefLabel: 'php.net',
    story:
      'PHP es el lenguaje (Tecnología) que corre detrás. No lo ve el visitante: genera HTML, habla con la base de datos, Con otras Webs (Servicios). decide qué devolver.',
  },
  {
    id: 'laravel',
    label: 'Laravel',
    hint: 'Rutas, controladores, vistas',
    color: '#FF2D20',
    href: 'https://laravel.com/docs',
    hrefLabel: 'laravel.com',
    story:
      'Laravel (Un marco de trabajo de php) pone orden: rutas, MVC, Eloquent, Blade. Dejas de pelearte con PHP “a pelo” y montas una app de verdad.',
  },
  {
    id: 'respuesta',
    label: 'Respuesta',
    hint: 'HTML de vuelta',
    color: '#16a34a',
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status',
    hrefLabel: 'MDN · códigos',
    story:
      '200 OK, un HTML, una cookie, un JSON… El navegador pinta. Has cerrado el círculo cliente–servidor.',
  },
]

const active = ref(0)
const playing = ref(false)
let timer = 0

const current = computed(() => stops[active.value])

function select(index) {
  stopPlay()
  active.value = index
}

function play() {
  stopPlay()
  playing.value = true
  active.value = 0
  timer = window.setInterval(() => {
    if (active.value >= stops.length - 1) {
      stopPlay()
      return
    }
    active.value += 1
  }, 2100)
}

function stopPlay() {
  playing.value = false
  if (timer) {
    window.clearInterval(timer)
    timer = 0
  }
}

onMounted(() => {
  play()
})

onUnmounted(() => {
  stopPlay()
})
</script>

<style scoped>
.viaje {
  position: relative;
  max-width: 1100px;
  margin: 0 auto 4rem;
  padding: 2.2rem 1.4rem 2.4rem;
  border-radius: 28px;
  background:
    radial-gradient(1200px 280px at 10% -10%, #ffe08a 0%, transparent 55%),
    radial-gradient(900px 260px at 110% 0%, #ffb4a8 0%, transparent 50%),
    linear-gradient(180deg, #fff7ed 0%, #eef2ff 100%);
  overflow: hidden;
}

.viaje__header {
  text-align: center;
  margin-bottom: 1.6rem;
}

.viaje__kicker {
  display: inline-block;
  margin: 0 0 0.5rem;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  background: #ff2d20;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.viaje__header h2 {
  margin: 0 0 0.6rem;
  font-size: 1.85rem;
  line-height: 1.2;
  color: #1e1b4b;
}

.viaje__lead {
  max-width: 42rem;
  margin: 0 auto;
  color: #3f3f70;
  font-size: 1.05rem;
  line-height: 1.55;
}

.viaje__track {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 0.4rem 0.2rem;
  margin-bottom: 1.4rem;
}

.viaje__stop-wrap {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.viaje__stop {
  width: 9.4rem;
  min-height: 7.2rem;
  padding: 0.75rem 0.6rem 0.85rem;
  border: 3px solid var(--stop);
  border-radius: 18px;
  background: #fff;
  color: inherit;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.viaje__stop:hover,
.viaje__stop.is-active {
  transform: translateY(-4px);
  background: color-mix(in srgb, var(--stop) 14%, white);
  box-shadow: 0 10px 0 color-mix(in srgb, var(--stop) 35%, transparent);
}

.viaje__badge {
  display: inline-flex;
  width: 1.6rem;
  height: 1.6rem;
  margin-bottom: 0.35rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--stop);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
}

.viaje__name {
  display: block;
  font-weight: 800;
  font-size: 1.02rem;
  color: #1e1b4b;
}

.viaje__hint {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.78rem;
  color: #5b5b80;
}

.viaje__arrow {
  color: #fb7185;
  font-weight: 800;
  font-size: 1.2rem;
  padding: 0 0.15rem;
}

.viaje__packet {
  display: none;
}

.viaje__card {
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.15rem 1.3rem 1.25rem;
  border: 3px solid #4f46e5;
  border-radius: 18px;
  background: #fff;
}

.viaje__step {
  margin: 0 0 0.2rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.viaje__card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.25rem;
  color: #1e1b4b;
}

.viaje__card p {
  margin: 0 0 0.8rem;
  color: #334155;
  line-height: 1.5;
}

.viaje__link {
  display: inline-flex;
  margin-bottom: 0.9rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #1e1b4b;
  color: #fff !important;
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
}

.viaje__link:hover {
  filter: brightness(1.15);
}

.viaje__replay {
  border: 0;
  border-radius: 999px;
  padding: 0.55rem 1rem;
  background: linear-gradient(90deg, #ff2d20, #f59e0b);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}

.viaje__replay:hover {
  filter: brightness(1.08);
}

@media (min-width: 900px) {
  .viaje__stop {
    width: 10.2rem;
  }
}
</style>
