<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
const emit = defineEmits<{
  (event: 'start'): void
}>()
</script>

<template>
  <div
    class="absolute left-1/2 top-1/2 aspect-[65/106] w-4/5 h-4/5 -translate-x-1/2 -translate-y-1/2 bg-[url('@/assets/popup-bg-1.png')] sm:bg-[url('@/assets/popup-bg-2.png')] bg-contain bg-center bg-no-repeat p-1 md:aspect-[212/130]">
    <div class="flex h-full w-full flex-col items-center justify-center gap-10 px-7 py-8 max-w-[820px] mx-auto">
      <h1 class="text-center text-2xl font-bold uppercase">{{ title }}</h1>
      <p class="text-center text-2xl">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>
