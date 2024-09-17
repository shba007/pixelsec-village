<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import type { State } from '@/utils/types'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

defineProps<{
  state: State
}>()

const textures = ['characterBaloonVendor1', 'characterBaloonVendor2']
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions.blur" :anchor="0.5" :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
