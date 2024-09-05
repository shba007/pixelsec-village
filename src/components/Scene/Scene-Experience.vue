<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useTimeout, useWindowSize } from '@vueuse/core'
import { onTick } from 'vue3-pixi'
import { isMobile } from 'pixi.js'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const pwaInstalled = ref(false)
const installPromptEvent = ref<Event | null>(null)

function checkIfInstalled() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    pwaInstalled.value = true
  }
}

function handleBeforeInstallPrompt(event: Event) {
  event.preventDefault()
  installPromptEvent.value = event
}

async function handleAppInstalled() {
  console.log('PWA installed')
  pwaInstalled.value = true

  if (!installPromptEvent.value) {
    return
  }
  // @ts-ignore
  const result = await installPromptEvent.value.prompt()
  console.log(`Install prompt was: ${result.outcome}`)
  installPromptEvent.value = null
}

onMounted(() => {
  checkIfInstalled()

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})

const modal = computed(() => ({
  image: !pwaInstalled.value ? 'popupSceneInstall' : 'popupSceneRotate',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1.8 * zoomFactor.value },
}))

async function handleRotate() {
  await gameStore.toggleGameMode(true)
}

async function onClick() {
  if (!pwaInstalled.value) handleAppInstalled()
  else await handleRotate()
}

const ready = useTimeout(250)
const rotate = reactive({ x: 0, y: 305, scale: 0.3 })
let count = 0

onTick((delta) => {
  count += delta * 0.04
  rotate.scale = (75 + Math.sin(count) * 15) / 300
})
</script>

<template>
  <Container v-if="ready" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite texture="popupSceneRotateOverlay" :anchor="0.5" :scale="10" />
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" cursor="pointer"
      @pointerdown="onClick" />
    <Sprite texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" />
  </Container>
</template>
