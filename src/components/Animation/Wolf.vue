<script setup lang="ts">
import { ref } from 'vue'
import { useTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/utils/helper'
import { SCALE_MODES } from '@/utils/types'

const props = defineProps<{
  x: number
  y: number
  scale: number
  flip: boolean
}>()

const imgs = props.flip ? ['wolfLeft1', 'wolfLeft2'] : ['wolfRight1', 'wolfRight2']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(100, 200) / 5000)
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
