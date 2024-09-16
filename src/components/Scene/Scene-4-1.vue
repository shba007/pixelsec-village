<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AlarmBell from '@/components/Animation/AlarmBell.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const alarmBell = reactive({ x: -355, y: -5, scale: 4.5 })

const modal = computed(() => ({
  image: 'popupBgSlim', //'popupScene51',
  state: { x: 0, y: (screenHeight.value * 1) / 4, scale: 0.9 * props.zoomFactor },
}))

function handleMove() {
  gameStore.nextTimeline({ id: 32 })
}

useTimeoutFn(handleMove, 5000)

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
  gameStore.playSFXSound('alarmBell', 2)
})

const titleText = reactive({ x: 95, y: -5, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 54 * 4, align: 'left', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Text :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"
      >Your go-to app has a data\nbreach. You have 8 seconds\nto decide what to do.</Text
    >
    <AlarmBell :x="alarmBell.x" :y="alarmBell.y" :scale="alarmBell.scale" place="popup" />
  </Container>
</template>
