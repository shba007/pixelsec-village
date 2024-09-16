<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => ({
  image: 'popupBgLandscape', //'popupScene61',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1.0 * props.zoomFactor },
}))

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: -5, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Text :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">What annoys you most\nabout data sharing?</Text>
  </Container>
</template>
