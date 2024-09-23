<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimeout } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import { getRandomInteger } from '@/utils/helper'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

defineProps<{
  x: number
  y: number
  scale: number
}>()

const gameStore = useGameStore()
const { textureOptions } = storeToRefs(gameStore)

const textures = ['appSign1', 'appSign2']
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(1000, 2000) / 50000)
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions.blur" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
