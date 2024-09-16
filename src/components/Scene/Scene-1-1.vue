<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  zoomFactor: number
}>()
const zoomFactor = computed(() => screenHeight.value / 720)

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => ({
  image: isLandscape.value ? 'popupBgLandscape' : 'popupBgPortrait',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: (isLandscape.value ? 1.0 : 0.55) * zoomFactor.value },
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

const titleText = reactive({ x: 0, y: 25, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 54 * 4, align: 'center', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
const fullscreenText = reactive({ x: 0, y: 25, anchor: 0.5, scale: 0.25, style: { fontFamily: 'INET', fontSize: 44 * 4, align: 'center', lineHeight: 36 * 4, fill: '#7F7F7F' } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <template v-if="!isLandscape">
      <Container :x="titleText.x" :y="titleText.y">
        <Text :y="-300" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> WELCOME TO\n DATAVILLE </Text>
        <Text :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"> Where your online\n habits and choices\n will shape the kind\n of house you live\n in. Let's go! </Text>
        <Text :anchor="fullscreenText.anchor" :scale="fullscreenText.scale" :x="10" :y="330" :style="fullscreenText.style">Full screen</Text>
      </Container>
      <Sprite texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" cursor="pointer" @pointerdown="handleStart" />
    </template>
    <template v-else>
      <Container :x="0" :y="20">
        <Text :y="-160" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> WELCOME TO DATAVILLE </Text>
        <Text :y="0" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"> Where your online habits and\n choices will shape the kind\n of house you live in. Let's go!</Text>
      </Container>
    </template>
  </Container>
</template>
