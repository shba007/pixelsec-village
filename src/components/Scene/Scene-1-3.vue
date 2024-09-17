<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextTimeline({ id: 3 })
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: 50, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" @next="handleMove">
    <Container :x="titleText.x" :y="titleText.y">
      <Text :y="-190" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> LET THE ADVENTURE BEGIN </Text>
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale">Excited to find out which house you\nwill arrive in? Answer the questions\nto determine your result. </Text>
    </Container>
  </AppPopup>
</template>
