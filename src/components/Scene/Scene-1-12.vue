<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: 30, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="slim" x="center" y="bottom" :zoom-factor="zoomFactor" :show-button="false">
    <Container :x="titleText.x" :y="titleText.y">
      <Text :x="0" :y="-110" :scale="titleText.scale" :anchor="titleText.anchor" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }">IT'S TIME TO HEAD HOME</Text>
      <Text :scale="titleText.scale" :anchor="titleText.anchor" :style="titleText.style">Please wait while we put on the \nfinishing touches to your house.</Text>
    </Container>
  </AppPopup>
</template>
