
<script setup>
const tools = [
  {
    name: 'PHP',
    short: 'php.net',
    href: 'https://www.php.net/manual/es/',
    color: '#4F5B93',
    why: 'Manual, tipos, funciones. La biblia del lenguaje.',
  },
  {
    name: 'Laravel',
    short: 'laravel.com/docs',
    href: 'https://laravel.com/docs',
    color: '#FF2D20',
    why: 'Rutas, Eloquent, Blade, artisan. Versión a versión.',
  },
  {
    name: 'Docker',
    short: 'docs.docker.com',
    href: 'https://docs.docker.com/get-started/',
    color: '#2496ED',
    why: 'Imágenes, contenedores y Compose. El laboratorio portátil.',
  },
  {
    name: 'Git',
    short: 'git-scm.com',
    href: 'https://git-scm.com/doc',
    color: '#DE4C36',
    why: 'Commit, rama, merge. El libro oficial es corto y bueno.',
  },
  {
    name: 'HTTP',
    short: 'MDN',
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP',
    color: '#0891b2',
    why: 'Métodos, cabeceras, códigos. Cómo habla el navegador.',
  },
  {
    name: 'Composer',
    short: 'getcomposer.org',
    href: 'https://getcomposer.org/doc/',
    color: '#885630',
    why: 'Dependencias de PHP. Laravel llega montado encima.',
  },
]
</script>
<template>
  <section class="stack">
    <p class="stack__kicker">No te lo inventes</p>
    <h2>Las webs oficiales, a un clic</h2>
    <p class="stack__lead">
      En clase usamos estas fuentes. Si dudas, primero la documentación oficial:
      es más aburrida que un tutorial random… y mucho más cierta.
    </p>

    <div class="stack__grid">
      <a
          v-for="tool in tools"
          :key="tool.name"
          class="stack__card"
          :href="tool.href"
          target="_blank"
          rel="noreferrer"
          :style="{ '--c': tool.color }"
      >
        <span class="stack__name">{{ tool.name }}</span>
        <span class="stack__url">{{ tool.short }}</span>
        <span class="stack__why">{{ tool.why }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.stack {
  max-width: 1100px;
  margin: 0 auto 3.5rem;
  padding: 0 1.2rem 1rem;
}

.stack__kicker {
  margin: 0 0 0.4rem;
  color: #2496ed;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stack h2 {
  margin: 0 0 0.55rem;
  font-size: 1.75rem;
  color: #1e1b4b;
}

.stack__lead {
  max-width: 42rem;
  margin: 0 0 1.3rem;
  color: #3f3f70;
  line-height: 1.5;
}

.stack__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.stack__card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.1rem 1.15rem 1.2rem;
  border-radius: 18px;
  text-decoration: none !important;
  color: inherit;
  background: #fff;
  border: 3px solid var(--c);
  box-shadow: 8px 8px 0 var(--c);
  transition: transform 0.15s ease;
}

.stack__card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 var(--c);
}

.stack__name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--c);
}

.stack__url {
  font-size: 0.82rem;
  font-weight: 700;
  color: #64748b;
}

.stack__why {
  margin-top: 0.35rem;
  font-size: 0.92rem;
  color: #334155;
  line-height: 1.4;
}

@media (min-width: 700px) {
  .stack__grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
