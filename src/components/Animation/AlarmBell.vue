<script setup lang="ts">
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'bank' | 'popup'
}>()

const textures = props.place === 'bank' ? ['bankAlarmBellScene1', 'bankAlarmBellScene2'] : ['bankAlarmBellPopup1', 'bankAlarmBellPopup2']
const playing = true
const speed = 0.1
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :x="x" :y="y" :scale="scale" :playing="playing" :animation-speed="speed" />
</template>
