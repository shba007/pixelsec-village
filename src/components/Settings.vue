<script setup lang="ts">
import { isMobile } from 'pixi.js'
import { onMounted } from 'vue'
import { useApplication } from 'vue3-pixi'

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.mozImageSmoothingEnabled = false
  ctx.webkitImageSmoothingEnabled = false
})

const app = useApplication()
app.value.resizeTo = window
app.value.stage.sortableChildren = true
app.value.renderer.options.antialias = false
app.value.renderer.options.powerPreference = 'high-performance'
app.value.renderer.options.hello = true
</script>

<script lang="ts">
export const textureOptions = { scaleMode: 0 }
</script>

<template></template>

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
