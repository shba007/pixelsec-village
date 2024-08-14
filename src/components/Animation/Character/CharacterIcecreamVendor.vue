<script setup lang="ts">
import type { State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'

defineProps<{
  state: State
  place: 'map' | 'park'
}>()

const imgs = {
  map: ['mapCharacterIcecreamVendor1', 'mapCharacterIcecreamVendor2'],
  park: ['parkCharacterIcecreamVendorWave1', 'parkCharacterIcecreamVendorWave2', 'parkCharacterIcecreamVendorHandout']
}
</script>

<template>
  <AnimatedSprite :textures="imgs[place]" :texture-options="{ scaleMode: SCALE_MODES.LINEAR }" :anchor="0.5"
    :scale="state.scale" :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
