<script setup lang="ts">
import popup from '@/assets/popup/bg-bar.png'

const props = defineProps<{
  title: string
  containerClass?: string
}>()
</script>

<template>
  <div class="fixed z-10 size-full">
    <div class="absolute left-1/2 top-1/4 flex aspect-[263/73] max-h-[80vh] w-3/4 -translate-x-1/2 -translate-y-1/2 gap-1 md:w-3/5">
      <img :src="popup" alt="popupPortrait" class="absolute left-0 top-0 -z-10 size-full" />
      <div class="relative mx-4 my-3 flex aspect-[27/32] w-fit flex-col items-center justify-center">
        <h6 class="text-2xl text-[26px] text-purple-600 lg:text-[2.5rem] lg:leading-[3rem]">Pro Tip</h6>
        <img src="/images/protip.gif" class="h-[60%]" />
      </div>
      <div class="protip relative mx-auto flex size-full max-w-[820px] flex-col items-center justify-center gap-10 overflow-hidden pr-4" :class="containerClass">
        <p v-if="title" class="text-left text-2xl text-[26px] font-semibold lg:text-[2.5rem] lg:leading-[3rem]" v-html="title" />
      </div>
    </div>
  </div>
</template>

<style lang="css">
p.protip > strong {
  @apply uppercase text-blue-600;
}
</style>
