<template>
  <div class="daws-cmds">
    <slot />
  </div>
</template>

<style scoped>
.daws-cmds {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 1fr;
  margin: 1rem 0 1.4rem;
}

@media (min-width: 900px) {
  .daws-cmds {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
