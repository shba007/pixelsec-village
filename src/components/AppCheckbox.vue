<script setup lang="ts">
import { computed } from 'vue'
import { textureOptions } from '@/components/AppSettings.vue'

const props = withDefaults(
  defineProps<{
    text: string
    x: number
    y: number
    scale: number
    isChecked: boolean
    gap?: number
    fontSize?: number
  }>(),
  {
    gap: 0,
    fontSize: 44,
  }
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const checkbox = computed(() => {
  let texture = !props.isChecked ? 'buttonSquare' : 'buttonSquarePressed'

  return { texture, scale: 1, style: { fontFamily: 'LAN', fontSize: props.fontSize, align: 'left', lineHeight: props.fontSize * 1.2, stroke: 1, strokeThickness: 1 } }
})

function onClick() {
  emit('click')
}
</script>

<template>
  <Container :x="x" :y="y" :scale="scale" cursor="pointer" @pointerdown="onClick">
    <Sprite :texture="checkbox.texture" :texture-options="textureOptions" :anchor="0.5" :scale="1.35" />
    <Text :x="60 + gap" :y="0" :scale="checkbox.scale" :anchor-x="0" :anchor-y="0.5" :style="checkbox.style">
      {{ text }}
    </Text>
  </Container>
</template>
