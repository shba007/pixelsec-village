<script setup lang="ts">
import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

const options = ref([
  { checked: false, describe: 'Past online shopping' },
  { checked: false, describe: 'Info' },
  { checked: false, describe: 'Bank/Card details' },
  { checked: false, describe: 'Social media profile' },
])

function handleMove() {
  // DATA-COLLECT
  gameStore.nextScene()
  gameStore.nextMapState()
}

useTimeoutFn(handleMove, 4000)
</script>

<template>
  <Modal type="long" title="" description="It’s a hot day and you need to cool off. How about a free ice-cream in exchange for your personal data? What are you willing to share?" y="top" />
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex aspect-[8/3] h-[32px] items-center justify-center bg-contain bg-bottom bg-no-repeat lg:h-[80px];
}

.active-btn.checked {
  @apply bg-[url(@/assets/buttons/square-pressed.png)];
}

.active-btn.unchecked {
  @apply bg-[url(@/assets/buttons/square.png)];
}
</style>
