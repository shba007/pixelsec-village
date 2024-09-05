<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

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
  station: ['flagStation1', 'flagStation2'],
}

const imgs = computed(() => assets[props.type])
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(1000, 2000) / 20000)
</script>

<template>
  <AppAnimatedSprite :textures="imgs" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
