<script lang="ts" setup>
import type { State } from '@/utils/types'
import { reactive, ref, watch } from 'vue'
import { External, onTick } from 'vue3-pixi'

// type Orientation = 'front' | 'back' | 'left' | 'right'

interface Character {
  loaded: boolean
  aliases: string[]
  state: State
  direction: number
  orientation: string
  animation: 'init' | 'started' | 'finished'
}

const props = defineProps<{
  states: State[]
  animation: boolean
}>()

const emit = defineEmits<{
  (e: 'move', x: number, y: number): void
  (e: 'playing', state: boolean): void
}>()

const animations = {
  frontStill: ['characterMainFrontStill'],
  frontWalk: ['characterMainFrontWalk1', 'characterMainFrontWalk2'],
  backWalk: ['characterMainBackWalk1', 'characterMainBackWalk2'],
  leftWalk: ['characterMainLeftWalk1', 'characterMainLeftWalk2'],
  rightWalk: ['characterMainRightWalk1', 'characterMainRightWalk2']
}

const activeCharacter = reactive<Character>({
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
  orientation: 'front',
  animation: 'started'
})

watch(props.states, (value) => {
  activeCharacter.state.x = value[0].x
  activeCharacter.state.y = value[0].y
  activeCharacter.state.scale = value[0].scale
  activeCharacter.state.time = value[0].time
})

// Move Character
let totalElaspedTime = 0
let progress = 0
const currentCharacterStateIndex = ref(0)

onTick((delta) => {
  if (props.animation && activeCharacter.animation === 'started') {
    totalElaspedTime += delta / 100
    const dt = props.states[currentCharacterStateIndex.value + 1].time - props.states[currentCharacterStateIndex.value].time
    const dx = props.states[currentCharacterStateIndex.value + 1].x - props.states[currentCharacterStateIndex.value].x
    const dy = props.states[currentCharacterStateIndex.value + 1].y - props.states[currentCharacterStateIndex.value].y
    const ds = props.states[currentCharacterStateIndex.value + 1].scale - props.states[currentCharacterStateIndex.value].scale
    const da = props.states[currentCharacterStateIndex.value + 1].alpha - props.states[currentCharacterStateIndex.value].alpha
    progress = Math.min(totalElaspedTime / dt, 1)
    activeCharacter.state.x = props.states[currentCharacterStateIndex.value].x + dx * progress
    activeCharacter.state.y = props.states[currentCharacterStateIndex.value].y + dy * progress
    activeCharacter.state.scale = props.states[currentCharacterStateIndex.value].scale + ds * progress
    activeCharacter.state.alpha = props.states[currentCharacterStateIndex.value].alpha + da * progress
    activeCharacter.state.time = props.states[currentCharacterStateIndex.value].time + dt * progress

    emit('move', activeCharacter.state.x, activeCharacter.state.y)

    if (dy > 0) activeCharacter.aliases = animations['frontWalk']
    else if (dy < 0) activeCharacter.aliases = animations['backWalk']
    else if (dx > 0) activeCharacter.aliases = animations['rightWalk']
    else if (dx < 0) activeCharacter.aliases = animations['leftWalk']

    if (progress == 1) {
      activeCharacter.animation = 'finished'
      totalElaspedTime = 0
      currentCharacterStateIndex.value++

      if (currentCharacterStateIndex.value < props.states.length - 1)
        activeCharacter.animation = 'started'

      if (activeCharacter.animation === 'finished')
        emit('playing', false)
    }
  }
})
</script>

<template>
  <AnimatedSprite :textures="activeCharacter.aliases" :texture-options="{ scaleMode: 'nearest' }" :anchor="0.5"
    :x="activeCharacter.state.x" :y="activeCharacter.state.y" :scale="activeCharacter.state.scale"
    :alpha="activeCharacter.state.alpha" :playing="animation && activeCharacter.animation === 'started'"
    :animation-speed="0.08" />
  <!-- <External>
    <div class="flex items-center absolute gap-8 bottom-0 right-0 z-50">
      <div class="flex flex-col gap-2">
        <input v-model="activeCharacter.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.scale" type="number" min="0" max="20" step="0.01" />
      </div>
    </div>
  </External> -->
</template>
