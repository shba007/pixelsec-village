<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { onTick } from 'vue3-pixi'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  const ctx = canvas.getContext('2d')

  if (!ctx) return
  ctx.mozImageSmoothingEnabled = true
  ctx.webkitImageSmoothingEnabled = true
})

onTick(() => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  canvas.style.touchAction = !isLandscape.value ? 'auto' : 'none'
})
</script>

<script lang="ts">
export const textureOptions = { scaleMode: 0 }
</script>

<template></template>
