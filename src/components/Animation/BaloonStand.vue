<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'
import { SCALE_MODES } from '@/utils/types'

const props = defineProps<{
  x: number
  y: number
  scale: number
}>()

/* const assets = {
  pink: ['flagPink1', 'flagPink2'],
  'school-blue': ['flagSchoolBlue1', 'flagSchoolBlue2'],
  'school-red': ['flagSchoolRed1', 'flagSchoolRed2'],
  station: ['flagStation1', 'flagStation2'],
} */

const imgs = ['baloon1', 'baloon2']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(1000, 2000) / 50000)
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
