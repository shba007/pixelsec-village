<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { onTick } from 'vue3-pixi'

const props = defineProps<{
  size: '1' | '2' | '3'
  x: number
  y: number
  direction: number
  widthRange: number
}>()

const cloud = reactive({
  x: props.x,
  y: props.y,
  direction: props.direction,
  width: 200
})

watch(
  () => props,
  () => {
    cloud.y = props.y
  }
)

const img = computed(() => {
  switch (props.size) {
    case '1':
      return 'cloud1'
    case '2':
      return 'cloud2'
    case '3':
      return 'cloud3'
    default:
      return 'cloud1'
  }
})

const speed = computed(() => {
  switch (props.size) {
    case '1':
      return 1
    case '2':
      return 1.5
    case '3':
      return 2
    default:
      return 2
  }
})

onTick((delta) => {
  cloud.x = cloud.x + delta * speed.value
  if (cloud.x > props.widthRange + cloud.width / 2) cloud.x = -(props.widthRange + cloud.width / 2)
})
</script>

<template>
  <Sprite :texture="img" :texture-options="{ scaleMode: 'nearest' }" :anchor="0.5" :scale="1" :x="cloud.x" :y="cloud.y" />
</template>
