<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { useTimeoutFn } from '@vueuse/core'

import { textureOptions } from '@/components/AppSettings.vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  x: number
  y: number
  scale: number
  place: 'strawhut' | 'loghouse' | 'townhouse' | 'mansion'
}>()

const emit = defineEmits<{
  (event: 'update'): void
}>()

const gameStore = useGameStore()
const { characterSkin, rotationStop } = storeToRefs(gameStore)

const secondScreen = ref(false)
const image = ref('popupScene71')
const scale = ref(1)
const modal = computed(() => ({
  image: !secondScreen.value ? image.value : 'popupScene8',
  state: { x: props.x, y: props.y, scale: props.scale * scale.value },
}))

onMounted(() => {
  switch (props.place) {
    case 'strawhut':
      image.value = 'popupScene71'
      break
    case 'loghouse':
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
  gameStore.playSFXSound('dialogBox')
  secondScreen.value = true
  emit('update')
}, 12000)

const socials = ref([
  { type: 'facebook' as const, image: 'IconFacebook', x: -49 - 40, y: 103 - 20, scale: 0.24 },
  { type: 'instagram' as const, image: 'IconInstagram', x: -3, y: 103 - 20, scale: 0.24 },
  { type: 'x' as const, image: 'IconX', x: 36 + 40, y: 103 - 20, scale: 0.24 },
])

function onShare(type: 'facebook' | 'instagram' | 'x', event?: string) {
  console.log('Shared on ', type, event)
  const shareURL = 'https://affinidi-game-poc.onrender.com' + `/html/${props.place}-${characterSkin.value}.html`
  let finalShare = ''

  switch (type) {
    case 'facebook':
      finalShare = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareURL)
      break
    case 'instagram':
      finalShare = 'https://www.instagram.com/sharer/sharer.php?u=' + encodeURIComponent(shareURL)
      break
    case 'x':
      finalShare = 'https://www.x.com/sharer/sharer.php?u=' + encodeURIComponent(shareURL)
      break
  }

  window.open(finalShare, '_blank')
}

const emailPlaceholder = reactive({ x: 0, y: 180, scale: 0.5 })
const emailPlaceholderRef = ref<any>(null)
const emailInputBox = reactive({ x: 0, y: 0, width: 0, height: 0 })

onTick(() => {
  if (emailPlaceholderRef.value) {
    const localBounds = emailPlaceholderRef.value.getLocalBounds() // Get local bounds of the sprite
    const scaleX = emailPlaceholderRef.value.worldTransform.a // Get global scale on X-axis
    const scaleY = emailPlaceholderRef.value.worldTransform.d // Get global scale on Y-axis

    const width = localBounds.width * scaleX
    const height = localBounds.height * scaleY

    const { x, y } = emailPlaceholderRef.value.getGlobalPosition()
    emailInputBox.x = x - width / 2
    emailInputBox.y = y - height / 2

    emailInputBox.width = width
    emailInputBox.height = height
  }
})

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})
</script>

<template>
  <Container v-if="!rotationStop" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Sprite ref="emailPlaceholderRef" :texture="'PlaceholderEmail'" :texture-options="textureOptions" :anchor="0.5" :x="emailPlaceholder.x" :y="emailPlaceholder.y" :scale="emailPlaceholder.scale" />
    <External class="fixed z-10" :style="{ left: emailInputBox.x + 'px', top: emailInputBox.y + 'px' }">
      <input
        type="email"
        class="border-2 bg-transparent px-4 py-2 placeholder:font-bold placeholder:text-blue-500 focus:bg-white md:text-lg"
        :style="{ width: emailInputBox.width + 'px', height: emailInputBox.height + 'px' }" />
    </External>
    <Container v-if="secondScreen">
      <Sprite
        v-for="{ type, image, x, y, scale } of socials"
        :key="type"
        :texture="image"
        :texture-options="textureOptions"
        :x="x"
        :y="y"
        :scale="scale"
        :anchor="0.5"
        cursor="pointer"
        @pointerdown="onShare(type, 'pointerdown')" />
    </Container>
    <!-- <External>
      <div class="fixed bottom-0 left-16 z-50 flex w-fit items-center gap-8">
        <div class="flex flex-col gap-2">
          <input v-model="emailPlaceholder.x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="emailPlaceholder.y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="emailPlaceholder.scale" type="number" min="0" max="10" step="0.01" />
        </div>
      </div>
    </External> -->
  </Container>
</template>
