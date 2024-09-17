<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import type { State } from '@/utils/types'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const gameStore = useGameStore()
const { currentSceneIndex } = storeToRefs(gameStore)

const props = defineProps<{
  state: State
  place: 'map' | 'park'
}>()

const textures = {
  map: ['mapCharacterIcecreamVendor1', 'mapCharacterIcecreamVendor2'],
  park: ['parkCharacterIcecreamVendorWave1', 'parkCharacterIcecreamVendorWave2'],
}

watch(currentSceneIndex, (value) => {
  if (props.place !== 'map') console.log({ currentSceneIndex: value })
})
</script>

<template>
  <AppAnimatedSprite :textures="textures[place]" :texture-options="textureOptions" :anchor="0.5" :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
