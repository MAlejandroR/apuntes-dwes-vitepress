<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import {onContentUpdated, useRoute, withBase} from 'vitepress'
import {onMounted, ref, watch} from 'vue'
import PrintButton from './components/PrintButton.vue'
import VisitorCount from './components/VisitorCount.vue';
import {getFavicon} from "./favicon";

const {Layout} = DefaultTheme
const open = ref(false)
const fullSrc = ref('')
const fullAlt = ref('')
const route = useRoute();

function markImages() {
  document.querySelectorAll<HTMLImageElement>('.vp-doc img').forEach((img) => {
    if (img.closest('.daws-card')) return
    img.classList.add('daws-zoomable')
  })
}
function updateFavicon(path: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')

  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }

  link.href = withBase(getFavicon(path));
}
watch(
    () => route.path,
    (newPath) => {
      updateFavicon(newPath)
    }
)

onContentUpdated(markImages)

onMounted(() => {
  updateFavicon(route.path)

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
      <PrintButton/>
    </template>
    <template #layout-bottom>
      <VisitorCount/>
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
      <img :src="fullSrc" :alt="fullAlt"/>
    </div>
  </Teleport>
</template>
