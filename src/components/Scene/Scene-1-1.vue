<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { onTick } from 'vue3-pixi'
import { isMobile } from 'pixi.js'

import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

function handleStart() {
  setTimeout(async () => {
    await gameStore.toggleGameMode(true)
    gameStore.nextTimeline({ id: 1 })
  }, 100)
}

const rotate = reactive({ x: 0, y: 305, scale: 0.3 })

let count = 0

onTick((delta) => {
  count += delta * 0.04
  rotate.scale = (75 + Math.sin(count) * 15) / 300
})

function onNext() {
  gameStore.nextTimeline({ id: 1 })
}

const titleText = reactive({ x: 0, y: 25, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const fullscreenText = reactive({ x: 0, y: 25, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 44, align: 'center', lineHeight: 54, fill: '#7F7F7F' } })
</script>

<template>
  <AppPopup v-if="!isLandscape" type="portrait" x="center" y="center" :zoom-factor="zoomFactor * 2" :show-button="false">
    <Container :x="titleText.x" :y="titleText.y">
      <Text :y="-300" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> WELCOME TO\n DATAVILLE </Text>
      <Text :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"> Where your online\n habits and choices\n will shape the kind\n of house you live\n in. Let's go! </Text>
      <Text v-if="!isMobile.apple.phone" :anchor="fullscreenText.anchor" :scale="fullscreenText.scale" :x="10" :y="330" :style="fullscreenText.style">Full screen</Text>
      <Text v-else :anchor="fullscreenText.anchor" :scale="fullscreenText.scale" :x="10" :y="330" :style="fullscreenText.style">Swipe up and rotate!</Text>
    </Container>
    <Sprite texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" cursor="pointer" @pointerdown="handleStart" />
  </AppPopup>
  <AppPopup v-else type="landscape" x="center" y="center" :zoom-factor="zoomFactor" @next="onNext">
    <Container :x="0" :y="20">
      <Text :y="-160" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> WELCOME TO DATAVILLE </Text>
      <Text :y="0" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"> Where your online habits and\n choices will shape the kind\n of house you live in. Let's go!</Text>
    </Container>
  </AppPopup>
</template>
