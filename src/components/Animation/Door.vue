<script setup lang="ts">
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = withDefaults(
  defineProps<{
    x: number
    y: number
    scale: number
    playing: boolean
    place: 'map' | 'bank'
  }>(),
  {
    playing: true,
  }
)

const textures = props.place === 'map' ? ['mapDoorOpen', 'mapDoorOpen', 'mapDoorClose'] : ['bankDoorOpen', 'bankDoorOpen', 'bankDoorClose']
const speed = 0.015
</script>

<template>
  <AppAnimatedSprite :textures="playing ? textures : [textures[2]]" :texture-options="textureOptions" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
