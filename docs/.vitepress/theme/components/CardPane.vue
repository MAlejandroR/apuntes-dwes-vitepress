<template>
  <div class="daws-cards">
    <slot />
  </div>
</template>

<style scoped>
.daws-cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 1.2rem 0 0.4rem;
}

@media (min-width: 640px) {
  .daws-cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 960px) {
  .daws-cards {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
