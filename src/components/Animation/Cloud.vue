<script setup lang="ts">
import { computed, reactive } from 'vue'
import { onTick } from 'vue3-pixi'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  place: 'map' | 'station' | 'park' | 'bank'
  size: 'lg' | 'md' | 'sm'
  x: number
  y: number
  scale: number
  direction: number
  widthRange: number
}>()

const cloud = reactive({
  x: props.x,
  y: props.y,
  scale: props.scale,
  direction: props.direction,
  width: 200,
})

const texture = computed(() => {
  switch (props.size) {
    case 'lg':
      return props.place + 'CloudLarge'
    case 'md':
      return props.place + 'CloudMedium'
    case 'sm':
      return props.place + 'CloudSmall'
    default:
      return props.place + 'CloudLarge'
  }
})

const speed = computed(() => {
  const factor = 0.03125

  switch (props.size) {
    case 'lg':
      return 15 * factor
    case 'md':
      return 25 * factor
    case 'sm':
      return 35 * factor
    default:
      return 15 * factor
  }
})

onTick((delta) => {
  cloud.x = cloud.x + delta * speed.value
  if (cloud.x > props.widthRange + cloud.width / 2) cloud.x = -(props.widthRange + cloud.width / 2)
})
</script>

<template>
  <Sprite :texture="texture" :texture-options="textureOptions" :x="cloud.x" :y="cloud.y" :anchor="0.5" :scale="cloud.scale" />
</template>
