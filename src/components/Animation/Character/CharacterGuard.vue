<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { State } from '@/utils/types'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'
import { useGameStore } from '@/stores/game'

defineProps<{
  state: State
  place: 'map' | 'bank'
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const textures = {
  map: ['mapCharacterGuard1', 'mapCharacterGuard2', 'mapCharacterGuard3'],
  bank: ['bankCharacterGuard1', 'bankCharacterGuard2'],
}
</script>

<template>
  <AppAnimatedSprite :textures="textures[place]" :texture-options="textureOptions.blur" :anchor="0.5" :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
