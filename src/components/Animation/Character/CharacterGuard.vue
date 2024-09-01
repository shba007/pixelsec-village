<script setup lang="ts">
import { onMounted } from 'vue'
import type { State } from '@/utils/types'
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from "@/components/AppAnimatedSprite.vue";

const props = defineProps<{
  state: State
  place: 'map' | 'bank'
}>()

const imgs = {
  map: ['mapCharacterGuard1', 'mapCharacterGuard2', 'mapCharacterGuard3'],
  bank: ['bankCharacterGuard1', 'bankCharacterGuard2'],
}
</script>

<template>
  <AppAnimatedSprite :textures="imgs[place]" :texture-options="textureOptions" :anchor="0.5" :scale="state.scale"
    :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
