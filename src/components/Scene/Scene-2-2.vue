<script lang="ts" setup>
import { computed, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize, watchDebounced } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene12',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = [
  { type: 'banking', frames: ['smartphoneBanking', 'smartphoneBankingHighlighted'], state: { x: -445, y: -170, scale: 0.5 } },
  { type: 'email', frames: ['smartphoneEmail', 'smartphoneEmailHighlighted'], state: { x: -445, y: -320, scale: 0.5 } },
  { type: 'game', frames: ['smartphoneGame', 'smartphoneGameHighlighted'], state: { x: -290, y: 140, scale: 0.5 } },
  { type: 'health', frames: ['smartphoneHealth', 'smartphoneHealthHighlighted'], state: { x: -445, y: 140, scale: 0.5 } },
  { type: 'movie', frames: ['smartphoneMovie', 'smartphoneMovieHighlighted'], state: { x: -290, y: -10, scale: 0.5 } },
  { type: 'music', frames: ['smartphoneMusic', 'smartphoneMusicHighlighted'], state: { x: -445, y: -10, scale: 0.5 } },
  { type: 'shopping', frames: ['smartphoneShopping', 'smartphoneShoppingHighlighted'], state: { x: -290, y: -170, scale: 0.5 } },
  { type: 'social', frames: ['smartphoneSocial', 'smartphoneSocialHighlighted'], state: { x: -290, y: -320, scale: 0.5 } },
]

const selectedOptions = ref<Set<string>>(new Set())

function onClick(option: string) {
  gameStore.playSound('buttonPressDesign')
  if (selectedOptions.value.has(option)) selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)
}

watchDebounced(() => [...selectedOptions.value.values()], onComplete, { debounce: 2000 })

function onComplete() {
  // DATA-COLLECT
  gameStore.nextTimeline({ id: 10 })
}
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" />
    <Sprite
      v-for="{ type, frames, state } of options"
      :texture="frames[Number(selectedOptions.has(type))]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @click="onClick(type)"
      @touchstart="onClick(type)"
      :alpha="1" />
  </Container>
</template>
