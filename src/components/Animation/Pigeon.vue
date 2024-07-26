<script setup lang="ts">
import { getRandomInteger } from '@/utils/helper'
import { useTimeout } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  flip: boolean
}>()

const imgs = props.flip ? ['pigeonLeftStand', 'pigeonleftPeck'] : ['pigeonRightStand', 'pigeonRightPeck']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(100, 300) / 10000)
</script>

<template>
  <AnimatedSprite :playing="playing" :animation-speed="speed" :textures="imgs" :anchor="0.5" :scale="scale" :x="x" :y="y" />
</template>
