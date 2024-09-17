<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { computed, watch } from 'vue'
import { textureOptions } from '@/components/AppSettings.vue'
import { reactive } from 'vue'
import AppButton from './AppButton.vue'
import { onMounted } from 'vue'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const props = defineProps<{
  type: 'portrait' | 'square' | 'landscape' | 'slim'
  x: 'left' | 'center' | 'right'
  y: 'top' | 'center' | 'bottom'
  zoomFactor: number
}>()

const emit = defineEmits<{ next: [] }>()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => {
  let x = 0,
    y = 0

  switch (props.x) {
    case 'left':
      x = 0.25
      break

    case 'center':
      x = 0.5
      break
    case 'right':
      x = 0.75
      break
    default:
      x = 0
      break
  }

  switch (props.y) {
    case 'top':
      y = 0.25
      break

    case 'center':
      y = 0.5
      break
    case 'bottom':
      y = 0.75
      break
    default:
      x = 0
      break
  }

  return {
    texture: 'popupBg' + capitalizeFirstLetter(props.type),
    state: { x, y },
  }
})

const button = reactive({ x: 350, y: 180, scale: 0.5, isPressed: false })

onMounted(() => {
  switch (props.type) {
    case 'landscape':
      button.x = 350
      button.y = 180
      break

    case 'square':
      button.x = 210
      button.y = 180
    default:
      break
  }
})

function handleButtonPress() {
  if (button.isPressed) return

  button.isPressed = true

  setTimeout(() => emit('next'), 100)
}
</script>

<template>
  <Container :x="screenWidth * modal.state.x" :y="screenHeight * modal.state.y" :scale="zoomFactor">
    <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <AppButton type="arrow" :x="button.x" :y="button.y" :scale="button.scale" :is-pressed="button.isPressed" @click="handleButtonPress" />
    <Container>
      <slot />
    </Container>
  </Container>
</template>
