<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { onTick } from 'vue3-pixi'

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
  position: {
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
  steps: Route[]
  animation: boolean
}>()

const animations = {
  frontStill: ['characterGenericFrontStill'],
  frontWalk: ['characterGenericFrontWalk1', 'characterGenericFrontWalk2'],
  backWalk: ['characterGenericBackWalk1', 'characterGenericBackWalk2'],
  leftWalk: ['characterGenericLeftWalk1', 'characterGenericLeftWalk2'],
  rightWalk: ['characterGenericRightWalk1', 'characterGenericRightWalk2']
}

const activeCharacter = reactive<Character>({
  loaded: false,
  aliases: animations.frontStill,
  position: {
    x: props.steps[0].x,
    y: props.steps[0].y,
    scale: props.steps[0].scale,
    time: props.steps[0].time
  },
  direction: 1,
  orientation: 'front',
  animation: 'started'
})

watch(props.steps, (value) => {
  activeCharacter.position.x = value[0].x
  activeCharacter.position.y = value[0].y
  activeCharacter.position.scale = value[0].scale
  activeCharacter.position.time = value[0].time
})

// Move Character
let totalElaspedTime = 0
let progress = 0
const currentCharacterPositionIndex = ref(0)

onTick((delta) => {
  if (props.animation && activeCharacter.animation === 'started') {
    totalElaspedTime += delta / 100
    const dt = props.steps[currentCharacterPositionIndex.value + 1].time - props.steps[currentCharacterPositionIndex.value].time
    const dx = props.steps[currentCharacterPositionIndex.value + 1].x - props.steps[currentCharacterPositionIndex.value].x
    const dy = props.steps[currentCharacterPositionIndex.value + 1].y - props.steps[currentCharacterPositionIndex.value].y
    const ds = props.steps[currentCharacterPositionIndex.value + 1].scale - props.steps[currentCharacterPositionIndex.value].scale
    progress = Math.min(totalElaspedTime / dt, 1)
    activeCharacter.position.x = props.steps[currentCharacterPositionIndex.value].x + dx * progress
    activeCharacter.position.y = props.steps[currentCharacterPositionIndex.value].y + dy * progress
    activeCharacter.position.scale = props.steps[currentCharacterPositionIndex.value].scale + ds * progress
    activeCharacter.position.time = props.steps[currentCharacterPositionIndex.value].time + dt * progress

    if (dy > 0) activeCharacter.aliases = animations['frontWalk']
    else if (dy < 0) activeCharacter.aliases = animations['backWalk']
    else if (dx > 0) activeCharacter.aliases = animations['rightWalk']
    else if (dx < 0) activeCharacter.aliases = animations['leftWalk']

    if (progress == 1) {
      activeCharacter.animation = 'finished'
      totalElaspedTime = 0
      currentCharacterPositionIndex.value = currentCharacterPositionIndex.value === 0 ? 1 : 0
      activeCharacter.animation = 'started'
      // console.log({ totalElaspedTime, currentCharacterPositionIndex: currentCharacterPositionIndex.value, animation: activeCharacter.animation })
    }
  }
})
</script>

<template>
  <AnimatedSprite
    :textures="activeCharacter.aliases"
    :texture-options="{ scaleMode: 'nearest' }"
    :anchor="0.5"
    :x="activeCharacter.position.x"
    :y="activeCharacter.position.y"
    :scale="activeCharacter.position.scale"
    :playing="animation && activeCharacter.animation === 'started'"
    :animation-speed="0.08"
  />
</template>
