<template>
  <a
      :href="href"
      class="slides-button"
      target="_blank"
  >
    🎬 Ver diapositivas
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.slides-button {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 600;
  text-decoration: none;
}

.slides-button:hover {
  background: var(--vp-c-brand-2);
}
</style>