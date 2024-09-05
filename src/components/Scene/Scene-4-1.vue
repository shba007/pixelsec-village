<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import AlarmBell from '@/components/Animation/AlarmBell.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  return screenHeight.value / 720
})

const alarmBell = reactive({ x: -355, y: -5, scale: 4.5 })

const modal = computed(() => ({
  image: 'popupScene51',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 3) / 4, scale: 0.9 * zoomFactor.value },
}))

function handleMove() {
  gameStore.nextTimeline({ id: 29 })
}

useTimeoutFn(handleMove, 5000)

onMounted(() => {
  gameStore.playSFXSound('alarmBell', 2)
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <AlarmBell :x="alarmBell.x" :y="alarmBell.y" :scale="alarmBell.scale" place="popup" />
  </Container>
</template>
