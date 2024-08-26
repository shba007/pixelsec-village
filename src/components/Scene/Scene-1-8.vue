<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import rotateIndicator from '@/assets/rotate-indicator.png'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

async function handleStart() {
  gameStore.nextScene()
}

onMounted(() => {
  if (isLandscape.value) useTimeoutFn(handleStart, 3000)
})

watch(isLandscape, (value) => {
  if (value) useTimeoutFn(handleStart, 3000)
})
</script>

<template>
  <Modal title="" :container-class="(!isLandscape ? 'justify-between gap-0 !pt-9 ' : '!pt-9') + ' text-center'" description="What annoys you most</br>about data sharing?">
    <button v-if="!isLandscape" class="flex flex-col items-center justify-center gap-1 pb-3" @click="handleStart">
      <img :src="rotateIndicator" alt="rotate-indicator" class="size-[48px] object-contain md:size-[72px]" />
      <span class="-translate-y-3 font-inet text-2xl opacity-50 md:text-4xl">Full screen</span>
    </button>
  </Modal>
</template>
