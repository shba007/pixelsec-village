<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppButton from '@/components/AppButton.vue'

const props = withDefaults(
  defineProps<{
    type: 'portrait' | 'square' | 'landscape' | 'slim'
    x: 'left' | 'center' | 'right'
    y: 'top' | 'center' | 'bottom'
    zoomFactor: number
    showButton?: boolean
  }>(),
  {
    showButton: true,
  }
)

const emit = defineEmits<{ next: [] }>()

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const modal = computed(() => {
  const xFactor = 320,
    yFactor = 160
  let x = 0,
    y = 0

  switch (props.x) {
    case 'left':
      x = -1 * xFactor
      break
    case 'center':
      x = 0 * xFactor
      break
    case 'right':
      x = 1 * xFactor
      break
    default:
      x = 0 * xFactor
      break
  }

  switch (props.y) {
    case 'top':
      y = -1 * yFactor
      break
    case 'center':
      y = 0 * yFactor
      break
    case 'bottom':
      y = 1 * yFactor
      break
    default:
      y = 0 * yFactor
      break
  }

  return {
    texture: 'popupBg' + capitalizeFirstLetter(props.type),
    state: { x, y },
  }
})

const button = reactive({ x: 350, y: 180, scale: 0.5, isPressed: false, isShow: props.showButton })

onMounted(() => {
  switch (props.type) {
    case 'portrait':
      button.x = 100
      button.y = 100
      break
    case 'square':
      button.x = 220
      button.y = 190
      break
    case 'landscape':
      button.x = 350
      button.y = 180
      break
    case 'slim':
      button.x = 450
      button.y = 80
      break
  }

  gameStore.playSFXSound('dialogBox')
})

function handleButtonPress() {
  if (button.isPressed) return

  button.isPressed = true
  gameStore.playSFXSound('buttonPress')

  setTimeout(() => emit('next'), 100)
}
</script>

<template>
  <Container :x="screenWidth * 0.5" :y="screenHeight * 0.5" :scale="zoomFactor">
    <Container :x="modal.state.x" :y="modal.state.y">
      <slot name="popupBg" />
      <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <AppButton v-if="button.isShow" type="arrow" :x="button.x" :y="button.y" :scale="button.scale" :is-pressed="button.isPressed" @click="handleButtonPress" />
    </Container>
    <Container :x="modal.state.x" :y="modal.state.y">
      <slot />
    </Container>
  </Container>
</template>
