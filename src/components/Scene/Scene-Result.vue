<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
</script>

<template>
  <Modal title="" type="short" x="left" container-class="!gap-0 !pt-8 text-left !justify-between">
    <!-- <p class="text-left text-3xl lg:text-[2.5rem] lg:leading-[3rem]" v-html="'Are you willing to<br/>exchange your data<br/>for rebates or<br/>rewards?'" /> -->
    <div class="flex flex-col items-start pl-6">
      <h1 class="text-[1.4rem] font-semibold uppercase leading-[1.75rem] lg:text-[2.5rem] lg:leading-[3rem]" v-html="'YOUR DATA LIVE<br/>IN A VULNERABLE<br/>STRAW HUT'" />
      <p
        class="text-[1.25rem] leading-[1.5rem] lg:text-[2.5rem] lg:leading-[3rem]"
        v-html="'Identity and data protection are<br/>new to you. This makes you an<br/>easy target for your valuable<br/>information to be exposed.'" />
    </div>
    <input type="email" placeholder="ENTER EMAIL FOR A FULL REPORT" class="w-full border-2 px-4 py-2 placeholder:text-blue-500" />
  </Modal>
</template>
