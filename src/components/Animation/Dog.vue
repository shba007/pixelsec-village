<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

defineProps<{
  x: number
  y: number
  scale: number
}>()

const textures = ['resultMansionDog1', 'resultMansionDog2']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(100, 200) / 5000)
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
