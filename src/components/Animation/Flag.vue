<script setup lang="ts">
import { getRandomInteger } from '@/utils/helper'
import { useTimeout } from '@vueuse/core'
import { computed, ref } from 'vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  type: 'station' | 'school-blue' | 'school-red' | 'pink'
}>()

const assets = {
  pink: ['flagPink1', 'flagPink2'],
  'school-blue': ['flagSchoolBlue1', 'flagSchoolBlue2'],
  'school-red': ['flagSchoolRed1', 'flagSchoolRed2'],
  station: ['flagStation1', 'flagStation2']
}

const imgs = computed(() => assets[props.type])
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(1000, 2000) / 20000)
</script>

<template>
  <AnimatedSprite :playing="playing" :animation-speed="speed" :textures="imgs" :anchor="0.5" :scale="scale" :x="x" :y="y" />
</template>
