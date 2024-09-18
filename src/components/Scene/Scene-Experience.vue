<script setup lang="ts">
import { computed, reactive } from 'vue'
import { isMobile } from 'pixi.js'
import { onTick } from 'vue3-pixi'

import { useTimeout, useWindowSize } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const gameStore = useGameStore()

function handleStart() {
  setTimeout(async () => {
    await gameStore.toggleGameMode(true)
  }, 100)
}

const ready = useTimeout(250)
const rotate = reactive({ x: 0, y: 305, scale: 0.3 })

let count = 0

onTick((delta) => {
  count += delta * 0.04
  rotate.scale = (75 + Math.sin(count) * 15) / 300
})

const titleText = reactive({ x: 0, y: 25, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const fullscreenText = reactive({ x: 0, y: 25, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 44, align: 'center', lineHeight: 54, fill: '#7F7F7F' } })
</script>

<template>
  <AppPopup v-if="ready" type="portrait" x="center" y="center" :zoom-factor="zoomFactor * 2" :show-button="false">
    <Sprite texture="popupSceneRotateOverlay" :anchor="0.5" :scale="10" />
    <Container :x="titleText.x" :y="titleText.y">
      <Text :y="-300" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> FOR BEST\nVIEWING\nEXPERIENCE </Text>
      <Text :y="-80" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"> Rotate your\nscreen to\ncontinue </Text>
      <Text v-if="!isMobile.apple.phone" :anchor="fullscreenText.anchor" :scale="fullscreenText.scale" :x="10" :y="330" :style="fullscreenText.style">Full screen</Text>
      <Text v-else :anchor="fullscreenText.anchor" :scale="fullscreenText.scale" :x="10" :y="330" :style="fullscreenText.style">Swipe up and rotate!</Text>
    </Container>
    <Sprite texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" cursor="pointer" @pointerdown="handleStart" />
  </AppPopup>
</template>
