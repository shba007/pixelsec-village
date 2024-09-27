<script setup lang="ts">
import { reactive } from 'vue'
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
  texture: 'mapCar',
  x: props.x,
  y: props.y,
  scale: props.scale,
  speed: 0.5,
  direction: props.widthRange,
})

onTick((delta) => {
  if (car.x <= props.x) car.direction = 1
  else if (car.x >= props.x + props.widthRange) car.direction = -1
  car.x += car.speed * car.direction * delta
})
</script>

<template>
  <Sprite :texture="car.texture" :texture-options="textureOptions" :x="car.x" :y="car.y" :anchor="0.5" :scale="car.scale" />
</template>
