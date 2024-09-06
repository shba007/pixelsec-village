<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore, type Character } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { isMobile } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene03',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const characters = [
  { type: 'black' as const, frames: ['characterMainBlackFrontWalk1', 'characterMainBlackFrontWalk2'], state: { x: -245, y: 95, scale: 5 } },
  { type: 'violate' as const, frames: ['characterMainViolateFrontWalk1', 'characterMainViolateFrontWalk2'], state: { x: -82, y: 95, scale: 5 } },
  { type: 'red' as const, frames: ['characterMainRedFrontWalk1', 'characterMainRedFrontWalk2'], state: { x: 81, y: 95, scale: 5 } },
  { type: 'blue' as const, frames: ['characterMainBlueFrontWalk1', 'characterMainBlueFrontWalk2'], state: { x: 245, y: 95, scale: 5 } },
]

const selectedCharacter = ref<Character>()

function setCharacter(type: Character) {
  selectedCharacter.value = type
  gameStore.setCharacterSkin(type)
  gameStore.playSFXSound('buttonPressDesign')

  setTimeout(() => {
    gameStore.nextTimeline({ id: 4 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :scale="isMobile ? 2 : 1" :anchor="0.5" />
    <AppAnimatedSprite v-for="{ type, frames: frames, state } of characters" :key="type" :textures="frames"
      :texture-options="textureOptions" :x="state.x" :y="state.y"
      :scale="state.scale * (selectedCharacter === type ? 1.25 : 1)" :anchor="0.5" :playing="true"
      :animation-speed="0.05" cursor="pointer" @pointerdown="setCharacter(type)" />
  </Container>
</template>
