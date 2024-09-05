<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { onTick } from 'vue3-pixi'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  widthRange: number
  direction: -1 | 1
}>()

const car = reactive({
  x: props.x,
  y: props.y,
  scale: props.scale,
  speed: 0.015,
  direction: props.widthRange,
})

/* watch(() => props, () => {
    car.x = props.x
    car.y = props.y
    car.scale = props.scale
    car.speed = 0.01
    car.direction = props.widthRange
}, { deep: true }) */

const img = 'mapCar'

onTick((delta) => {
  car.x = car.x + delta * car.speed * car.direction
  if (!(props.x < car.x && car.x < props.x + props.widthRange)) car.direction *= -1
})
</script>

<template>
  <Sprite :texture="img" :texture-options="textureOptions" :x="car.x" :y="car.y" :anchor="0.5" :scale="car.scale" />
</template>
