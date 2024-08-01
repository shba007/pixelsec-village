<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { onTick } from 'vue3-pixi'

interface Route {
  x: number
  y: number
  scale: number
  alpha: number
  time: number
}

type Orientation = 'front' | 'back' | 'left' | 'right'
type Animation = 'init' | 'started' | 'finished'

interface Object {
  loaded: boolean
  aliases: string[]
  position: {
    x: number
    y: number
    scale: number
    alpha: number
    time: number
  }
  direction: number
  orientation: Orientation
  animation: Animation
}

const props = defineProps<{
  steps: Route[]
  animation: boolean
  initalOrientation: Orientation
}>()

const animations = {
  frontStill: ['tramFront'],
  frontMove: ['tramFront'],
  backMove: ['tramBack'],
  leftMove: ['tramRight'],
  rightMove: ['tramRight']
}

const tram = reactive<Object>({
  loaded: false,
  aliases: animations.frontStill,
  position: {
    x: props.steps[0].x,
    y: props.steps[0].y,
    scale: props.steps[0].scale,
    alpha: props.steps[0].alpha,
    time: props.steps[0].time
  },
  direction: 1,
  orientation: props.initalOrientation,
  animation: 'started'
})

watch(props.steps, (value) => {
  tram.position.x = value[0].x
  tram.position.y = value[0].y
  tram.position.scale = value[0].scale
  tram.position.alpha = value[0].alpha
  tram.position.time = value[0].time
})

// Move Character
let totalElaspedTime = 0
let progress = 0
const currentTramPositionIndex = ref(0)

onTick((delta) => {
  if (props.animation && tram.animation === 'started') {
    totalElaspedTime += delta / 100
    const dt = props.steps[currentTramPositionIndex.value + 1].time - props.steps[currentTramPositionIndex.value].time
    const dx = props.steps[currentTramPositionIndex.value + 1].x - props.steps[currentTramPositionIndex.value].x
    const dy = props.steps[currentTramPositionIndex.value + 1].y - props.steps[currentTramPositionIndex.value].y
    const ds = props.steps[currentTramPositionIndex.value + 1].scale - props.steps[currentTramPositionIndex.value].scale
    const da = props.steps[currentTramPositionIndex.value + 1].alpha - props.steps[currentTramPositionIndex.value].alpha
    progress = Math.min(totalElaspedTime / dt, 1)
    tram.position.x = props.steps[currentTramPositionIndex.value].x + dx * progress
    tram.position.y = props.steps[currentTramPositionIndex.value].y + dy * progress
    tram.position.scale = props.steps[currentTramPositionIndex.value].scale + ds * progress
    tram.position.alpha = props.steps[currentTramPositionIndex.value].alpha + da * progress
    tram.position.time = props.steps[currentTramPositionIndex.value].time + dt * progress

    if (dy > 0) tram.aliases = animations['frontMove']
    else if (dy < 0) tram.aliases = animations['backMove']
    else if (dx > 0) tram.aliases = animations['rightMove']
    else if (dx < 0) tram.aliases = animations['leftMove']

    if (progress == 1) {
      tram.animation = 'finished'
      totalElaspedTime = 0
      currentTramPositionIndex.value++

      // console.log({ x: props.steps[currentTramPositionIndex.value].x, y: props.steps[currentTramPositionIndex.value].y })
      if (currentTramPositionIndex.value < props.steps.length - 1) tram.animation = 'started'
      // console.log({ currentTramPositionIndex: currentTramPositionIndex.value, length: props.steps.length, animation: tram.animation })
      // console.log({ totalElaspedTime, currentCharacterPositionIndex: currentCharacterPositionIndex.value, animation: activeCharacter.animation })
    }
  }
})
</script>

<template>
  <AnimatedSprite
    :textures="tram.aliases"
    :texture-options="{ scaleMode: 'nearest' }"
    :anchor="0.5"
    :x="tram.position.x"
    :y="tram.position.y"
    :scale="tram.position.scale"
    :alpha="tram.position.alpha"
    :playing="animation && tram.animation === 'started'"
    :animation-speed="0.08"
  />
</template>
