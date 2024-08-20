<script setup lang="ts">
import { getRandomInteger } from '@/utils/helper'
import { useTimeout } from '@vueuse/core'
import { SCALE_MODES } from '@/utils/types'

const props = defineProps<{
  x: number
  y: number
  scale: number
  flip: boolean
}>()

const imgs = props.flip ? ['pigeonLeftStand', 'pigeonLeftPeck'] : ['pigeonRightStand', 'pigeonRightPeck']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = 0.01
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
