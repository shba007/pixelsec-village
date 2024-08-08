<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { External, onTick } from 'vue3-pixi'

interface Route {
  x: number
  y: number
  scale: number
  alpha: number
  time: number
}

// type Orientation = 'front' | 'back' | 'left' | 'right'

interface Character {
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
  orientation: string
  animation: 'init' | 'started' | 'finished'
}

const props = defineProps<{
  steps: Route[]
  animation: boolean
}>()

const emit = defineEmits<{
  (e: 'move', x: number, y: number): void
}>()

const animations = {
  frontStill: ['characterMainBlackFrontStill'],
  frontWalk: ['characterMainBlackFrontWalk1', 'characterMainBlackFrontWalk2'],
  backWalk: ['characterMainBackWalk1', 'characterMainBackWalk2'],
  leftWalk: ['characterMainBlackLeftWalk1', 'characterMainBlackLeftWalk1'],
  rightWalk: ['characterMainRightWalk1', 'characterMainRightWalk2']
}

const activeCharacter = reactive<Character>({
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
    const da = props.steps[currentCharacterPositionIndex.value + 1].alpha - props.steps[currentCharacterPositionIndex.value].alpha
    progress = Math.min(totalElaspedTime / dt, 1)
    activeCharacter.position.x = props.steps[currentCharacterPositionIndex.value].x + dx * progress
    activeCharacter.position.y = props.steps[currentCharacterPositionIndex.value].y + dy * progress
    activeCharacter.position.scale = props.steps[currentCharacterPositionIndex.value].scale + ds * progress
    activeCharacter.position.alpha = props.steps[currentCharacterPositionIndex.value].alpha + da * progress
    activeCharacter.position.time = props.steps[currentCharacterPositionIndex.value].time + dt * progress

    emit('move', activeCharacter.position.x, activeCharacter.position.y)

    if (dy > 0) activeCharacter.aliases = animations['frontWalk']
    else if (dy < 0) activeCharacter.aliases = animations['backWalk']
    else if (dx > 0) activeCharacter.aliases = animations['rightWalk']
    else if (dx < 0) activeCharacter.aliases = animations['leftWalk']

    if (progress == 1) {
      activeCharacter.animation = 'finished'
      totalElaspedTime = 0
      currentCharacterPositionIndex.value++

      if (currentCharacterPositionIndex.value < props.steps.length - 1) activeCharacter.animation = 'started'
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
  <External>
    <div class="flex items-center absolute gap-8 bottom-0 right-0 z-50">
      <div class="flex flex-col gap-2">
        <input v-model="activeCharacter.position.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.position.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="activeCharacter.position.scale" type="number" min="0" max="20" step="0.01" />
      </div>
    </div>
  </External>
</template>
