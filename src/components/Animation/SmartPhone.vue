<script setup lang="ts">
import { ref } from 'vue'
import SmartPhoneButton from './SmartPhoneButton.vue'
import smartphoneBg from '@/assets/station/smartphone.png'

const emit = defineEmits<{
  (event: 'select', items: string[]): void
}>()

const topics = ['email', 'social', 'banking', 'shopping', 'music', 'movie', 'health', 'game']

const selectedTopics = ref<Set<string>>(new Set())

function toggleSelect(topic: string) {
  if (selectedTopics.value.has(topic)) selectedTopics.value.delete(topic)
  else selectedTopics.value.add(topic)

  emit('select', [...selectedTopics.value])
}
</script>

<template>
  <div class="relative h-dvh max-h-[640px] aspect-[400/722]">
    <img :src="smartphoneBg" alt="Smart Phone" class="absolute top-0 left-0 size-full -z-10" />
    <div
      class="grid grid-rows-4 grid-cols-2 gap-0.5 items-center size-full pb-11 px-4 pt-5 lg:px-8 lg:pt-10 lg:pb-[4.5rem]">
      <SmartPhoneButton v-for="(topic, index) of topics" :key="topic" :image="topic"
        :highlighted="selectedTopics.has(topic)"
        :class="[`row-start-${Math.floor(index / 2) + 1} col-start-${(index % 2) + 1}`, index % 2 ? 'justify-self-start' : 'justify-self-end']"
        @click="toggleSelect(topic)" />
    </div>
  </div>
</template>

<style scoped>
:root {
  @apply col-start-1 col-start-2 row-start-1 row-start-2 row-start-3 row-start-4 row-start-5 row-start-5 row-start-6 row-start-7 row-start-8;
}
</style>
