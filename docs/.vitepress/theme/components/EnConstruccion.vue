<template>
  <div class="under-construction">
    <div class="under-construction__image">
      <img
          v-if="image"
          :src="image"
          :alt="title"
      />

      <div v-else class="under-construction__icon">
        🚧
      </div>
    </div>

    <div class="under-construction__content">
      <span class="under-construction__badge">
        En construcción
      </span>

      <h1>{{ title }}</h1>

      <p class="under-construction__message">
        <slot>
          Este contenido está pendiente de desarrollo.
          Estará disponible próximamente.
        </slot>
      </p>

      <div class="under-construction__line"></div>

      <p class="under-construction__footer">
        DAWS · Desarrollo de Aplicaciones Web en Entorno Servidor
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  image?: string
}>()
</script>

<style scoped>
.under-construction {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 2rem auto;
  padding: 2rem;

  text-align: center;
}

.under-construction__image {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 2rem;
}

.under-construction__image img {
  max-width: 380px;
  max-height: 240px;
  object-fit: contain;

  border-radius: 14px;
}

.under-construction__icon {
  font-size: 6rem;
}

.under-construction__content {
  max-width: 650px;
}

.under-construction__badge {
  display: inline-block;

  padding: 0.35rem 0.9rem;
  margin-bottom: 1rem;

  border: 1px solid var(--vp-c-warning-1);
  border-radius: 999px;

  color: var(--vp-c-warning-1);

  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.under-construction h1 {
  margin: 0 0 1rem;

  border: 0;

  font-size: 2.2rem;
  line-height: 1.2;
}

.under-construction__message {
  margin: 0 auto;

  color: var(--vp-c-text-2);

  font-size: 1.1rem;
  line-height: 1.7;
}

.under-construction__line {
  width: 80px;
  height: 3px;

  margin: 2rem auto 1rem;

  border-radius: 2px;

  background: var(--vp-c-brand-1);
}

.under-construction__footer {
  color: var(--vp-c-text-3);

  font-size: 0.85rem;
}

@media (max-width: 640px) {
  .under-construction {
    padding: 1rem;
  }

  .under-construction__image img {
    max-width: 100%;
  }

  .under-construction h1 {
    font-size: 1.8rem;
  }
}
</style>