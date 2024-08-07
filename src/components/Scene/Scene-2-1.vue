<script setup lang="ts">
import { External } from 'vue3-pixi'
import rotateIndicator from '@/assets/rotate-indicator.png'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints, useTimeoutFn } from '@vueuse/core'
import { computed, onMounted } from 'vue'
</script>

<template>
  <External class="absolute top-0 left-0 w-screen h-screen">
    <Modal title="" description="">
      <p>Please verify your age for tram ticket purchase</p>
    </Modal>
  </External>
</template>
