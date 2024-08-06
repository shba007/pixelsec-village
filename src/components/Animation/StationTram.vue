<script setup lang="ts">
import { sawTooth } from '@/utils/helper';
import { reactive, ref, watch } from 'vue'
import { onTick } from 'vue3-pixi';

const props = defineProps<{
  x: number
  y: number
  widthRange: number
}>()

const tram = reactive({ img: 'stationTram', x: props.x, y: props.y, scale: 1 })

watch(
  () => props,
  () => {
    tram.y = props.y
  }
)
const speed = ref(50)

onTick((delta) => {
  tram.x = sawTooth(tram.x, delta * 0.05 * speed.value, props.widthRange + 100, props.widthRange + 100)
})
</script>

<template>
  <Sprite :texture="tram.img" :texture-options="{ scaleMode: 'nearest' }" :x="tram.x * 1.8 - 1240" :y="tram.y"
    :scale="tram.scale" :anchor-y="0.5" />
  <Sprite :texture="'stationTramWire'" :x="tram.x * 1.8 - 1240" :y="tram.y" :scale="tram.scale" :anchor="0.5" />
</template>
