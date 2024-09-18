<script setup lang="ts">
import { reactive } from 'vue'

import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

function onNext() {
  gameStore.nextTimeline({ id: 26 })
}

const titleText = reactive({ x: 0, y: -5, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" @next="onNext">
    <Text :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">What annoys you most\nabout data sharing?</Text>
  </AppPopup>
</template>
