<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

defineProps<{
  x: number
  y: number
  scale: number
  type: 'left' | 'right'
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const textures = {
  left: ['bankAlarmLightLeft1', 'bankAlarmLightLeft2'],
  right: ['bankAlarmLightRight1', 'bankAlarmLightRight2'],
}
const playing = true
const speed = 0.05
</script>

<template>
  <AppAnimatedSprite :blend-mode="1" :textures="textures[type]" :texture-options="textureOptions.blur" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
