<script setup lang="ts">
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'bank' | 'popup'
}>()

const imgs = props.place === 'bank' ? ['bankAlarmBellScene1', 'bankAlarmBellScene2'] : ['bankAlarmBellPopup1', 'bankAlarmBellPopup2']
const playing = true
const speed = 0.1
</script>

<template>
  <AppAnimatedSprite :textures="imgs" :texture-options="textureOptions" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
