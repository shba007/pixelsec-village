<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'bank' | 'popup'
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const textures = props.place === 'bank' ? ['bankAlarmBellScene1', 'bankAlarmBellScene2'] : ['bankAlarmBellPopup1', 'bankAlarmBellPopup2']
const playing = true
const speed = 0.1
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions.blur" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
