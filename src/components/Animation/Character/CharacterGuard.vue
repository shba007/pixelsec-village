<script setup lang="ts">
import { onMounted } from 'vue'
import type { State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'

const props = defineProps<{
  state: State
  place: 'map' | 'bank'
}>()

const imgs = {
  map: ['mapCharacterGuard1', 'mapCharacterGuard2'],
  bank: ['bankCharacterGuard1', 'bankCharacterGuard2'],
}
</script>

<template>
  <AnimatedSprite :textures="imgs[place]" :texture-options="{ scaleMode: SCALE_MODES.LINEAR }" :anchor="0.5"
    :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
