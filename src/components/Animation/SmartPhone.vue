<script setup lang="ts">
import { ref } from 'vue'
import SmartPhoneButton from './SmartPhoneButton.vue'

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
  <div class="smartphone-bg relative grid aspect-[400/722] h-full scale-[115%] grid-cols-2 grid-rows-4 items-center justify-center gap-2 px-5 pb-11 pt-5 lg:px-8 lg:pb-[4.5rem] lg:pt-10">
    <SmartPhoneButton
      v-for="(topic, index) of topics"
      :key="topic"
      :image="topic"
      :highlighted="selectedTopics.has(topic)"
      :class="[`row-start-${Math.floor(index / 2) + 1} col-start-${(index % 2) + 1}`, index % 2 ? 'justify-self-start' : 'justify-self-end']"
      @click="toggleSelect(topic)" />
  </div>
</template>

<style scoped>
:root {
  @apply col-start-1 col-start-2 row-start-1 row-start-2 row-start-3 row-start-4 row-start-5 row-start-6 row-start-7 row-start-8;
}

.smartphone-bg {
  @apply bg-[url('@/assets/station/smartphone.png')] bg-cover bg-center bg-no-repeat;
}
</style>
