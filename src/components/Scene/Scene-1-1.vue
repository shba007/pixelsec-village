<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { External } from 'vue3-pixi'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import { onTick } from 'vue3-pixi'
import { reactive } from 'vue'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)
const toggle = ref(true)

const modal = computed(() => ({
  image: isLandscape.value ? 'popupScene01Landscape' : toggle.value ? 'popupBgPortrait' : 'popupScene01Portrait',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: (isLandscape.value ? 0.9 : 1.8) * zoomFactor.value },
}))

function handleStart() {
  setTimeout(async () => {
    await gameStore.toggleGameMode(true)
    gameStore.nextTimeline({ id: 1 })
  }, 100)
}

onMounted(() => {
  if (isLandscape.value) useTimeoutFn(handleStart, 7000)
  gameStore.playSFXSound('dialogBox')
})

watch(isLandscape, (value) => {
  if (value) useTimeoutFn(handleStart, 7000)
})

const rotate = reactive({ x: 0, y: 305, scale: 0.3 })

let count = 0

onTick((delta) => {
  count += delta * 0.04
  rotate.scale = (75 + Math.sin(count) * 15) / 300
})

const titleText = reactive({ x: -10, y: 25, anchor: 0.5, style: { fontFamily: 'LAN', fontSize: 58, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const fullscreenText = reactive({ x: -10, y: 25, anchor: 0.5, style: { fontFamily: 'INET', fontSize: 40, align: 'center', lineHeight: 32, fill: '#7F7F7F' } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.25" />
    <Container v-if="toggle && !isLandscape" :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :y="-300" :style="titleText.style">WELCOME TO\n DATAVILLE</Text>
      <Text :anchor="titleText.anchor" :style="titleText.style"> Where your online\n habits and choices\n will shape the kind\n of house you live\n in. Let's go! </Text>
      <Text :anchor="fullscreenText.anchor" :x="10" :y="330" :style="fullscreenText.style">Full screen</Text>
    </Container>
    <Sprite v-if="!isLandscape" texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" cursor="pointer" @pointerdown="handleStart" />
  </Container>
  <!--  <External>
    <div class="fixed bottom-0 left-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="fullscreenText.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="fullscreenText.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="fullscreenText.style.fontSize" type="number" min="0" max="120" step="4" />
        <input v-model="fullscreenText.style.lineHeight" type="number" min="0" max="120" step="4" />
      </div>
      <div class="fixed right-0 bottom-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <button @click="toggle = !toggle">Toggle {{ toggle }}</button>
      </div>
    </div>
  </External> -->
</template>
