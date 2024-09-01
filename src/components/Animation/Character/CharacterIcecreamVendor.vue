<script setup lang="ts">
import type { State } from '@/utils/types'
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from "@/components/AppAnimatedSprite.vue";

defineProps<{
  state: State
  place: 'map' | 'park'
}>()

const imgs = {
  map: ['mapCharacterIcecreamVendor1', 'mapCharacterIcecreamVendor2'],
  park: ['parkCharacterIcecreamVendorWave1', 'parkCharacterIcecreamVendorWave2'],
  parkHandout: ['parkCharacterIcecreamVendorHandout'],
}
</script>

<template>
  <AppAnimatedSprite :textures="imgs[place]" :texture-options="textureOptions" :anchor="0.5" :scale="state.scale"
    :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
