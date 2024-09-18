<script setup lang="ts">
import { onMounted, watch, reactive, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onTick } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = withDefaults(
  defineProps<{
    place: 'map' | 'bank'
    states: {
      x: number
      y: number
      scale: number
      alpha: number
      time: number
    }[]
    type: 'green' | 'purple'
    playSound: boolean
  }>(),
  { playSound: true }
)

const gameStore = useGameStore()
const { currentPopupIndex, textureOptions } = storeToRefs(gameStore)

const activeCharacter = reactive<any>({
  loaded: false,
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    alpha: props.states[0].alpha,
    time: props.states[0].time,
  },
  direction: 1,
  animation: 'started',
})

function capitalize(word: string) {
  if (!word) return '' // Return an empty string if input is empty
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const textures = {
  map: [`characterPanic${capitalize(props.type)}MapLeft`, `characterPanic${capitalize(props.type)}MapRight`, `characterPanic${capitalize(props.type)}MapStand`],
  bank: [`characterPanic${capitalize(props.type)}BankLeft`, `characterPanic${capitalize(props.type)}BankRight`],
}

const currentCharacterStateIndex = ref(0)
const playing = true
const speed = 0.07
// Move Character
let totalElapsedTime = 0
let progress = 0

onTick((delta) => {
  if (activeCharacter.animation === 'started') {
    totalElapsedTime += delta / 100
    const dt = props.states[currentCharacterStateIndex.value + 1].time - props.states[currentCharacterStateIndex.value].time
    const dx = props.states[currentCharacterStateIndex.value + 1].x - props.states[currentCharacterStateIndex.value].x
    const dy = props.states[currentCharacterStateIndex.value + 1].y - props.states[currentCharacterStateIndex.value].y
    const da = props.states[currentCharacterStateIndex.value + 1].alpha - props.states[currentCharacterStateIndex.value].alpha
    const ds = props.states[currentCharacterStateIndex.value + 1].scale - props.states[currentCharacterStateIndex.value].scale
    progress = Math.min(totalElapsedTime / dt, 1)
    activeCharacter.state.x = props.states[currentCharacterStateIndex.value].x + dx * progress
    activeCharacter.state.y = props.states[currentCharacterStateIndex.value].y + dy * progress
    activeCharacter.state.scale = props.states[currentCharacterStateIndex.value].scale + ds * progress
    activeCharacter.state.alpha = props.states[currentCharacterStateIndex.value].alpha + da * progress
    activeCharacter.state.time = props.states[currentCharacterStateIndex.value].time + dt * progress

    if (progress == 1) {
      activeCharacter.animation = 'finished'
      totalElapsedTime = 0
      currentCharacterStateIndex.value = currentCharacterStateIndex.value === 0 ? 1 : 0
      activeCharacter.animation = 'started'
    }
  }
})

watch(currentPopupIndex, (value) => {
  if (value >= 16) {
    pause()
  }
})

const { resume, pause } = useIntervalFn(
  () => {
    if (props.playSound) {
      gameStore.playSFXSound('panic', 3)
    }
  },
  5000,
  { immediate: false }
)

onMounted(() => {
  if (props.playSound) {
    gameStore.playSFXSound('panic', 3)
    resume()
  }
})
</script>

<template>
  <AppAnimatedSprite
    :textures="textures[place]"
    :texture-options="textureOptions.blur"
    :anchor="0.5"
    :x="activeCharacter.state.x"
    :y="activeCharacter.state.y"
    :scale="activeCharacter.state.scale"
    :alpha="activeCharacter.state.alpha"
    :playing="playing"
    :animation-speed="speed" />
</template>
