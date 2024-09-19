<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useWindowSize, watchArray } from '@vueuse/core'
import { External } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { useDataStore } from '@/stores/data'
import { textureOptions } from '@/components/AppSettings.vue'
import Wolf from '@/components/Animation/Wolf.vue'
import AppPopup from '@/components/AppPopup.vue'

const props = defineProps<{
  place: 'strawhut' | 'loghouse' | 'townhouse' | 'mansion'
  zoomFactor: number
}>()

const emit = defineEmits<{
  (event: 'update'): void
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()
const { characterSkin, rotationStop } = storeToRefs(gameStore)

const secondScreen = ref(false)
const wolf = reactive({ x: 280, y: 190, scale: 1.25, alpha: 1 })

const socials = ref([
  { type: 'facebook' as const, texture: 'IconFacebook', x: -49 - 40, y: 103 - 20, scale: 0.24 },
  { type: 'instagram' as const, texture: 'IconInstagram', x: -3, y: 103 - 20, scale: 0.24 },
  { type: 'x' as const, texture: 'IconX', x: 36 + 40, y: 103 - 20, scale: 0.24 },
])

function onShare(type: 'facebook' | 'instagram' | 'x') {
  const shareURL = 'https://affinidi-game-poc.onrender.com' + `/html/${props.place}-${characterSkin.value}`
  let finalShare = ''

  switch (type) {
    case 'facebook':
      finalShare = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareURL)
      break
    case 'instagram':
      finalShare = 'https://www.instagram.com/sharer/sharer.php?u=' + encodeURIComponent(shareURL)
      break
    case 'x':
      finalShare = `https://www.twitter.com/intent/tweet?url=${encodeURIComponent(shareURL)}`
      break
  }

  window.open(finalShare, '_blank')
}

const emailPlaceholder = reactive({ x: 0, y: 200, scale: 0.5 })
const emailPlaceholderRef = ref<any>(null)
const emailInputBox = reactive({ x: 0, y: 0, width: 0, height: 0 })

function resize() {
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
}

const { width: screenWidth, height: screenHeight } = useWindowSize()
watchArray([screenWidth, screenHeight], resize)

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
  setTimeout(resize, 300)
})

const inputEmail = ref<string>()
const email = ref<string>()

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function onSubmit(value: string) {
  if (email.value !== undefined) return

  if (!validateEmail(value)) return

  // DATA-COLLECT
  email.value = value
  dataStore.setEmail(value)
  gameStore.playSFXSound('buttonPress')

  setTimeout(() => {
    gameStore.playSFXSound('dialogBox')
    secondScreen.value = true
    emit('update')
  }, 300)
}

const textures = ['buttonArrow', 'buttonArrowPressed']
const inputRef = ref<any>()

