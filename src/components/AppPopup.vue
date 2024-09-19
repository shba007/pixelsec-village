<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useTimeout, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppButton from '@/components/AppButton.vue'

const props = withDefaults(
  defineProps<{
    type: 'portrait' | 'square' | 'landscape' | 'slim'
    x: 'left' | 'center' | 'right'
    y: 'top' | 'center' | 'bottom'
    zoomFactor: number
    showPopup?: boolean
    showButton?: boolean
    buttonDisabled?: boolean
  }>(),
  {
    showPopup: true,
    showButton: true,
    buttonDisabled: false,
  }
)

const portraitZoomFactor = computed(() => {
  return screenHeight.value / 720
})

const emit = defineEmits<{ next: [] }>()

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const modal = computed(() => {
  let xCord = 0,
    yCord = 0

  if (props.x === 'center' && props.y === 'center' && props.type === 'landscape') {
    xCord = 0
    yCord = -15
  } else if (props.x === 'center' && props.y === 'center' && props.type === 'portrait') {
    xCord = 0
    yCord = 0
  } else if (props.x === 'center' && props.y === 'top') {
    // FIXME: zoom
    xCord = 0
    // yCord = -145
    yCord = -190
  } else if (props.x === 'center' && props.y === 'bottom') {
    xCord = 0
    yCord = 140
  } else if (props.x === 'left' && props.y === 'center') {
    xCord = -275
    yCord = -20
  } else if (props.x === 'right' && props.y === 'center') {
    xCord = 285
    yCord = -20
  }

  return {
    texture: 'popupBg' + capitalizeFirstLetter(props.type),
    state: { x: xCord, y: yCord },
  }
})

const button = reactive({ x: 350, y: 180, scale: 0.5, isPressed: false, isShow: props.showButton })
const ready = useTimeout(200)

onMounted(() => {
  gameStore.playSFXSound('dialogBox')

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
})

function handleButtonPress() {
  if (button.isPressed || props.buttonDisabled) return

  gameStore.playSFXSound('buttonPress')
  setTimeout(() => {
    button.isPressed = true
    setTimeout(() => emit('next'), 300)
  }, 0)
}
</script>

<template>
  <Container v-if="ready" :x="screenWidth * 0.5" :y="screenHeight * 0.5"
    :scale="type === 'portrait' ? portraitZoomFactor * 0.5625 : zoomFactor" :alpha="showPopup ? 1 : 0">
    <Container :x="modal.state.x" :y="modal.state.y">
      <slot name="popupBg" />
      <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <AppButton v-if="button.isShow" type="arrow" :x="button.x" :y="button.y" :scale="button.scale"
        :is-pressed="button.isPressed" @click="handleButtonPress" />
    </Container>
    <Container :x="modal.state.x" :y="modal.state.y">
      <slot />
    </Container>
    <!-- <Sprite texture="popupPositionRight" :texture-options="textureOptions" :anchor="0.5" :scale="4" :alpha="0.8" /> -->
  </Container>
</template>
