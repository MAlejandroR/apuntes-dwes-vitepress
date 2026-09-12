<script setup lang="ts">
defineProps({
  header: {
    type: String,
    required: true,
  },
  href: String,
  src: String,
  alt: String,
  color: {
    type: String,
    default: '#4f46e5',
  },
})
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="daws-card"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noreferrer' : undefined"
    :style="{ '--c': color }"
  >
    <span class="daws-card__title">{{ header }}</span>
    <div class="daws-card__body">
      <slot />
      <img v-if="src" :src="src" :alt="alt || header" />
    </div>
  </component>
</template>

<style scoped>
.daws-card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1rem 1.05rem 1.1rem;
  border-radius: 18px;
  text-decoration: none !important;
  color: inherit;
  background: #fff;
  border: 3px solid var(--c);
  box-shadow: 8px 8px 0 var(--c);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

a.daws-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 var(--c);
}

.daws-card__title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--c);
}

.daws-card__body {
  font-size: 0.92rem;
  line-height: 1.4;
  color: #334155;
}

.daws-card__body :deep(p) {
  margin: 0.2rem 0 0.55rem;
}

.daws-card__body img,
.daws-card__body :deep(img) {
  display: block;
  width: min(100%, 140px);
  height: auto;
  margin: 0.35rem auto 0;
  border-radius: 12px;
}
</style>
