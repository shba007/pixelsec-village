<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import type { State } from '@/utils/types'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

// type Orientation = 'front' | 'back' | 'left' | 'right'

interface Character {
  loaded: boolean
  aliases: string[]
  state: State
  direction: number
  orientation: string
  animation: 'init' | 'stationary' | 'started' | 'finished'
}

const gameStore = useGameStore()
const { currentCharacterIndex: currentMCCharacterIndex, rotationStop } = storeToRefs(gameStore)

const props = defineProps<{
  states: State[]
}>()

const emit = defineEmits<{
  (e: 'update', stateIndex: number, state: 'init' | 'started' | 'finished'): void
}>()

const characterAnimations = {
  frontStill: ['characterSusGuyFishing1', 'characterSusGuyFishing2'],
  frontWalk: ['characterSusGuyWalkFront1', 'characterSusGuyWalkFront2'],
  backWalk: ['characterSusGuyWalkBack1', 'characterSusGuyWalkBack2'],
  leftWalk: ['characterSusGuyWalkLeft1', 'characterSusGuyWalkLeft2'],
  rightWalk: ['characterSusGuyWalkRight1', 'characterSusGuyWalkRight2'],
}

const activeCharacter = reactive<Character>({
  loaded: false,
  aliases: characterAnimations['frontStill'],
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    alpha: props.states[0].alpha,
    time: props.states[0].time,
  },
  direction: 1,
  orientation: 'front',
  animation: 'stationary',
})

watch(props.states, (value) => {
  activeCharacter.state.x = value[0].x
  activeCharacter.state.y = value[0].y
  activeCharacter.state.scale = value[0].scale
  activeCharacter.state.time = value[0].time
})

const currentCharacterIndex = ref(0)
const holdedCharacterIndex = ref(0)
watch(currentMCCharacterIndex, (value) => {
  // holdedStateIndex.value = value
  if (value === 19) {
    holdedCharacterIndex.value = value - 18
    currentCharacterIndex.value = value - 19
    activeCharacter.animation = 'started'
  } else if (value > 19) {
    holdedCharacterIndex.value = value - 18
  }
})

watch(rotationStop, (value) => {
  activeCharacter.animation = value ? 'finished' : activeCharacter.animation
})

watch(
  () => activeCharacter.animation,
  () => {
    console.log('activeCharacterAnimation', activeCharacter.animation)
  }
)
// Move Character
let totalElapsedTime = 0
let progress = 0

onTick((delta) => {
  if (activeCharacter.animation === 'started' && currentCharacterIndex.value >= 0 && currentCharacterIndex.value < props.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = props.states[currentCharacterIndex.value + 1].time - props.states[currentCharacterIndex.value].time
    const dx = props.states[currentCharacterIndex.value + 1].x - props.states[currentCharacterIndex.value].x
    const dy = props.states[currentCharacterIndex.value + 1].y - props.states[currentCharacterIndex.value].y
    const ds = props.states[currentCharacterIndex.value + 1].scale - props.states[currentCharacterIndex.value].scale
    const da = props.states[currentCharacterIndex.value + 1].alpha - props.states[currentCharacterIndex.value].alpha
    progress = Math.min(totalElapsedTime / dt, 1)
    activeCharacter.state.x = props.states[currentCharacterIndex.value].x + dx * progress
    activeCharacter.state.y = props.states[currentCharacterIndex.value].y + dy * progress
    activeCharacter.state.scale = props.states[currentCharacterIndex.value].scale + ds * progress
    activeCharacter.state.alpha = props.states[currentCharacterIndex.value].alpha + da * progress
    activeCharacter.state.time = props.states[currentCharacterIndex.value].time + dt * progress

    if (dy > 0) {
      activeCharacter.aliases = characterAnimations['frontWalk']
    } else if (dy < 0) {
      activeCharacter.aliases = characterAnimations['backWalk']
    } else if (dx > 0) {
      activeCharacter.aliases = characterAnimations['rightWalk']
    } else if (dx < 0) {
      activeCharacter.aliases = characterAnimations['leftWalk']
    }

    if (progress == 1) {
      totalElapsedTime = 0
      currentCharacterIndex.value = holdedCharacterIndex.value
      activeCharacter.animation = 'finished'
      activeCharacter.animation = 'started'
    }
  } else if (!(currentCharacterIndex.value < props.states.length - 1)) {
    activeCharacter.aliases = characterAnimations['frontStill']
    activeCharacter.animation = 'finished'
  }
})
</script>

<template>
  <Container :x="activeCharacter.state.x" :y="activeCharacter.state.y" :scale="activeCharacter.state.scale" :alpha="activeCharacter.state.alpha">
    <AppAnimatedSprite
      :textures="activeCharacter.aliases"
      :texture-options="textureOptions"
      :anchor="0.5"
      :x="0"
      :y="0"
      :scale="1"
      :alpha="1"
      :playing="activeCharacter.animation === 'stationary' || activeCharacter.animation === 'started'"
      :animation-speed="0.08" />
  </Container>
  <!-- DEBUG -->
  <!-- <External>
    <div class="absolute bottom-0 left-16 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="activeCharacter.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.scale" type="number" min="0" max="5" step="0.01" />
         <input v-model="activeCharacter.state.alpha" type="number" min="0" max="1" step="0.1" /> 
  <input v-model="activeCharacter.state.time" type="number" min="0" max="100" step="0.5" />
  <span class="bg-white"> {{ activeCharacter.animation }}</span>
  <span class="bg-white"> {{ currentCharacterIndex }}</span>
  </div>
  </div>
  </External> -->
</template>
