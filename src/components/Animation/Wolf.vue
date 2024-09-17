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
  alpha: number
  type: 'map' | 'strawhut' | 'single'
  flip?: boolean
}>()

const textures = computed(() => {
  let result: string[] = []

  switch (props.type) {
    case 'single':
      result = props.flip ? ['wolfLeft1', 'wolfLeft2'] : ['wolfRight1', 'wolfRight2']
      break
    case 'map':
      result = ['mapWolve1', 'mapWolve2', 'mapWolve3']
      break
    case 'strawhut':
      result = ['resultStrawHutWolve1', 'resultStrawHutWolve2', 'resultStrawHutWolve3', 'resultStrawHutWolve4', 'resultStrawHutWolve5']
      break
  }

  return result
})
const playing = useTimeout(getRandomInteger(100, 2000))
const speed = ref(getRandomInteger(100, 200) / 5000)
</script>

<template>
  <AppAnimatedSprite :textures="textures" :texture-options="textureOptions" :anchor="0.5" :scale="scale" :x="x" :y="y" :alpha="alpha" :playing="playing" :animation-speed="speed" />
</template>
