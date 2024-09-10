<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  alpha: number
  flip: boolean
}>()

const imgs = props.flip ? ['wolfLeft1', 'wolfLeft2'] : ['wolfRight1', 'wolfRight2']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(100, 200) / 5000)
</script>

<template>
  <AppAnimatedSprite :textures="imgs" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :alpha="alpha" :playing="playing" :animation-speed="speed" />
</template>
