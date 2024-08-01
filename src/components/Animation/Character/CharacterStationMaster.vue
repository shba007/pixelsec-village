<script setup lang="ts">
defineProps<{
  x: number
  y: number
  scale: number
}>()

const imgs = ['characterStationMasterWave1', 'characterStationMasterWave2', 'characterStationMasterWave3']
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: 'nearest' }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="true" :animation-speed="0.05" />
</template>
