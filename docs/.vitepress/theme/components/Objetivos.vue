
<template>
  <div class="objetivos">
    <div class="objetivos-header">
      <i :class="icon"></i>
      <span>Objetivos</span>
    </div>

    <div class="objetivos-content">
      <div class="objetivos-title">
        {{ title }}
      </div>
      <div class="objetivos-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  icon?: string
}>(), {
  title: "Qué veremos aquí",
  icon: "fa-solid fa-circle-check"
})
</script>

<style scoped>

.objetivos {
  margin: 1.5rem 0;
  border: 2px solid #15803d;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 7px 7px 0 #16a34a;
}
.objetivos-header {
  display: flex;
  align-items: center;
  gap: .6rem;

  padding: .65rem 1rem;

  background: #15803d;
  color: white;

  font-size: 1.5rem;
  font-weight: 700;
}

.objetivos-header i {
  font-size: 1.1rem;
}

.objetivos-content {
  padding: 1rem 1.25rem;
  background: rgba(22, 163, 74, 0.07);
}

.objetivos-title {
  padding-bottom: .6rem;
  margin-bottom: .7rem;

  border-bottom: 2px solid rgba(22, 163, 74, 0.25);

  font-size: 2rem;
  font-weight: 800;

}

.objetivos-body {
  font-size: 1.5rem;
  color: #166534;
}

.objetivos-body :deep(ul) {
  margin: .4rem 0 0;
  padding-left: 1.4rem;
}

.objetivos-body :deep(li) {
  margin: .35rem 0;
}
</style>