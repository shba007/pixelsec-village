<script setup lang="ts">
import { External } from 'vue3-pixi'
import rotateIndicator from '@/assets/rotate-indicator.png'
import Modal from '@/components/Modal.vue'
import { useGameStore } from '@/stores/game'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  overlay?: boolean
}>(), {
  overlay: false
})

const gameStore = useGameStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = computed(() => breakpoints.isGreaterOrEqual('md'))

async function handleRotate() {
  await gameStore.toggleGameMode(true)
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh z-50">
    <Modal title="Rotate your<br/> Screen" description="Rotate your Screen<br/> to move forward" :overlay="overlay">
      <button class="flex flex-col justify-center items-center gap-1" container-class="justify-between gap-0 py-4"
        @click="handleRotate">
        <img :src="rotateIndicator" alt="rotate-indicator"
          class="size-[48px] md:size-[80px] object-contain animate-pulse" />
        <span class="text-2xl md:text-4xl opacity-50 font-inet -translate-y-3">Rotate</span>
      </button>
    </Modal>
  </External>
</template>
