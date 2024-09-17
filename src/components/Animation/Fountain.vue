<script setup lang="ts">
import { textureOptions } from '@/components/AppSettings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'map' | 'park'
}>()

const textures =
  props.place === 'map'
    ? ['mapFountain1', 'mapFountain2', 'mapFountain3', 'mapFountain4', 'mapFountain5']
    : ['parkFountain1', 'parkFountain2', 'parkFountain3', 'parkFountain4', 'parkFountain5', 'parkFountain6', 'parkFountain7', 'parkFountain8']
const playing = true
const speed = 0.09
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
