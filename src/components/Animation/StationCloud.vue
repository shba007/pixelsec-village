<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { onTick } from 'vue3-pixi'

const props = defineProps<{
  size: '1' | '2' | '3'
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

watch(
  () => props,
  () => {
    cloud.y = props.y
  }
)

const img = computed(() => {
  switch (props.size) {
    case '1':
      return 'cloud1'
    case '2':
      return 'cloud2'
    case '3':
      return 'cloud3'
    default:
      return 'cloud1'
  }
})
const speed = computed(() => {
  switch (props.size) {
    case '1':
      return 5
    case '2':
      return 10
    case '3':
      return 15
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
  <Sprite :texture="img" :texture-options="{ scaleMode: 'nearest' }" :anchor="0.5" :scale="1" :x="cloud.x"
    :y="cloud.y" />
</template>
