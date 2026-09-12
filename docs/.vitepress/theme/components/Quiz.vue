<script setup lang="ts">
import { computed, ref } from 'vue'

export type QuizOption = {
  text: string
  correct: boolean
  why: string
}

const props = defineProps<{
  title: string
  options: QuizOption[]
}>()

const picked = ref<number | null>(null)

const current = computed(() =>
  picked.value === null ? null : props.options[picked.value],
)
</script>

<template>
  <div class="daws-quiz">
    <p class="daws-quiz__kicker">Pregunta</p>
    <h3>{{ title }}</h3>
    <div class="daws-quiz__options" role="list">
      <button
        v-for="(option, index) in options"
        :key="option.text"
        type="button"
        class="daws-quiz__option"
        :class="{
          'is-picked': picked === index,
          'is-right': picked === index && option.correct,
          'is-wrong': picked === index && !option.correct,
        }"
        @click="picked = index"
      >
        <span class="daws-quiz__letter">{{ String.fromCharCode(65 + index) }}</span>
        <span>{{ option.text }}</span>
      </button>
    </div>
    <p v-if="current" class="daws-quiz__why" :class="{ ok: current.correct }">
      {{ current.correct ? 'Correcto.' : 'No exactamente.' }}
      {{ current.why }}
    </p>
  </div>
</template>

<style scoped>
.daws-quiz {
  margin: 1.4rem 0 2rem;
  padding: 1.05rem 1.15rem 1.2rem;
  border-radius: 20px;
  background: #fff;
  border: 3px solid #e11d48;
  box-shadow: 8px 8px 0 #e11d48;
}

.daws-quiz__kicker {
  margin: 0 0 0.2rem;
  color: #e11d48;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.daws-quiz h3 {
  margin: 0 0 0.9rem;
  color: #1e1b4b;
  font-size: 1.15rem;
  border: 0;
}

.daws-quiz__options {
  display: grid;
  gap: 0.65rem;
}

.daws-quiz__option {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 2px solid #fecdd3;
  border-radius: 14px;
  background: #fff;
  color: #1e1b4b;
  text-align: left;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.daws-quiz__option:hover,
.daws-quiz__option.is-picked {
  border-color: #e11d48;
}

.daws-quiz__option.is-right {
  background: color-mix(in srgb, #16a34a 12%, white);
  border-color: #16a34a;
}

.daws-quiz__option.is-wrong {
  background: color-mix(in srgb, #e11d48 10%, white);
}

.daws-quiz__letter {
  flex: 0 0 auto;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e11d48;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
}

.daws-quiz__why {
  margin: 0.9rem 0 0;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  background: color-mix(in srgb, #e11d48 10%, white);
  color: #9f1239;
  font-weight: 600;
  line-height: 1.45;
}

.daws-quiz__why.ok {
  background: color-mix(in srgb, #16a34a 12%, white);
  color: #14532d;
}
</style>
