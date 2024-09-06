<script setup lang="ts">
import { computed, watch } from 'vue'
import { useInterval } from '@vueuse/core'
import { textureOptions as inheritedTextureOptions } from '@/components/AppSettings.vue'

const props = withDefaults(
  defineProps<{
    textures: string[]
    x: number
    y: number
    scale: number
    anchor: number
    playing: boolean
    animationSpeed: number
    textureOptions: any
  }>(),
  { animationSpeed: 1 }
)

// count will increase every 200ms
const { counter, pause, reset, resume } = useInterval(20 / props.animationSpeed, { immediate: props.playing, controls: true })
const textureIndex = computed(() => counter.value % props.textures.length)

watch(
  () => props.playing,
  (value) => {
    if (value) {
      reset()
      resume()
    } else {
      pause()
      reset()
    }
  }
)
</script>

<template>
  <Sprite :texture="textures[textureIndex]" :key="textureIndex" :texture-options="inheritedTextureOptions" :x="x" :y="y"
    :scale="scale" :anchor="anchor" cursor="pointer" />
</template>
