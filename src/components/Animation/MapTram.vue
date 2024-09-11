<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { onTick, External } from 'vue3-pixi'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'
import { useGameStore } from '@/stores/game'
import { useDebounceFn } from '@vueuse/core'

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
  animation: 'init' | 'started' | 'finished'
  initialOrientation: Orientation
}>()

const emit = defineEmits<{
  (e: 'move', x: number, y: number): void
}>()

const gameStore = useGameStore()

const animations = {
  frontStill: ['tramFront'],
  frontMove: ['tramFront'],
  backMove: ['tramBack'],
  leftMove: ['tramRight'],
  rightMove: ['tramRight'],
}

const tram = reactive<Object>({
  loaded: false,
  aliases: animations.frontStill,
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    alpha: props.states[0].alpha,
    time: props.states[0].time,
  },
  direction: 1,
  orientation: props.initialOrientation,
  animation: props.animation,
})

watch(
  () => props.animation,
  (value) => {
    tram.animation = value
  }
)

watch(props.states, (value) => {
  tram.state.x = value[0].x
  tram.state.y = value[0].y
  tram.state.scale = value[0].scale
  tram.state.alpha = value[0].alpha
  tram.state.time = value[0].time
})

const currentTramStateIndex = ref(0)
// Move Character
let totalElapsedTime = 0
let progress = 0

const debouncedPlaySFXSound = useDebounceFn(() => {
  // console.log('Play sound tram', currentTramStateIndex.value)
  gameStore.playSFXSound('tram', 2)
}, 500)

onTick((delta) => {
  if (tram.animation === 'started' && currentTramStateIndex.value >= 0 && currentTramStateIndex.value < props.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = props.states[currentTramStateIndex.value + 1].time - props.states[currentTramStateIndex.value].time
    const dx = props.states[currentTramStateIndex.value + 1].x - props.states[currentTramStateIndex.value].x
    const dy = props.states[currentTramStateIndex.value + 1].y - props.states[currentTramStateIndex.value].y
    const ds = props.states[currentTramStateIndex.value + 1].scale - props.states[currentTramStateIndex.value].scale
    const da = props.states[currentTramStateIndex.value + 1].alpha - props.states[currentTramStateIndex.value].alpha
    progress = Math.min(totalElapsedTime / dt, 1)
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
      totalElapsedTime = 0
      currentTramStateIndex.value++
      if (currentTramStateIndex.value <= 7) debouncedPlaySFXSound()

      if (currentTramStateIndex.value < props.states.length - 1) tram.animation = 'started'
    }
  }
})
</script>

<template>
  <AppAnimatedSprite
    :textures="tram.aliases"
    :texture-options="textureOptions"
    :anchor="0.5"
    :x="tram.state.x"
    :y="tram.state.y"
    :scale="tram.state.scale"
    :alpha="tram.state.alpha"
    :playing="animation && tram.animation === 'started'"
    :animation-speed="0.08" />
  <!--  <External>
    <div class="absolute bottom-0 left-16 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="tram.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="tram.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="tram.state.scale" type="number" min="0" max="5" step="0.01" />
        <input v-model="tram.state.alpha" type="number" min="0" max="1" step="0.1" />
        <input v-model="tram.state.time" type="number" min="0" max="100" step="0.5" />
        <input v-model="currentTramStateIndex" type="number" min="0" max="50" step="1" />
      </div>
    </div>
  </External> -->
</template>
