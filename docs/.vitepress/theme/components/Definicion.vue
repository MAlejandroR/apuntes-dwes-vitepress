<!-- components/Objetivos.vue -->

<!--<template>-->
<!--  <div class="objetivos">-->
<!--    <div class="kicker">OBJETIVOS</div>-->
<!--    <div v-if="title" class="title">{{ title }}</div>-->

<!--    <div class="body">-->
<!--      <slot />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--defineProps<{-->
<!--  title?: string-->
<!--}>()-->
<!--</script>-->

<!--<style scoped>-->
<!--.objetivos {-->
<!--  margin: 1rem 0;-->
<!--  padding: 1.3rem 1.5rem;-->
<!--  border-left: 5px solid #d97706;-->
<!--  border-radius: 10px;-->
<!--  background: rgba(217, 119, 6, 0.08);-->
<!--}-->

<!--.kicker {-->
<!--  font-size: .75rem;-->
<!--  font-weight: 700;-->
<!--  letter-spacing: .1em;-->
<!--  color: #d97706;-->
<!--}-->

<!--.title {-->
<!--  margin-top: .2rem;-->
<!--  font-size: 1.25rem;-->
<!--  font-weight: 700;-->
<!--}-->

<!--.body {-->
<!--  margin-top: .7rem;-->
<!--}-->
<!--</style>-->
<!-- components/Objetivos.vue -->

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