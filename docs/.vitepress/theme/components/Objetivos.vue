<!-- components/Objetivos.vue -->

<template>
  <div class="objetivos">
    <div class="kicker">OBJETIVOS</div>
    <div v-if="title" class="title">{{ title }}</div>

    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.objetivos {
  margin: 1rem 0;
  padding: 1.3rem 1.5rem;
  border-left: 5px solid #d97706;
  border-radius: 10px;
  background: rgba(217, 119, 6, 0.08);
}

.kicker {
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .1em;
  color: #d97706;
}

.title {
  margin-top: .2rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.body {
  margin-top: .7rem;
}
</style>