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
  place: 'map' | 'park'
}>()

const textures =
  props.place === 'map'
    ? ['mapBaloon1', 'mapBaloon2']
    : [
        'parkBaloon1',
        'parkBaloon2',
        'parkBaloon3',
        'parkBaloon4',
        'parkBaloon5',
        'parkBaloon6',
        'parkBaloon7',
        'parkBaloon8',
        'parkBaloon9',
        'parkBaloon8',
        'parkBaloon7',
        'parkBaloon6',
        'parkBaloon5',
        'parkBaloon4',
        'parkBaloon3',
        'parkBaloon2',
      ]
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref((props.place === 'map' ? 1 : 2) * (getRandomInteger(100, 200) / 2500))
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :playing="playing" :animation-speed="speed" />
</template>
