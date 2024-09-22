<script setup lang="ts">
import { onMounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

function loop() {
  const body = document.querySelector<HTMLCanvasElement>('body')!
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.mozImageSmoothingEnabled = true
    ctx.webkitImageSmoothingEnabled = true
  }

  if (isLandscape.value) {
    body.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' })
    canvas.style.touchAction = 'none'
  } else {
    canvas.style.touchAction = 'auto'
  }
}

useIntervalFn(loop, 100)

onMounted(loop)
</script>

<script lang="ts">
export const textureOptions = { scaleMode: 0 }
</script>

<template></template>
