<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { onTick } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'
import { storeToRefs } from 'pinia'

interface Route {
  x: number
  y: number
  scale: number
  time: number
}

type Orientation = 'front' | 'back' | 'left' | 'right'

interface Character {
  loaded: boolean
  aliases: string[]
  state: {
    x: number
    y: number
    scale: number
    time: number
  }
  direction: number
  orientation: Orientation
  animation: 'init' | 'started' | 'finished'
}

const props = defineProps<{
  states: Route[]
  animation: boolean
  place: 'map' | 'station'
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const animations = {
  frontStill: ['characterGenericFrontStill'],
  frontWalk: ['characterGenericFrontWalk1', 'characterGenericFrontWalk2'],
  backWalk: ['characterGenericBackWalk1', 'characterGenericBackWalk2'],
  leftWalk: props.place === 'map' ? ['characterGenericLeftWalk1', 'characterGenericLeftWalk2'] : ['characterGenericLeftWalk1Side', 'characterGenericLeftWalk2Side'],
  rightWalk: ['characterGenericRightWalk1', 'characterGenericRightWalk2'],
}

const activeCharacter = reactive<Character>({
  loaded: false,
  aliases: animations.frontStill,
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    time: props.states[0].time,
  },
  direction: 1,
  orientation: 'front',
  animation: 'started',
})

watch(props.states, (value) => {
  activeCharacter.state.x = value[0].x
  activeCharacter.state.y = value[0].y
  activeCharacter.state.scale = value[0].scale
  activeCharacter.state.time = value[0].time
})

// Move Character
let totalElapsedTime = 0
let progress = 0
const currentCharacterStateIndex = ref(0)

onTick((delta) => {
  if (props.animation && activeCharacter.animation === 'started') {
    totalElapsedTime += delta / 100
    const dt = props.states[currentCharacterStateIndex.value + 1].time - props.states[currentCharacterStateIndex.value].time
    const dx = props.states[currentCharacterStateIndex.value + 1].x - props.states[currentCharacterStateIndex.value].x
    const dy = props.states[currentCharacterStateIndex.value + 1].y - props.states[currentCharacterStateIndex.value].y
    const ds = props.states[currentCharacterStateIndex.value + 1].scale - props.states[currentCharacterStateIndex.value].scale
    progress = Math.min(totalElapsedTime / dt, 1)
    activeCharacter.state.x = Math.floor(props.states[currentCharacterStateIndex.value].x + dx * progress)
    activeCharacter.state.y = Math.floor(props.states[currentCharacterStateIndex.value].y + dy * progress)
    activeCharacter.state.scale = props.states[currentCharacterStateIndex.value].scale + ds * progress
    activeCharacter.state.time = props.states[currentCharacterStateIndex.value].time + dt * progress

    if (dy > 0) activeCharacter.aliases = animations['frontWalk']
    else if (dy < 0) activeCharacter.aliases = animations['backWalk']
    else if (dx > 0) activeCharacter.aliases = animations['rightWalk']
    else if (dx < 0) activeCharacter.aliases = animations['leftWalk']

    if (progress == 1) {
      activeCharacter.animation = 'finished'
      totalElapsedTime = 0
      currentCharacterStateIndex.value = currentCharacterStateIndex.value === 0 ? 1 : 0
      activeCharacter.animation = 'started'
      // console.log({ totalElapsedTime, currentCharacterStateIndex: currentCharacterStateIndex.value, animation: activeCharacter.animation })
    }
  }
})
</script>

<template>
  <AppAnimatedSprite
    :textures="activeCharacter.aliases"
    :texture-options="textureOptions.blur"
    :anchor="0.5"
    :x="activeCharacter.state.x"
    :y="activeCharacter.state.y"
    :scale="activeCharacter.state.scale"
    :playing="animation && activeCharacter.animation === 'started'"
    :animation-speed="0.08" />
</template>
