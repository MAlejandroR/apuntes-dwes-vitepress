<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onContentUpdated } from 'vitepress'
import { onMounted, ref } from 'vue'
import PrintButton from './components/PrintButton.vue'

const { Layout } = DefaultTheme
const open = ref(false)
const fullSrc = ref('')
const fullAlt = ref('')

function markImages() {
  document.querySelectorAll<HTMLImageElement>('.vp-doc img').forEach((img) => {
    if (img.closest('.daws-card')) return
    img.classList.add('daws-zoomable')
  })
}

onContentUpdated(markImages)

onMounted(() => {
  markImages()
  document.addEventListener('click', (event) => {
    const img = (event.target as HTMLElement | null)?.closest?.(
      '.vp-doc img.daws-zoomable',
    ) as HTMLImageElement | null
    if (!img) return
    fullSrc.value = img.currentSrc || img.src
    fullAlt.value = img.alt || ''
    open.value = true
  })
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <PrintButton />
    </template>
  </Layout>
  <Teleport to="body">
    <div
      v-if="open"
      class="daws-lightbox"
      role="dialog"
      aria-modal="true"
      @click="open = false"
    >
      <img :src="fullSrc" :alt="fullAlt" />
    </div>
  </Teleport>
</template>
