<script setup lang="ts">
import { computed } from 'vue'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  type: 'arrow' | 'short' | 'long'
  text?: string
  x: number
  y: number
  scale: number
  isPressed: boolean
  fontSize?: number
}>()

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
      fontSize: props.fontSize ?? 44,
      align: 'center',
      lineHeight: props.fontSize * 1.2 ?? 36,
      stroke: 1,
      strokeThickness: 1,
      fill: props.isPressed ? '#506745' : 'black',
    },
  }
})

function onClick() {
  emit('click')
}
</script>

<template>
  <Container :x="x" :y="y" :scale="1" cursor="pointer" @pointerdown="onClick">
    <Sprite :texture="button.texture" :texture-options="textureOptions" :anchor="0.5" :scale="4 * scale" />
    <template v-if="type !== 'arrow'">
      <Text :x="0" :y="-5" :scale="button.scale" :anchor="0.5" :style="button.style">{{ text }}</Text>
    </template>
  </Container>
</template>
