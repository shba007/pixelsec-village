import { ref } from 'vue'
import { defineStore } from 'pinia'
import { breakpointsTailwind, useBreakpoints, useFullscreen, useScreenOrientation, watchArray } from '@vueuse/core'

import frontINET from '/fonts/INET.ttf'
import frontLAN from '/fonts/LAN.ttf'
import mapTexture from '@/assets/map.jpg'
import popupLandscapeTexture from '@/assets/popup/bg-landscape.png'
import popupPortraitTexture from '@/assets/popup/bg-portrait.png'
import buttonLongTexture from '@/assets/buttons/long.png'
import buttonLongPressedTexture from '@/assets/buttons/long-pressed.png'
import pigeonLeftPeckTexture from '@/assets/pigeon/left-peck.png'
import pigeonLeftStandTexture from '@/assets/pigeon/left-stand.png'
import pigeonRightPeckTexture from '@/assets/pigeon/right-peck.png'
import pigeonRightStandTexture from '@/assets/pigeon/right-stand.png'
import streetLampTexture1 from '@/assets/street-lamp/lamp-1.png'
import streetLampTexture2 from '@/assets/street-lamp/lamp-2.png'
import streetLampTexture3 from '@/assets/street-lamp/lamp-3.png'
import streetLampTexture4 from '@/assets/street-lamp/lamp-4.png'
import streetLampTexture5 from '@/assets/street-lamp/lamp-5.png'
import cloudLargeTexture from '@/assets/clouds/large.png'
import cloudMediumTexture from '@/assets/clouds/medium.png'
import cloudSmallTexture from '@/assets/clouds/small.png'
// Charcters
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
//
import characterMainViolateFrontStillTexture from '@/assets/character/main/violate/front-still.png'
import characterMainViolateFrontWalk1Texture from '@/assets/character/main/violate/front-walk-1.png'
import characterMainViolateFrontWalk2Texture from '@/assets/character/main/violate/front-walk-2.png'
import characterMainViolateLeftWalk1Texture from '@/assets/character/main/violate/left-walk-1.png'
import characterMainViolateLeftWalk2Texture from '@/assets/character/main/violate/left-walk-2.png'
//
import characterMainRedFrontStillTexture from '@/assets/character/main/red/front-still.png'
import characterMainRedFrontWalk1Texture from '@/assets/character/main/red/front-walk-1.png'
import characterMainRedFrontWalk2Texture from '@/assets/character/main/red/front-walk-2.png'
import characterMainRedLeftWalk1Texture from '@/assets/character/main/red/left-walk-1.png'
import characterMainRedLeftWalk2Texture from '@/assets/character/main/red/left-walk-2.png'
//
import characterMainBlueFrontStillTexture from '@/assets/character/main/red/front-still.png'
import characterMainBlueFrontWalk1Texture from '@/assets/character/main/red/front-walk-1.png'
import characterMainBlueFrontWalk2Texture from '@/assets/character/main/red/front-walk-2.png'
import characterMainBlueLeftWalk1Texture from '@/assets/character/main/red/left-walk-1.png'
import characterMainBlueLeftWalk2Texture from '@/assets/character/main/red/left-walk-2.png'
//
import characterStationMasterWave1Texture from '@/assets/character/station-master/wave-1.png'
import characterStationMasterWave2Texture from '@/assets/character/station-master/wave-2.png'
import characterStationMasterWave3Texture from '@/assets/character/station-master/wave-3.png'
//
import tramFrontTexture from '@/assets/tram/front.png'
import tramBackTexture from '@/assets/tram/back.png'
// import tramLeftTexture from '@/assets/tram/left.png'
import tramRightTexture from '@/assets/tram/right.png'

export const resources = {
  frontINET,
  frontLAN,
  map: mapTexture,
  popupLandscape: popupLandscapeTexture,
  popupPortrait: popupPortraitTexture,
  buttonLong: buttonLongTexture,
  buttonLongPressed: buttonLongPressedTexture,
  // Characters
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
  //
  characterMainViolateFrontStill: characterMainViolateFrontStillTexture,
  characterMainViolateFrontWalk1: characterMainViolateFrontWalk1Texture,
  characterMainViolateFrontWalk2: characterMainViolateFrontWalk2Texture,
  characterMainViolateLeftWalk1: characterMainViolateLeftWalk1Texture,
  characterMainViolateLeftWalk2: characterMainViolateLeftWalk2Texture,
  //
  characterStationMasterWave1: characterStationMasterWave1Texture,
  characterStationMasterWave2: characterStationMasterWave2Texture,
  characterStationMasterWave3: characterStationMasterWave3Texture,
  //
  tramFront: tramFrontTexture,
  tramBack: tramBackTexture,
  tramRight: tramRightTexture,
  pigeonleftPeck: pigeonLeftPeckTexture,
  pigeonLeftStand: pigeonLeftStandTexture,
  pigeonRightPeck: pigeonRightPeckTexture,
  pigeonRightStand: pigeonRightStandTexture,
  streetLamp1: streetLampTexture1,
  streetLamp2: streetLampTexture2,
  streetLamp3: streetLampTexture3,
  streetLamp4: streetLampTexture4,
  streetLamp5: streetLampTexture5,
  cloudLarge: cloudLargeTexture,
  cloudMedium: cloudMediumTexture,
  cloudSmall: cloudSmallTexture
}

export type Character = 'black' | 'blue' | 'red' | 'violate'

export const useGameStore = defineStore('game', () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smallerOrEqual('md')
  const activeCharacter = ref<Character | null>(null)

  const { isSupported: isFullscreenSupported, isFullscreen, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, orientation, lockOrientation, unlockOrientation } = useScreenOrientation()

  // const $mapPosition = reactive({ x: 400, y: 680, scale: 0.22 })
  // const mapPosition = computed(() => $mapPosition)

  const currentScenceIndex = ref(0)
  const currentMapPositionIndex = ref(0)
  const isFullScreenAlertShow = ref(false)

  watchArray([isFullscreenSupported, isOrientationSupported], async () => {
    if (isFullscreenSupported.value && isOrientationSupported.value) {
      try {
        await exitFullscreen()
        unlockOrientation()
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

  function nextScene(screen = 1) {
    currentScenceIndex.value += screen
    console.log('NextScene', currentScenceIndex.value)
  }

  function nextMapPosition() {
    currentMapPositionIndex.value++
  }

  function setActiveCharacter(value: Character) {
    activeCharacter.value = value
  }

  return {
    isMobile,
    currentScenceIndex,
    currentMapPositionIndex,
    activeCharacter,
    toggleGameMode,
    nextScene,
    nextMapPosition,
    setActiveCharacter
  }
})
