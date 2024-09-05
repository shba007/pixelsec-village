<script setup lang="ts">
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
}>()

const imgs = ['bankDoorOpen', 'bankDoorOpen', 'bankDoorClose']
const playing = true
const speed = 0.015
</script>

<template>
  <AppAnimatedSprite :textures="imgs" :texture-options="textureOptions" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
