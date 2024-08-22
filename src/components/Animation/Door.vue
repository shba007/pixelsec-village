<script setup lang="ts">
import { SCALE_MODES } from '@/utils/types'

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
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
