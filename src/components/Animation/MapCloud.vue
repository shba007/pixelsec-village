<script setup lang="ts">
import { computed, reactive } from 'vue'
import { onTick } from 'vue3-pixi'

const props = defineProps<{
  size: 'lg' | 'md' | 'sm'
  x: number
  y: number
  direction: number
  widthRange: number
}>()

const cloud = reactive({
  x: props.x,
  y: props.y,
  direction: props.direction
})

const img = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'cloudLarge'
    case 'md':
      return 'cloudMedium'
    case 'sm':
      return 'cloudSmall'
    default:
      return 'cloudLarge'
  }
})
const speed = computed(() => {
  switch (props.size) {
    case 'lg':
      return 15
    case 'md':
      return 25
    case 'sm':
      return 50
    default:
      return 15
  }
})

function sawTooth(prevT: number, t: number, period: number, amplitude: number) {
  const normalizedTime = (prevT + t) % period
  const sawToothValue = normalizedTime % amplitude
  return sawToothValue
}

function reverseSawTooth(prevT: number, t: number, period: number, amplitude: number) {
  const normalizedTime = (prevT + t) % period
  const sawToothValue = normalizedTime % amplitude
  return sawToothValue
}

const interpolFunc = cloud.direction == 1 ? sawTooth : reverseSawTooth

onTick((delta) => {
  cloud.x = interpolFunc(cloud.x, delta * 0.05 * speed.value, props.widthRange + 100, props.widthRange + 100)
})
</script>

<template>
  <Sprite :texture="img" :texture-options="{ scaleMode: 'nearest' }" :anchor="0.5" :scale="1" :x="cloud.x" :y="cloud.y" />
</template>
