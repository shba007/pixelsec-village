<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import type { State } from '@/utils/types'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

defineProps<{
  state: State
  place: 'map' | 'park'
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const textures = {
  map: ['mapCharacterIcecreamVendor1', 'mapCharacterIcecreamVendor2'],
  park: ['parkCharacterIcecreamVendorWave1', 'parkCharacterIcecreamVendorWave2'],
}
</script>

<template>
  <AppAnimatedSprite :textures="textures[place]" :texture-options="textureOptions" :anchor="0.5" :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
