<script setup lang="ts">
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

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
  <AppAnimatedSprite :blend-mode="1" :textures="imgs[type]" :texture-options="textureOptions" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
