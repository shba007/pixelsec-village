<script setup lang="ts">
import { getRandomInteger } from '@/utils/helper'
import { useTimeout } from '@vueuse/core'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  flip: boolean
}>()

const textures = props.flip ? ['pigeonLeftStand', 'pigeonLeftPeck'] : ['pigeonRightStand', 'pigeonRightPeck']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = 0.01
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
