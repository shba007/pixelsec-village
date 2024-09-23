<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import { External } from 'vue3-pixi'

import Result1 from '@/components/Screen/Result-1.vue'
import Result2 from '@/components/Screen/Result-2.vue'
import Result3 from '@/components/Screen/Result-3.vue'
import Result4 from '@/components/Screen/Result-4.vue'

const dataStore = useDataStore()
const { resultHouse } = storeToRefs(dataStore)
</script>

<template>
  <Result1 v-if="resultHouse === 1" />
  <Result2 v-else-if="resultHouse === 2" />
  <Result3 v-else-if="resultHouse === 3" />
  <Result4 v-else />
  <External class="fixed right-0 top-0 z-50 h-[10vh] portrait:hidden">
    <img src="/logo-full.png" class="unpixelated h-full object-contain" />
  </External>
</template>
