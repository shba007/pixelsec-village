<script setup lang="ts">
import { Point } from 'pixi.js'
import { computed, ref, reactive, onMounted, watchEffect } from 'vue'
import { External } from 'vue3-pixi'
import { useResizeObserver, useTimeoutFn, useWindowSize, watchArray } from '@vueuse/core'

import { textureOptions } from '@/components/Settings.vue'

const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'strawhut' | 'log-house' | 'townhouse' | 'mansion'
}>()

const emit = defineEmits<{
  (event: 'update'): void
}>()

const image = ref('popupScene71')
const scale = ref(1)
const modal = computed(() => ({
  image: image.value,
  state: { x: props.x, y: props.y, scale: props.scale * scale.value },
}))

onMounted(() => {
  switch (props.place) {
    case 'strawhut':
      image.value = 'popupScene71'
      break
    case 'log-house':
      image.value = 'popupScene72'
      break
    case 'townhouse':
      image.value = 'popupScene73'
      break
    case 'mansion':
      image.value = 'popupScene74'
      break
  }
})

useTimeoutFn(() => {
  image.value = 'popupScene8'
  // scale.value = 0.5
  emit('update')
}, 12000)

const container = ref<any>(null)
const inputBoxRelPosition = reactive({ x: -460, y: -80, scale: 1.4, width: 345, height: 40 })
const inputBoxAbsPosition = reactive({ x: 0, y: 0, scale: 1, width: 345, height: 40 })

function getGlobalPositionAndScale(element: any) {
  // Calculate the local center point of the element
  const localCenter = new Point(element.width / 2, element.height / 2)

  // Convert the local center to global coordinates
  const globalCenterPosition = element.toGlobal(localCenter)

  // Initialize scale to the element's local scale
  let globalScale = { x: element.scale.x, y: element.scale.y }

  // Traverse up the parent chain to accumulate scales
  let parent = element.parent
  while (parent) {
    globalScale.x *= parent.scale.x
    globalScale.y *= parent.scale.y
    parent = parent.parent
  }

  return {
    x: globalCenterPosition.x,
    y: globalCenterPosition.y,
    scaleX: globalScale.x,
    scaleY: globalScale.y,
  }
}

const { width, height } = useWindowSize()

function resize() {
  if (!container.value) return

  const globalPosition = getGlobalPositionAndScale(container.value)

  inputBoxAbsPosition.x = globalPosition.x + inputBoxRelPosition.x * globalPosition.scaleX
  inputBoxAbsPosition.y = globalPosition.y + inputBoxRelPosition.y * globalPosition.scaleY
  inputBoxAbsPosition.scale = globalPosition.scaleX * inputBoxRelPosition.scale
}

watchArray([width, height], resize)
onMounted(resize)
</script>

<template>
  <Container ref="container" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <!-- <External class="fixed z-10 "
      :style="{ 'left': inputBoxAbsPosition.x + 'px', 'top': inputBoxAbsPosition.y + 'px', 'width': inputBoxAbsPosition.width + 'px', 'height': inputBoxAbsPosition.height + 'px', transform: `scale(${inputBoxAbsPosition.scale}) translateY(-50%)` }">
      <input type="email" placeholder="ENTER EMAIL FOR A FULL REPORT"
        class="border-2 w-full px-4 py-2 placeholder:text-blue-500" />
    </External> -->
    <!-- <External>
      <div class="fixed bottom-0 left-16 z-50 flex w-fit items-center gap-8">
        <div class="flex flex-col gap-2">
          <input v-model="inputBoxRelPosition.x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="inputBoxRelPosition.y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="inputBoxRelPosition.scale" type="number" min="0" max="10" step="0.01" />
        </div>
      </div>
    </External> -->
  </Container>
</template>
