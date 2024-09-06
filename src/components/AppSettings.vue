<script setup lang="ts">
import { onMounted } from 'vue'
import { useApplication } from 'vue3-pixi'
import { isMobile } from 'pixi.js'

const app = useApplication()
// app.value.renderer.options.antialias = true

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

<template></template>
