<script setup lang="ts">
import type { State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'

defineProps<{
  state: State
}>()

const imgs = ['characterBaloonVendor1', 'characterBaloonVendor2']
</script>

<template>
  <AnimatedSprite :textures="imgs" :texture-options="{ scaleMode: SCALE_MODES.LINEAR }" :anchor="0.5" :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
