<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => ({
  image: 'popupBgLandscape',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1.0 * props.zoomFactor },
}))

useTimeoutFn(handleMove, 8000)

function handleMove() {
  gameStore.nextTimeline({ id: 3 })
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: 50, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 54 * 4, align: 'center', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="titleText.x" :y="titleText.y">
      <Text :y="-190" :anchor="titleText.anchor" :scale="titleText.scale" :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }"> LET THE ADVENTURE BEGIN </Text>
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale">Excited to find out which house you\nwill arrive in? Answer the questions\nto determine your result. </Text>
    </Container>
  </Container>
</template>
