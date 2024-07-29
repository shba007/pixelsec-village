<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'

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
  <AnimatedSprite :playing="playing" :animation-speed="speed" :textures="imgs" :anchor="0.5" :scale="scale" :x="x" :y="y" />
</template>
