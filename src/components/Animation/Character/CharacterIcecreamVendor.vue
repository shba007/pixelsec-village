<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGameStore } from '@/stores/game';
import type { State } from '@/utils/types'
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from '@/components/AppAnimatedSprite.vue'

const gameStore = useGameStore()
const { currentSceneIndex } = storeToRefs(gameStore)

const props = defineProps<{
  state: State
  place: 'map' | 'park'
}>()

const imgs = {
  map: { wave: ['mapCharacterIcecreamVendor1', 'mapCharacterIcecreamVendor2'] },
  park: { wave: ['parkCharacterIcecreamVendorWave1', 'parkCharacterIcecreamVendorWave2'], handout: ['parkCharacterIcecreamVendorHandout'] },
}

const images = ref<string[]>(imgs.map.wave)

onMounted(() => {
  if (props.place == 'map')
    images.value = imgs.map.wave
  else
    images.value = imgs.park.wave
})

watch(currentSceneIndex, (value) => {
  if (props.place !== 'map')
    console.log({ currentSceneIndex: value })
})
</script>

<template>
  <AppAnimatedSprite :textures="images" :texture-options="textureOptions" :anchor="0.5" :scale="state.scale"
    :x="state.x" :y="state.y" :playing="true" :animation-speed="0.03" />
</template>
