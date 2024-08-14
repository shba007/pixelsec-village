<script setup lang="ts">
import { SCALE_MODES } from '@/utils/types'

defineProps<{
  x: number
  y: number
  scale: number
}>()

const imgs = ['fountain1', 'fountain2', 'fountain3', 'fountain4', 'fountain5']
const playing = true
const speed = 0.09
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
