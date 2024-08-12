<script setup lang="ts">
import { External } from 'vue3-pixi'
import rotateIndicator from '@/assets/rotate-indicator.png'
import Modal from '@/components/Modal.vue'
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh z-50">
    <Modal title="Rotate your<br/> Screen" description="Rotate your Screen<br/> to move forward">
      <div class="flex items-end gap-2">
        <img :src="rotateIndicator" alt="rotate-indicator" class="relative animate-pulse" />
        <span class="pb-2 pt-4 text-xl">Rotate</span>
      </div>
    </Modal>
  </External>
</template>
