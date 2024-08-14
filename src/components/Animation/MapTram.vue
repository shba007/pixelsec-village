<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { onTick } from 'vue3-pixi'
import { SCALE_MODES } from '@/utils/types'

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
  state: {
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
  states: Route[]
  animation: boolean
  initalOrientation: Orientation
}>()

const emit = defineEmits<{
  (e: 'move', x: number, y: number): void
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
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    alpha: props.states[0].alpha,
    time: props.states[0].time
  },
  direction: 1,
  orientation: props.initalOrientation,
  animation: 'started'
})

watch(props.states, (value) => {
  tram.state.x = value[0].x
  tram.state.y = value[0].y
  tram.state.scale = value[0].scale
  tram.state.alpha = value[0].alpha
  tram.state.time = value[0].time
})

// Move Character
let totalElaspedTime = 0
let progress = 0
const currentTramStateIndex = ref(0)

onTick((delta) => {
  if (props.animation && tram.animation === 'started') {
    totalElaspedTime += delta / 100
    const dt = props.states[currentTramStateIndex.value + 1].time - props.states[currentTramStateIndex.value].time
    const dx = props.states[currentTramStateIndex.value + 1].x - props.states[currentTramStateIndex.value].x
    const dy = props.states[currentTramStateIndex.value + 1].y - props.states[currentTramStateIndex.value].y
    const ds = props.states[currentTramStateIndex.value + 1].scale - props.states[currentTramStateIndex.value].scale
    const da = props.states[currentTramStateIndex.value + 1].alpha - props.states[currentTramStateIndex.value].alpha
    progress = Math.min(totalElaspedTime / dt, 1)
    tram.state.x = props.states[currentTramStateIndex.value].x + dx * progress
    tram.state.y = props.states[currentTramStateIndex.value].y + dy * progress
    tram.state.scale = props.states[currentTramStateIndex.value].scale + ds * progress
    tram.state.alpha = props.states[currentTramStateIndex.value].alpha + da * progress
    tram.state.time = props.states[currentTramStateIndex.value].time + dt * progress

    emit('move', tram.state.x, tram.state.y)

    if (dy > 0) tram.aliases = animations['frontMove']
    else if (dy < 0) tram.aliases = animations['backMove']
    else if (dx > 0) tram.aliases = animations['rightMove']
    else if (dx < 0) tram.aliases = animations['leftMove']

    if (progress == 1) {
      tram.animation = 'finished'
      totalElaspedTime = 0
      currentTramStateIndex.value++

      if (currentTramStateIndex.value < props.states.length - 1) tram.animation = 'started'
    }
  }
})
</script>

<template>
  <AnimatedSprite
    :textures="tram.aliases"
    :texture-options="{ scaleMode: SCALE_MODES.NEAREST }"
    :anchor="0.5"
    :x="tram.state.x"
    :y="tram.state.y"
    :scale="tram.state.scale"
    :alpha="tram.state.alpha"
    :playing="animation && tram.animation === 'started'"
    :animation-speed="0.08"
  />
</template>
