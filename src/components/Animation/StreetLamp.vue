<script setup lang="ts">
import { getRandomInteger } from '@/utils/helper'
import { useTimeout } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
}>()

const imgs = ['streetLamp1', 'streetLamp2', 'streetLamp3', 'streetLamp4', 'streetLamp5']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(1000, 2000) / 20000)
</script>

<template>
  <AnimatedSprite :playing="playing" :animation-speed="speed" :textures="imgs" :anchor="0.5" :scale="scale" :x="x" :y="y" />
</template>
