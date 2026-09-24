<script setup lang="ts">
import { computed } from 'vue'
import Color from './Color.vue'

const props = defineProps<{
  name: string
  mne?: string
  example?: string
  pkg?: string
  need?: string
  wide?: boolean
}>()

type Part = { text: string; hit: boolean }

const parts = computed((): Part[] => {
  const raw = props.mne?.trim() ?? ''
  if (!raw) return []
  if (!raw.includes('*')) return [{ text: raw, hit: false }]
  return raw.split('*').flatMap((text, i) => {
    if (!text) return []
    return [{ text, hit: i % 2 === 1 }]
  })
})
</script>

<template>
  <article class="cmd" :class="{ 'cmd--wide': wide }">
    <header class="cmd__head">
      <code class="cmd__name">{{ name }}</code>
      <p v-if="parts.length" class="cmd__mne">
        <span class="cmd__arrow" aria-hidden="true">→</span>
        <template v-for="(part, i) in parts" :key="i">
          <Color v-if="part.hit">{{ part.text }}</Color><template v-else>{{ part.text }}</template>
        </template>
      </p>
    </header>

    <p v-if="pkg" class="cmd__pkg">
      Hay que instalarlo:
      <code>sudo apt install {{ pkg }}</code>
    </p>
    <p v-else-if="need" class="cmd__pkg">{{ need }}</p>

    <div class="cmd__body">
      <slot />
    </div>

    <p v-if="example" class="cmd__ex">
      <span class="cmd__prompt" aria-hidden="true">$</span>
      <code>{{ example }}</code>
    </p>
  </article>
</template>

<style scoped>
.cmd {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem 0.95rem 0.9rem;
  border-radius: 16px;
  background: #fff;
  border: 3px solid #0f766e;
  box-shadow: 6px 6px 0 #0f766e;
  break-inside: avoid;
}
.cmd__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.55rem;
}

.cmd__name {
  font-size: 1.12rem;
  font-weight: 800;
  color: #0f766e;
  background: transparent;
  padding: 0;
}

.cmd__mne {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 600;
  color: #334155;
  line-height: 1.35;
}

.cmd__arrow {
  margin-right: 0.2rem;
  color: #0f766e;
  font-weight: 800;
}

.cmd__pkg {
  margin: 0;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  background: color-mix(in srgb, #d97706 12%, white);
  color: #92400e;
  font-size: 0.82rem;
  font-weight: 650;
  line-height: 1.35;
}

.cmd__pkg code {
  font-size: 0.8rem;
  font-weight: 750;
}

.cmd__body {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #334155;
}

.cmd__body :deep(p) {
  margin: 0.15rem 0 0.35rem;
}

.cmd__body :deep(p:last-child),
.cmd__body :deep(ul:last-child) {
  margin-bottom: 0;
}

.cmd__body :deep(ul) {
  margin: 0.15rem 0 0;
  padding-left: 1.1rem;
}

.cmd__body :deep(li) {
  margin: 0.12rem 0;
}

.cmd__ex {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  margin: 0.15rem 0 0;
  padding: 0.45rem 0.65rem;
  border-radius: 10px;
  background: #0f172a;
  color: #86efac;
  overflow-x: auto;
}

.cmd__prompt {
  flex: none;
  color: #5eead4;
  font-weight: 800;
}

.cmd__ex code {
  font-size: 0.82rem;
  font-weight: 650;
  color: #86efac;
  background: transparent;
  padding: 0;
  white-space: nowrap;
}

.dark .cmd {
  background: var(--vp-c-bg-soft);
}

.dark .cmd__pkg {
  background: color-mix(in srgb, #d97706 18%, var(--vp-c-bg-soft));
}
.cmd--wide {
  grid-column: 1 / -1;
  padding: 1.05rem 1.2rem 1.15rem;
}
@media (min-width: 720px) {
  .cmd--wide {
    display: grid;
    grid-template-columns: minmax(8rem, 14rem) 1fr;
    column-gap: 1.25rem;
    row-gap: 0.35rem;
    align-items: start;
  }
  .cmd--wide .cmd__head {
    grid-column: 1;
    grid-row: 1 / 4;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  .cmd--wide .cmd__name {
    font-size: 1.45rem;
  }
  .cmd--wide .cmd__arrow {
    display: none;
  }
  .cmd--wide .cmd__pkg,
  .cmd--wide .cmd__body,
  .cmd--wide .cmd__ex {
    grid-column: 2;
  }
}
</style>
