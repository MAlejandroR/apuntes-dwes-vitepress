<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'marca',
  },
})
</script>

<template>
  <strong :class="['daws-color', color]">
    <slot />
  </strong>
</template>

<style scoped>
.daws-color {
  font-weight: 800;
}

.marca {
  color: #4f46e5;
}

.verde {
  color: #16a34a;
}

.azul {
  color: #2496ed;
}

.rojo {
  color: #ff2d20;
}

.naranja {
  color: #d97706;
}
</style>
