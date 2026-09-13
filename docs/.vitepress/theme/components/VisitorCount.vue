<template>
  <p v-if="goatCounter" class="visit-counter">
    👁 Visitas: <strong>{{ total || '…' }}</strong>
  </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchVisitCount, goatCounter } from '../../site'

const total = ref(__DAWS_VISIT_COUNT__)

onMounted(async () => {
  const live = await fetchVisitCount()
  if (live) total.value = live
  else if (!total.value) total.value = '—'
})
</script>

<style scoped>
.visit-counter {
  width: 100%;
  margin: 0;
  padding: 1.15rem 1rem 1.6rem;
  border-top: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg-alt);
  text-align: center;
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: 0.02em;
}

.visit-counter strong {
  font-variant-numeric: tabular-nums;
}
</style>
