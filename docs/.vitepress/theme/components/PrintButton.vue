<script setup lang="ts">
function imprimir() {
  window.print()
}
</script>

<template>
  <button
    type="button"
    class="daws-print-btn"
    title="Imprimir o guardar como PDF"
    @click="imprimir"
  >
    Ver PDF
  </button>
</template>
