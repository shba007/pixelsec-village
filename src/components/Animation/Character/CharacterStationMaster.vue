<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { State } from '@/utils/types'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'
import { useGameStore } from '@/stores/game'

defineProps<{
  state: State
  place: 'map' | 'station'
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const textures = {
  map: ['mapCharacterStationMaster1', 'mapCharacterStationMaster2', 'mapCharacterStationMaster3'],
  station: ['stationCharacterStationMaster1', 'stationCharacterStationMaster2'],
}
</script>

<template>
  <AppAnimatedSprite :textures="textures[place]" :texture-options="textureOptions.blur" :anchor="0.5" :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
