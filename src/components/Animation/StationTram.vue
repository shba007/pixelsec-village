<script setup lang="ts">
import { reactive, watch } from 'vue'
import { onTick } from 'vue3-pixi'
import { textureOptions } from '@/components/Settings.vue'

const props = defineProps<{
  x: number
  y: number
  widthRange: number
}>()

const tram = reactive({ img: 'stationTram', x: props.x, y: props.y, scale: 1, width: 790, speed: 4 })

watch(
  () => props,
  () => {
    tram.y = props.y
  }
)

onTick((delta) => {
  tram.x = tram.x + delta * tram.speed
  if (tram.x > props.widthRange + tram.width / 2) tram.x = -(props.widthRange + tram.width / 2)
})
</script>

<template>
  <Sprite :texture="tram.img" :texture-options="textureOptions" :x="tram.x" :y="tram.y" :scale="tram.scale"
    :anchor-x="0.5" :anchor-y="0.5" />
  <Sprite :texture="'stationTramWire'" :texture-options="textureOptions" :x="0" :y="tram.y - 202" :scale="tram.scale"
    :anchor="0.5" />
</template>
