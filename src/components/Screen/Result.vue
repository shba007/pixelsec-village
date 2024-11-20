<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import { External } from 'vue3-pixi'

// Import components
import Result1 from '@/components/Screen/Result-1.vue'
import Result2 from '@/components/Screen/Result-2.vue'
import Result3 from '@/components/Screen/Result-3.vue'
import Result4 from '@/components/Screen/Result-4.vue'

const results = {
  strawhut: Result1,
  loghouse: Result2,
  townhouse: Result3,
  mansion: Result4,
}

const dataStore = useDataStore()
const { resultHouse } = storeToRefs(dataStore)
</script>

<template>
  <Component :is="results[resultHouse]" />
  <External class="fixed right-0 top-0 z-50 h-[10vh] portrait:hidden">
    <img src="/logo-full.svg" class="unpixelated h-full object-contain" />
  </External>
</template>
