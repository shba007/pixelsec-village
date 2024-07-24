import { reactive, computed, ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { breakpointsTailwind, useBreakpoints, useFullscreen, useScreenOrientation } from '@vueuse/core'

import mapTextureUrl from "@/assets/map.jpg";
import popupBG1TextureUrl from "@/assets/popup-bg-1.png";

const assets = [
  { alias: 'map', src: '/assets/map.png' },
  { alias: 'cloud-1', src: '/assets/clouds/cloud-1.png' },
  { alias: 'cloud-2', src: '/assets/clouds/cloud-2.png' },
  { alias: 'cloud-3', src: '/assets/clouds/cloud-3.png' },
  { alias: 'lamp-1', src: '/assets/street-lamp/lamp-1.png' },
  { alias: 'lamp-2', src: '/assets/street-lamp/lamp-2.png' },
  { alias: 'lamp-3', src: '/assets/street-lamp/lamp-3.png' },
  { alias: 'lamp-4', src: '/assets/street-lamp/lamp-4.png' },
  { alias: 'lamp-5', src: '/assets/street-lamp/lamp-5.png' },
  {
    alias: 'character-mc-blue-front-still',
    src: '/assets/characters/mc/blue-front-still.png',
  },
  {
    alias: 'character-mc-blue-front-walk',
    src: '/assets/characters/mc/blue-front-walk.png',
  },
  {
    alias: 'character-mc-blue-side-walk',
    src: '/assets/characters/mc/blue-side-walk.png',
  },
  {
    alias: 'character-mc-blue-back-walk',
    src: '/assets/characters/mc/blue-back-walk.png',
  },
]

export const resources = {
  map: mapTextureUrl,
  popupBG1: popupBG1TextureUrl
}

export const useGameStore = defineStore('game', () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smallerOrEqual('md')

  const { isSupported: isFullscreenSupported, isFullscreen, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, orientation, lockOrientation, unlockOrientation } = useScreenOrientation()

  const $mapPosition = reactive({ x: 400, y: 680, scale: 0.22 })
  const mapPosition = computed(() => $mapPosition)

  function updateMapPosition(x: number, y: number, scale: number) {
    $mapPosition.x = x
    $mapPosition.y = y
    $mapPosition.scale = scale
  }

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

  async function preload() {

  }

  async function toggleGameMode(value: boolean) {
    if (value) {
      await enterFullscreen()
      await lockOrientation('landscape')
    } else {
      await exitFullscreen()
      await unlockOrientation()
    }
  }

  function getAssets(assetNames: string[]) {
    return assetNames.map((assetName) => assets.find(({ alias }) => alias === assetName)!.src)
  }

  return { mapPosition, isMobile, toggleGameMode, getAssets, updateMapPosition }
})
