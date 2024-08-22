<script setup lang="ts">
import { SCALE_MODES, BLEND_MODES } from '@/utils/types'
// type BLEND_MODES = "add" | "color" | "min" | "max" | "inherit" | "normal" | "multiply" | "screen" | "darken" | "lighten" | "erase" | "color-dodge" | "color-burn" | "linear-burn" | "linear-dodge"

defineProps<{
  x: number
  y: number
  scale: number
  type: 'left' | 'right'
}>()

const imgs = {
  left: ['bankAlarmLightLeft1', 'bankAlarmLightLeft2'],
  right: ['bankAlarmLightRight1', 'bankAlarmLightRight2'],
}
const playing = true
const speed = 0.05
</script>

<template>
  <AnimatedSprite :blend-mode="1" :textures="imgs[type]" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
