<script setup lang="ts">
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

defineProps<{
  x: number
  y: number
  scale: number
}>()

const textures = ['portipIcon1', 'portipIcon2']
const playing = true
const speed = 0.08
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
