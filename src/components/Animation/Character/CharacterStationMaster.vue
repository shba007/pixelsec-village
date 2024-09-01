<script setup lang="ts">
import type { State } from '@/utils/types'
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from "@/components/AppAnimatedSprite.vue";

const props = defineProps<{
  state: State
  place: 'map' | 'station'
}>()

const imgs = {
  map: ['mapCharacterStationMaster1', 'mapCharacterStationMaster2', 'mapCharacterStationMaster3'],
  station: ['stationCharacterStationMaster1', 'stationCharacterStationMaster2'],
}
</script>

<template>
  <AppAnimatedSprite :textures="imgs[place]" :texture-options="textureOptions" :anchor="0.5" :scale="state.scale"
    :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
