<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize, watchDebounced } from '@vueuse/core'

import { useDataStore, type spendTimeChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const modal = computed(() => ({
  image: 'popupScene12',
  state: { x: 0, y: 0, scale: 0.95 * zoomFactor.value },
}))

const options = reactive<
  {
    type: spendTimeChoice
    frames: string[]
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: 'banking', frames: ['smartphoneBanking', 'smartphoneBankingHighlighted'], state: { x: -445, y: -170, scale: 0.5 } },
  { type: 'email', frames: ['smartphoneEmail', 'smartphoneEmailHighlighted'], state: { x: -445, y: -320, scale: 0.5 } },
  { type: 'game', frames: ['smartphoneGame', 'smartphoneGameHighlighted'], state: { x: -290, y: 140, scale: 0.5 } },
  { type: 'health', frames: ['smartphoneHealth', 'smartphoneHealthHighlighted'], state: { x: -445, y: 140, scale: 0.5 } },
  { type: 'movie', frames: ['smartphoneMovie', 'smartphoneMovieHighlighted'], state: { x: -290, y: -10, scale: 0.5 } },
  { type: 'music', frames: ['smartphoneMusic', 'smartphoneMusicHighlighted'], state: { x: -445, y: -10, scale: 0.5 } },
  { type: 'shopping', frames: ['smartphoneShopping', 'smartphoneShoppingHighlighted'], state: { x: -290, y: -170, scale: 0.5 } },
  { type: 'social', frames: ['smartphoneSocial', 'smartphoneSocialHighlighted'], state: { x: -290, y: -320, scale: 0.5 } },
])

const selectedOptions = ref<Set<string>>(new Set())

function onClick(option: spendTimeChoice) {
  gameStore.playSFXSound('buttonPressDesign')
  if (selectedOptions.value.has(option)) selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)
}

watchDebounced(() => [...selectedOptions.value.values()], onComplete, { debounce: 2000 })

function onComplete() {
  // DATA-COLLECT
  dataStore.setSpendTime([...selectedOptions.value.values()] as spendTimeChoice[])
  gameStore.nextTimeline({ id: 10 })
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Sprite
      v-for="{ type, frames, state } of options"
      :key="type"
      :texture="frames[Number(selectedOptions.has(type))]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      :alpha="1"
      cursor="pointer"
      @pointerdown="onClick(type)" />
  </Container>
</template>
