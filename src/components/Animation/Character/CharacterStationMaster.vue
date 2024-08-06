<script setup lang="ts">
const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'map' | 'station'
}>()

const imgs = {
  // 'map': ['mapCharacterStationMaster1', 'mapCharacterStationMaster2', 'mapCharacterStationMaster3'],
  map: ['stationCharacterStationMaster1', 'stationCharacterStationMaster2'],
  station: ['stationCharacterStationMaster1', 'stationCharacterStationMaster2']
}
</script>

<template>
  <AnimatedSprite :textures="imgs[place]" :texture-options="{ scaleMode: 'nearest' }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="true" :animation-speed="0.05" />
</template>
