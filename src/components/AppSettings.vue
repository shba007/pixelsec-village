<script setup lang="ts">
import { onMounted } from 'vue'
import { useApplication } from 'vue3-pixi'
import { isMobile } from 'pixi.js'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const { motionBlur } = storeToRefs(gameStore)

const app = useApplication()
app.value.resizeTo = window
app.value.renderer.options.antialias = true

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.mozImageSmoothingEnabled = true
  ctx.webkitImageSmoothingEnabled = true
  //

  console.log(app.value.renderer.options.antialias)
  // app.value.stage.sortableChildren = true
  // app.value.renderer.options.powerPreference = 'high-performance'
})
</script>

<script lang="ts">
export const textureOptions = { scaleMode: 0 }
</script>

<template>
  <!-- <BlurFilter :blur="motionBlur ? 0.4 : 0" /> -->
</template>

<style>
canvas {
  image-rendering: optimizeSpeed;
  /* Older versions of FF          */
  image-rendering: -moz-crisp-edges;
  /* FF 6.0+                       */
  image-rendering: -webkit-optimize-contrast;
  /* Safari                        */
  image-rendering: -o-crisp-edges;
  /* OS X & Windows Opera (12.02+) */
  image-rendering: pixelated;
  /* Awesome future-browsers       */
  -ms-interpolation-mode: nearest-neighbor;
  /* IE                            */
}
</style>
