<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'
import { SCALE_MODES } from '@/utils/types'

defineProps<{
  x: number
  y: number
  scale: number
}>()

const imgs = ['wave1', 'wave2', 'wave3', 'wave4', 'wave5', 'wave4', 'wave3', 'wave2']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(500, 1000) / 20000)
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
