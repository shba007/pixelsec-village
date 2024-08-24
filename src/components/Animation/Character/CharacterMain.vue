<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { External, onTick } from 'vue3-pixi'
import type { State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'

// type Orientation = 'front' | 'back' | 'left' | 'right'

interface Character {
  loaded: boolean
  aliases: string[]
  state: State
  direction: number
  orientation: string
  animation: 'init' | 'started' | 'finished'
}

const props = withDefaults(
  defineProps<{
    states: State[]
    currentCharacterStateIndex?: number
    animation: 'init' | 'started' | 'finished'
  }>(),
  {
    currentCharacterStateIndex: 0,
  }
)

const emit = defineEmits<{
  (e: 'move', x: number, y: number): void
  (e: 'updateStateIndex', stateIndex: number): void
  (e: 'updateAnimation', state: 'init' | 'started' | 'finished'): void
}>()

const characterAnimations = {
  frontStill: ['characterMainFrontStill'],
  frontWalk: ['characterMainFrontWalk1', 'characterMainFrontWalk2'],
  backWalk: ['characterMainBackWalk1', 'characterMainBackWalk2'],
  leftWalk: ['characterMainLeftWalk1', 'characterMainLeftWalk2'],
  rightWalk: ['characterMainRightWalk1', 'characterMainRightWalk2'],
}

const trailAnimations = {
  back: ['dataTrailBack1', 'dataTrailBack2', 'dataTrailBack3', 'dataTrailBack4'],
  side: ['dataTrailSide1', 'dataTrailSide2', 'dataTrailSide3', 'dataTrailSide4'],
}

const activeCharacter = reactive<Character>({
  loaded: false,
  aliases: characterAnimations.frontStill,
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    alpha: props.states[0].alpha,
    time: props.states[0].time,
  },
  direction: 1,
  orientation: 'front',
  animation: props.animation,
})

const activeTrail = reactive({
  aliases: trailAnimations['back'] as string[],
  x: 0,
  y: 0,
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
const currentCharacterStateIndex = ref(props.currentCharacterStateIndex)

watch(
  () => activeCharacter.animation,
  (value) => {
    emit('updateAnimation', value)
  }
)

onTick((delta) => {
  if (props.animation && props.animation === 'started' && currentCharacterStateIndex.value < props.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = props.states[currentCharacterStateIndex.value + 1].time - props.states[currentCharacterStateIndex.value].time
    const dx = props.states[currentCharacterStateIndex.value + 1].x - props.states[currentCharacterStateIndex.value].x
    const dy = props.states[currentCharacterStateIndex.value + 1].y - props.states[currentCharacterStateIndex.value].y
    const ds = props.states[currentCharacterStateIndex.value + 1].scale - props.states[currentCharacterStateIndex.value].scale
    const da = props.states[currentCharacterStateIndex.value + 1].alpha - props.states[currentCharacterStateIndex.value].alpha
    progress = Math.min(totalElapsedTime / dt, 1)
    activeCharacter.state.x = props.states[currentCharacterStateIndex.value].x + dx * progress
    activeCharacter.state.y = props.states[currentCharacterStateIndex.value].y + dy * progress
    activeCharacter.state.scale = props.states[currentCharacterStateIndex.value].scale + ds * progress
    activeCharacter.state.alpha = props.states[currentCharacterStateIndex.value].alpha + da * progress
    activeCharacter.state.time = props.states[currentCharacterStateIndex.value].time + dt * progress

    emit('move', activeCharacter.state.x, activeCharacter.state.y)

    if (dy > 0) {
      activeCharacter.aliases = characterAnimations['frontWalk']
      activeTrail.aliases = trailAnimations['back']
      activeTrail.x = 0
      activeTrail.y = 0
    } else if (dy < 0) {
      activeCharacter.aliases = characterAnimations['backWalk']
      activeTrail.aliases = trailAnimations['back']
      activeTrail.x = 0
      activeTrail.y = 30
    } else if (dx > 0) {
      activeCharacter.aliases = characterAnimations['rightWalk']
      activeTrail.aliases = trailAnimations['side']
      activeTrail.x = -1 * 15
      activeTrail.y = 1 * 15
    } else if (dx < 0) {
      activeCharacter.aliases = characterAnimations['leftWalk']
      activeTrail.aliases = trailAnimations['side']
      activeTrail.x = 1 * 25
      activeTrail.y = 1 * 15
    }

    if (progress == 1) {
      totalElapsedTime = 0
      currentCharacterStateIndex.value++

      emit('updateStateIndex', currentCharacterStateIndex.value)
    }
  } else if (!(currentCharacterStateIndex.value < props.states.length - 1)) {
    activeCharacter.aliases = characterAnimations['frontStill']
    activeCharacter.animation = 'finished'
  }
})
</script>

<template>
  <Container :x="activeCharacter.state.x" :y="activeCharacter.state.y" :scale="activeCharacter.state.scale" :alpha="activeCharacter.state.alpha">
    <!-- v-if="activeTrail.aliases.length > 0 && animation && activeCharacter.animation === 'started'" -->
    <AnimatedSprite
      :textures="activeTrail.aliases"
      :texture-options="{ scaleMode: SCALE_MODES.NEAREST }"
      :anchor="0.5"
      :x="activeTrail.x"
      :y="activeTrail.y"
      :scale="1"
      :alpha="1"
      :playing="activeCharacter.animation === 'started'"
      :animation-speed="0.08" />
    <AnimatedSprite
      :textures="activeCharacter.aliases"
      :texture-options="{ scaleMode: SCALE_MODES.NEAREST }"
      :anchor="0.5"
      :x="0"
      :y="0"
      :scale="1"
      :alpha="1"
      :playing="activeCharacter.animation === 'started'"
      :animation-speed="0.08" />
  </Container>
  <!-- DEBUG -->
  <!-- <External>
    <div class="absolute bottom-0 right-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="activeCharacter.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.scale" type="number" min="0" max="5" step="0.01" />
        <input v-model="activeCharacter.state.alpha" type="number" min="0" max="1" step="0.1" />
        <input v-model="activeCharacter.state.time" type="number" min="0" max="100" step="0.5" />
        <input v-model="currentCharacterStateIndex" type="number" min="0" max="50" step="1" />
      </div>
    </div>
  </External> -->
</template>
