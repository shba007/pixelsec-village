<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { External } from 'vue3-pixi'
import Modal from '@/components/Modal.vue'

const options = ref([
  { checked: false, describe: 'Past online shopping' },
  { checked: false, describe: 'Info' },
  { checked: false, describe: 'Bank/Card details' },
  { checked: false, describe: 'Social media profile' },
])
</script>

<template>
  <!-- <External class="absolute left-0 top-0 h-dvh w-dvw"> -->
  <Modal type="long" title="" description="It’s a hot day and you need to cool off. How about a free ice-cream in exchange for your personal data? What are you willing to share?" />
  <!-- </External> -->
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
