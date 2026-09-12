<template>
  <section id="objetivos" class="obj">
    <p class="obj__kicker">Brújula del curso</p>
    <h2>Objetivo general</h2>
    <p class="obj__lead">
      <strong>Construir, comprender y desplegar una aplicación web real</strong>,
      Con código <strong>organizado</strong>, un entorno reproducible y un flujo de trabajo que permita
      <strong>desarrollarla, mantenerla y evolucionarla</strong>
    </p>

    <ul class="obj__list">
      <li v-for="item in items" :key="item.title" :style="{ '--c': item.color }">
        <span class="obj__mark" aria-hidden="true">★</span>
        <div>
          <strong>{{ item.title }}</strong>
          <p>{{ item.text }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const items = [
  {
    title: 'Entender el escenario',
    color: '#4f46e5',
    text: 'Cliente, servidor, HTTP, request y response. Qué pasa cuando alguien escribe tu URL en el navegador.',
  },
  {
    title: 'Hablar PHP',
    color: '#4F5B93',
    text: 'Sintaxis, datos, control de flujo y un poco de POO.' +
        ' El idioma del servidor.',
  },
  {
    title: 'Montar con Laravel',
    color: '#FF2D20',
    text: 'Rutas, controladores, Blade, Eloquent.' +
        ' Una app con estructura, no un archivo gigante.',
  },
  {
    title: 'Mismo entorno para todos',
    color: '#2496ED',
    text: 'Docker: que “en mi máquina sí” deje de ser una excusa.',
  },
  {
    title: 'No perder el trabajo',
    color: '#DE4C36',
    text: 'Git: commits, ramas y un remoto. El salvavidas del módulo (y de la vida).',
  },
  {
    title: 'IA con cabeza',
    color: '#d97706',
    text: 'Usarla para ir más rápido, no para no enterarte. Tú decides; la IA sugiere.',
  },
]
</script>

<style scoped>
.obj {
  max-width: 1100px;
  margin: 0 auto 3.5rem;
  padding: 0 1.2rem;
}

.obj__kicker {
  margin: 0 0 0.4rem;
  color: #d97706;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.obj h2 {
  margin: 0 0 0.6rem;
  font-size: 1.75rem;
  color: #1e1b4b;
}

.obj__lead {
  max-width: 46rem;
  margin: 0 0 1.4rem;
  font-size: 1.08rem;
  line-height: 1.55;
  color: #3f3f70;
}

.obj__list {
  list-style: none;
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  grid-template-columns: 1fr;
}

.obj__list li {
  display: flex;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: #fff;
  border: 2px solid color-mix(in srgb, var(--c) 45%, white);
  box-shadow: 6px 6px 0 color-mix(in srgb, var(--c) 22%, transparent);
}

.obj__mark {
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c);
  color: #fff;
  font-size: 1rem;
}

.obj__list strong {
  display: block;
  margin-bottom: 0.2rem;
  color: #1e1b4b;
}

.obj__list p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.45;
}

@media (min-width: 800px) {
  .obj__list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
