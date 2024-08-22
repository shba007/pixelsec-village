<script setup lang="ts">
import { SCALE_MODES } from '@/utils/types'

defineProps<{
  x: number
  y: number
  scale: number
}>()

const imgs = ['bankAlarmBell1', 'bankAlarmBell2']
const playing = true
const speed = 0.05
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
