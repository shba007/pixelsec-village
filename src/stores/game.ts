import { reactive, computed, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { breakpointsTailwind, useBreakpoints, useFullscreen, useScreenOrientation } from '@vueuse/core'

import mapTexture from '@/assets/map.jpg'
import popupBG1Texture from '@/assets/popup-bg-1.png'
import popupBG2Texture from '@/assets/popup-bg-2.png'
import characterGenericFrontStillTexture from '@/assets/character/generic/front-still.png'
import characterGenericFrontWalk1Texture from '@/assets/character/generic/front-walk-1.png'
import characterGenericFrontWalk2Texture from '@/assets/character/generic/front-walk-2.png'
import characterGenericBackWalk1Texture from '@/assets/character/generic/back-walk-1.png'
import characterGenericBackWalk2Texture from '@/assets/character/generic/back-walk-2.png'
import characterGenericLeftWalk1Texture from '@/assets/character/generic/left-walk-1.png'
import characterGenericLeftWalk2Texture from '@/assets/character/generic/left-walk-2.png'
import characterGenericRightWalk1Texture from '@/assets/character/generic/right-walk-1.png'
import characterGenericRightWalk2Texture from '@/assets/character/generic/right-walk-2.png'
// Main Character
import characterMainBlackFrontStillTexture from '@/assets/character/main/black/front-still.png'
import characterMainBlackFrontWalk1Texture from '@/assets/character/main/black/front-walk-1.png'
import characterMainBlackFrontWalk2Texture from '@/assets/character/main/black/front-walk-2.png'
import characterMainBlackLeftWalk1Texture from '@/assets/character/main/black/left-walk-1.png'
import characterMainBlackLeftWalk2Texture from '@/assets/character/main/black/left-walk-2.png'
// import characterMainBlackRightWalk1Texture from '@/assets/character/main/black/right-walk-1.png'
// import characterMainBlackRightWalk2Texture from '@/assets/character/main/black/right-walk-2.png'

export const resources = {
  map: mapTexture,
  popupBG1: popupBG1Texture,
  popupBG2: popupBG2Texture,
  characterGenericFrontStill: characterGenericFrontStillTexture,
  characterGenericFrontWalk1: characterGenericFrontWalk1Texture,
  characterGenericFrontWalk2: characterGenericFrontWalk2Texture,
  characterGenericBackWalk1: characterGenericBackWalk1Texture,
  characterGenericBackWalk2: characterGenericBackWalk2Texture,
  characterGenericLeftWalk1: characterGenericLeftWalk1Texture,
  characterGenericLeftWalk2: characterGenericLeftWalk2Texture,
  characterGenericRightWalk1: characterGenericRightWalk1Texture,
  characterGenericRightWalk2: characterGenericRightWalk2Texture,
  // Main Character
  characterMainBlackFrontStill: characterMainBlackFrontStillTexture,
  characterMainBlackFrontWalk1: characterMainBlackFrontWalk1Texture,
  characterMainBlackFrontWalk2: characterMainBlackFrontWalk2Texture,
  characterMainBlackLeftWalk1: characterMainBlackLeftWalk1Texture,
  characterMainBlackLeftWalk2: characterMainBlackLeftWalk2Texture,
  // characterMainBlackRightWalk1: characterMainBlackRightWalk1Texture,
  // characterMainBlackRightWalk2: characterMainBlackRightWalk2Texture,

  /*   characterGenericBackWalk1: characterGenericBackWalk1Texture,
    characterGenericBackWalk2: characterGenericBackWalk2Texture,
    characterGenericLeftWalk1: characterGenericLeftWalk1Texture,
    characterGenericLeftWalk2: characterGenericLeftWalk2Texture,
    characterGenericRightWalk1: characterGenericRightWalk1Texture,
    characterGenericRightWalk2: characterGenericRightWalk2Texture */
}

export const useGameStore = defineStore('game', () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smallerOrEqual('md')

  const { isSupported: isFullscreenSupported, isFullscreen, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, orientation, lockOrientation, unlockOrientation } = useScreenOrientation()

  // const $mapPosition = reactive({ x: 400, y: 680, scale: 0.22 })
  // const mapPosition = computed(() => $mapPosition)

  const currentScenceIndex = ref(0)
  const currentMapPositionIndex = ref(0)
  const isFullScreenAlertShow = ref(false)

  watchEffect(async () => {
    if (isFullscreenSupported.value && isOrientationSupported.value) {
      try {
        await exitFullscreen()
        await unlockOrientation()
        isFullScreenAlertShow.value = false
      } catch (error) {
        isFullScreenAlertShow.value = true
      }
    } else {
      isFullScreenAlertShow.value = true
    }

    console.log({ isFullScreenAlertShow: isFullScreenAlertShow.value })
  })

  async function toggleGameMode(value: boolean) {
    if (value) {
      await enterFullscreen()
      await lockOrientation('landscape')
    } else {
      await exitFullscreen()
      await unlockOrientation()
    }
  }

  /* x   */
  function nextScene() {
    currentScenceIndex.value++
  }

  function nextMapPosition() {
    currentMapPositionIndex.value++
  }

  return {
    isMobile,
    currentScenceIndex,
    currentMapPositionIndex,
    toggleGameMode,
    nextScene,
    nextMapPosition
  }
})
