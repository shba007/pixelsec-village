<script setup lang="ts">
import { reactive, onMounted } from 'vue'

import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'
import AlarmBell from '@/components/Animation/AlarmBell.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

const alarmBell = reactive({ x: -355, y: -5, scale: 4.5 })

function onNext() {
  gameStore.nextTimeline({ id: 32 })
}

onMounted(() => {
  gameStore.playSFXSound('alarmBell', 2)
})

const titleText = reactive({ x: 95, y: -5, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="slim" x="center" y="bottom" :zoom-factor="zoomFactor" @next="onNext">
    <Text :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">
      Your go-to app has a data\nbreach. You have 8 seconds\nto decide what to do.
    </Text>
    <AlarmBell :x="alarmBell.x" :y="alarmBell.y" :scale="alarmBell.scale" place="popup" />
  </AppPopup>
</template>