const titleText = reactive({ x: -250, y: -50, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 50, align: 'left', lineHeight: 60, stroke: 1, strokeThickness: 1 } })
const contectText = reactive({ x: -250, y: -50, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 35, align: 'left', lineHeight: 42, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <template v-if="!rotationStop">
    <AppPopup v-if="!secondScreen" type="square" x="left" y="center" :zoom-factor="zoomFactor" :show-button="false">
      <Container :x="titleText.x" :y="titleText.y">
        <template v-if="place === 'strawhut'">
          <Text :y="-190" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">YOUR DATA
            LIVE\nIN A </Text>
          <Text :y="-125" :anchor="titleText.anchor" :scale="titleText.scale"
            :style="{ ...titleText.style, fill: '#3b5df8' }">
            ‎&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VULNERABLE\nSTRAW HUT</Text>
          <Text :anchor="contectText.anchor" :scale="contectText.scale" :style="contectText.style">
            Identity and data protection are\nnew to you. This makes you an\neasy target for your valuable\ninformation
            to be exposed.
          </Text>
        </template>
        <template v-else-if="place === 'loghouse'">
          <Text :y="-190" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">YOUR DATA LIVE
            IN\nA</Text>
          <Text :y="-125" :anchor="titleText.anchor" :scale="titleText.scale"
            :style="{ ...titleText.style, fill: '#3b5df8' }"> ‎&nbsp;&nbsp;&nbsp;BASIC LOG HOUSE</Text>
          <Text :y="-50" :anchor="contectText.anchor" :scale="contectText.scale" :style="contectText.style">
            You have a good foundation in\nunderstanding data privacy but\nneed better security as you leave\nyour data
            in the hands of third-\nparties and dated systems.
          </Text>
        </template>
        <template v-else-if="place === 'townhouse'">
          <Text :y="-190" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">YOUR DATA LIVE\n
            IN A</Text>
          <Text :y="-130" :anchor="titleText.anchor" :scale="titleText.scale"
            :style="{ ...titleText.style, fill: '#3b5df8' }"> ‎&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            CONVENIENT\nTOWNHOUSE</Text>
          <Text :y="-0" :anchor="contectText.anchor" :scale="contectText.scale" :style="contectText.style">You enjoy the
            openness of\ntechnology and often share your data\nfor ease of access but that might put\nyour data in the
            wrong hands.
          </Text>
        </template>
        <template v-else-if="place === 'mansion'">
          <Text :y="-190" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">YOUR DATA LIVE
            IN\nA</Text>
          <Text :y="-125" :anchor="titleText.anchor" :scale="titleText.scale"
            :style="{ ...titleText.style, fill: '#3b5df8' }"> ‎&nbsp;&nbsp;&nbsp;GUARDED MANSION</Text>
          <Text :y="-60" :anchor="contectText.anchor" :scale="contectText.scale" :style="contectText.style">Your digital
            fortress is heavily\nguarded with high-level knowledge\nand high security in place. But even\nthe most
            secure mansion could\nbenefit from the latest upgrades.
          </Text>
        </template>
      </Container>
      <Container :x="emailPlaceholder.x" :y="emailPlaceholder.y" :scale="emailPlaceholder.scale">
        <Sprite ref="emailPlaceholderRef" :texture="inputEmail?.length ? 'PlaceholderEmail2' : 'PlaceholderEmail1'"
          :texture-options="textureOptions" :anchor="0.5" :x="0" :y="0" :scale="1" />
        <Sprite v-if="!!inputEmail?.length" :texture="textures[Number(!!email?.length)]"
          :texture-options="textureOptions" :anchor="0.5" :x="420" :y="-20" :scale="3" cursor="pointer"
          @pointerdown="onSubmit(inputEmail!)" />
        <External class="absolute z-20 touch-none"
          :style="{ left: emailInputBox.x + 'px', top: emailInputBox.y + 'px' }">
          <input ref="inputRef" type="email" v-model="inputEmail" @keydown.enter="onSubmit(inputEmail!)"
            class="border-0 bg-transparent px-4 py-2 outline-none placeholder:font-bold placeholder:text-blue-500 md:text-xl lg:text-2xl"
            :style="{ width: emailInputBox.width * 0.85 + 'px', height: emailInputBox.height + 'px' }" />
        </External>
      </Container>
    </AppPopup>
    <AppPopup v-else type="square" x="left" y="center" :zoom-factor="zoomFactor" :show-button="false">
      <template v-slot:popupBg>
        <Wolf v-if="place === 'strawhut'" :x="wolf.x" :y="wolf.y" :scale="wolf.scale" :alpha="wolf.alpha" :flip="false"
          type="single" />
      </template>
      <Text :x="titleText.x" :y="titleText.y - 150" :anchor="titleText.anchor" :scale="titleText.scale"
        :style="titleText.style">SHARE WITH YOUR\nFRIENDS AND SEE WHAT\nHOUSE THEY LIVE IN</Text>
      <Sprite v-for="{ type, texture, x, y, scale } of socials" :key="type" :texture="texture"
        :texture-options="textureOptions" :x="x" :y="y" :scale="scale" :anchor="0.5" cursor="pointer"
        @pointerdown="onShare(type)" />
    </AppPopup>
  </template>
</template>
