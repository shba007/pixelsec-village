import { reactive, computed, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { breakpointsTailwind, useBreakpoints, useFullscreen, useScreenOrientation } from '@vueuse/core'

import mapTextureUrl from '@/assets/map.jpg'
import popupBG1TextureUrl from '@/assets/popup-bg-1.png'

export const resources = {
  map: mapTextureUrl,
  popupBG1: popupBG1TextureUrl
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
