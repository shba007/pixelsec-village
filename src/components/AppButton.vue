<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const props = withDefaults(
  defineProps<{
    type: 'arrow' | 'short' | 'long'
    text?: string
    x: number
    y: number
    scale: number
    isPressed: boolean
    fontSize?: number
  }>(),
  {
    fontSize: 44,
  }
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const button = computed(() => {
  let texture = ''

  switch (props.type) {
    case 'arrow':
      texture = !props.isPressed ? 'buttonArrow' : 'buttonArrowPressed'
      break
    case 'short':
      texture = !props.isPressed ? 'buttonShort' : 'buttonShortPressed'
      break
    case 'long':
      texture = !props.isPressed ? 'buttonLong' : 'buttonLongPressed'
      break
  }

  return {
    texture,
    scale: 1,
    style: {
      fontFamily: 'LAN',
      fontSize: props.fontSize,
      align: 'center',
      lineHeight: props.fontSize * 1.2,
      stroke: !props.isPressed ? 'black' : '#506745',
      strokeThickness: 1.5,
      fill: !props.isPressed ? 'black' : '#506745',
    },
  }
})

function onClick() {
  emit('click')
}
</script>

<template>
  <Container :x="x" :y="y" :scale="1" cursor="pointer" @pointerdown="onClick">
    <Sprite :texture="button.texture" :texture-options="textureOptions.normal" :anchor="0.5" :scale="scale" />
    <template v-if="type !== 'arrow'">
      <Text :x="0" :y="isPressed ? 0 : -5" :scale="button.scale" :anchor="0.5" :style="button.style">{{ text }}</Text>
    </template>
  </Container>
</template>
