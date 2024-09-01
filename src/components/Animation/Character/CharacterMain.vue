<script lang="ts" setup>
import { reactive, watch, computed } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import type { State } from '@/utils/types'
import { textureOptions } from '@/components/Settings.vue'
import { useGameStore } from '@/stores/game'
import AppAnimatedSprite from "@/components/AppAnimatedSprite.vue";

// type Orientation = 'front' | 'back' | 'left' | 'right'

const gameStore = useGameStore()
const { currentCharacterIndex, rotationStop } = storeToRefs(gameStore)

interface Character {
  loaded: boolean
  aliases: string[]
  state: State
  direction: number
  orientation: string
  animation: 'init' | 'started' | 'finished'
  skin: 'red' | 'blue' | 'violate' | 'black'
}

const props = withDefaults(
  defineProps<{
    states: State[]
    skin?: 'red' | 'blue' | 'violate' | 'black'
  }>(),
  {
    skin: 'blue',
  }
)

const emit = defineEmits<{
  (e: 'update', stateIndex: number, state: 'init' | 'started' | 'finished'): void
}>()

function capitalizeFirstLetter(word: string): string {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

const characterAnimations = computed(() => ({
  frontStill: [`characterMain${capitalizeFirstLetter(props.skin)}FrontStill`],
  frontWalk: [`characterMain${capitalizeFirstLetter(props.skin)}FrontWalk1`, `characterMain${capitalizeFirstLetter(props.skin)}FrontWalk2`],
  backWalk: [`characterMain${capitalizeFirstLetter(props.skin)}BackWalk1`, `characterMain${capitalizeFirstLetter(props.skin)}BackWalk2`],
  leftWalk: [`characterMain${capitalizeFirstLetter(props.skin)}LeftWalk1`, `characterMain${capitalizeFirstLetter(props.skin)}LeftWalk2`],
  rightWalk: [`characterMain${capitalizeFirstLetter(props.skin)}RightWalk1`, `characterMain${capitalizeFirstLetter(props.skin)}RightWalk2`],
}))

const trailAnimations = {
  back: ['dataTrailBack1', 'dataTrailBack2', 'dataTrailBack3', 'dataTrailBack4'],
  side: ['dataTrailSide1', 'dataTrailSide2', 'dataTrailSide3', 'dataTrailSide4'],
}

const activeCharacter = reactive<Character>({
  loaded: false,
  aliases: characterAnimations.value['frontStill'],
  state: {
    x: props.states[0].x,
    y: props.states[0].y,
    scale: props.states[0].scale,
    alpha: props.states[0].alpha,
    time: props.states[0].time,
  },
  direction: 1,
  orientation: 'front',
  skin: props.skin,
  animation: 'init',
})

const activeTrail = reactive({
  aliases: trailAnimations['back'] as string[],
  x: 0,
  y: 0,
})

watch(
  () => props.states,
  (value) => {
    activeCharacter.state.x = value[0].x
    activeCharacter.state.y = value[0].y
    activeCharacter.state.scale = value[0].scale
    activeCharacter.state.time = value[0].time
  }
)

watch(rotationStop, (value) => {
  activeCharacter.animation = value ? 'finished' : activeCharacter.animation
})

watch(currentCharacterIndex, () => {
  activeCharacter.animation = 'started'
})

// Move Character
let totalElapsedTime = 0
let progress = 0

onTick((delta) => {
  if (activeCharacter.animation === 'started' && currentCharacterIndex.value < props.states.length - 1) {
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
      activeCharacter.aliases = characterAnimations.value['frontWalk']
      activeTrail.aliases = trailAnimations['back']
      activeTrail.x = 0
      activeTrail.y = 0
    } else if (dy < 0) {
      activeCharacter.aliases = characterAnimations.value['backWalk']
      activeTrail.aliases = trailAnimations['back']
      activeTrail.x = 0
      activeTrail.y = 30
    } else if (dx > 0) {
      activeCharacter.aliases = characterAnimations.value['rightWalk']
      activeTrail.aliases = trailAnimations['side']
      activeTrail.x = -1 * 15
      activeTrail.y = 1 * 15
    } else if (dx < 0) {
      activeCharacter.aliases = characterAnimations.value['leftWalk']
      activeTrail.aliases = trailAnimations['side']
      activeTrail.x = 1 * 25
      activeTrail.y = 1 * 15
    }

    if (progress == 1) {
      totalElapsedTime = 0
      activeCharacter.aliases = characterAnimations.value['frontStill']
      activeCharacter.animation = 'finished'
      emit('update', currentCharacterIndex.value, 'finished')
    }
  } else if (!(currentCharacterIndex.value < props.states.length - 1)) {
    activeCharacter.aliases = characterAnimations.value['frontStill']
    activeCharacter.animation = 'finished'
    emit('update', currentCharacterIndex.value, 'finished')
  }
})
</script>

<template>
  <Container :x="activeCharacter.state.x" :y="activeCharacter.state.y" :scale="activeCharacter.state.scale"
    :alpha="activeCharacter.state.alpha">
    <!-- v-if="activeTrail.aliases.length > 0 && animation && activeCharacter.animation === 'started'" -->
    <AppAnimatedSprite v-if="activeCharacter.animation === 'started'" :textures="activeTrail.aliases"
      :texture-options="textureOptions" :anchor="0.5" :x="activeTrail.x" :y="activeTrail.y" :scale="1" :alpha="1"
      :playing="true" :animation-speed="0.08" />
    <AppAnimatedSprite :textures="activeCharacter.aliases" :texture-options="textureOptions" :anchor="0.5" :x="0" :y="0"
      :scale="1" :alpha="1" :playing="activeCharacter.animation === 'started'" :animation-speed="0.08" />
  </Container>
  <!-- DEBUG -->
  <!--  <External>
    <div class="absolute bottom-0 right-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="activeCharacter.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.state.scale" type="number" min="0" max="5" step="0.01" />
        <input v-model="activeCharacter.state.alpha" type="number" min="0" max="1" step="0.1" />
        <input v-model="activeCharacter.state.time" type="number" min="0" max="100" step="0.5" />
        <span class="bg-white">{{ activeCharacter.animation }}</span>
        <span class="bg-white">{{ currentCharacterIndex }}</span>
      </div>
    </div>
  </External> -->
</template>
