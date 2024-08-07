import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFullscreen, useScreenOrientation, useWindowSize, watchArray } from '@vueuse/core'

import frontINET from '/fonts/INET.ttf'
import frontLAN from '/fonts/LAN.ttf'
//
import fountainTexture1 from '@/assets/fountain/1.png'
import fountainTexture2 from '@/assets/fountain/2.png'
import fountainTexture3 from '@/assets/fountain/3.png'
import fountainTexture4 from '@/assets/fountain/4.png'
import fountainTexture5 from '@/assets/fountain/5.png'
//
import popupLandscapeTexture from '@/assets/popup/bg-landscape.png'
import popupPortraitTexture from '@/assets/popup/bg-portrait.png'
import buttonLongTexture from '@/assets/buttons/long.png'
import buttonLongPressedTexture from '@/assets/buttons/long-pressed.png'
//
import map1xTexture from '@/assets/map-1x.jpg'
import map2xTexture from '@/assets/map-2x.jpg'
//
import pigeonLeftPeckTexture from '@/assets/pigeon/left-peck.png'
import pigeonLeftStandTexture from '@/assets/pigeon/left-stand.png'
import pigeonRightPeckTexture from '@/assets/pigeon/right-peck.png'
import pigeonRightStandTexture from '@/assets/pigeon/right-stand.png'
//
import streetLampTexture1 from '@/assets/street-lamp/lamp-1.png'
import streetLampTexture2 from '@/assets/street-lamp/lamp-2.png'
import streetLampTexture3 from '@/assets/street-lamp/lamp-3.png'
import streetLampTexture4 from '@/assets/street-lamp/lamp-4.png'
import streetLampTexture5 from '@/assets/street-lamp/lamp-5.png'
//
import flagPinkTexture1 from '@/assets/flags/pink/flag-1.png'
import flagPinkTexture2 from '@/assets/flags/pink/flag-2.png'
import flagSchoolBlueTexture1 from '@/assets/flags/school/blue-1.png'
import flagSchoolBlueTexture2 from '@/assets/flags/school/blue-2.png'
import flagSchoolRedTexture1 from '@/assets/flags/school/red-1.png'
import flagSchoolRedTexture2 from '@/assets/flags/school/red-2.png'
import flagStationTexture1 from '@/assets/flags/station/flag-1.png'
import flagStationTexture2 from '@/assets/flags/station/flag-2.png'
//
import waveTexture1 from '@/assets/waves/1.png'
import waveTexture2 from '@/assets/waves/2.png'
import waveTexture3 from '@/assets/waves/3.png'
import waveTexture4 from '@/assets/waves/4.png'
import waveTexture5 from '@/assets/waves/5.png'
//
import cloudLargeTexture from '@/assets/clouds/large.png'
import cloudMediumTexture from '@/assets/clouds/medium.png'
import cloudSmallTexture from '@/assets/clouds/small.png'
//
import tramFrontTexture from '@/assets/tram/front.png'
import tramBackTexture from '@/assets/tram/back.png'
// import tramLeftTexture from '@/assets/tram/left.png'
import tramRightTexture from '@/assets/tram/right.png'
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
//
import characterGenericLeftWalk1SideTexture from '@/assets/character/generic/left-walk-1-side.png'
import characterGenericLeftWalk2SideTexture from '@/assets/character/generic/left-walk-2-side.png'
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
import mapCharacterStationMaster1Texture from '@/assets/character/station-master/wave-1.png'
import mapCharacterStationMaster2Texture from '@/assets/character/station-master/wave-2.png'
import mapCharacterStationMaster3Texture from '@/assets/character/station-master/wave-3.png'
//
import stationSkyTexture from '@/assets/station/sky.png'
import stationCloud1Texture from '@/assets/station/cloud-1.png'
import stationCloud2Texture from '@/assets/station/cloud-2.png'
import stationCloud3Texture from '@/assets/station/cloud-3.png'
//
import stationPlatformBackgroundTexture from '@/assets/station/platform-background.png'
import stationPlatformForegroundTexture from '@/assets/station/platform-foreground.png'
//
import stationTramTexture from '@/assets/station/tram.png'
import stationTramWireTexture from '@/assets/station/tram-wire.png'
//
import stationCharacterStationMaster1Texture from '@/assets/character/station-master/station-1.png'
import stationCharacterStationMaster2Texture from '@/assets/character/station-master/station-2.png'

export const resources = reactive({
  general: {
    pigeonleftPeck: pigeonLeftPeckTexture,
    pigeonLeftStand: pigeonLeftStandTexture,
    pigeonRightPeck: pigeonRightPeckTexture,
    pigeonRightStand: pigeonRightStandTexture,
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
    //
    characterGenericLeftWalk1Side: characterGenericLeftWalk1SideTexture,
    characterGenericLeftWalk2Side: characterGenericLeftWalk2SideTexture,
    //
    mapCharacterStationMaster1: mapCharacterStationMaster1Texture,
    mapCharacterStationMaster2: mapCharacterStationMaster2Texture,
    mapCharacterStationMaster3: mapCharacterStationMaster3Texture,
    stationCharacterStationMaster1: stationCharacterStationMaster1Texture,
    stationCharacterStationMaster2: stationCharacterStationMaster2Texture
  },
  map: {
    frontINET,
    frontLAN,
    //
    fountain1: fountainTexture1,
    fountain2: fountainTexture2,
    fountain3: fountainTexture3,
    fountain4: fountainTexture4,
    fountain5: fountainTexture5,
    //
    popupLandscape: popupLandscapeTexture,
    popupPortrait: popupPortraitTexture,
    buttonLong: buttonLongTexture,
    buttonLongPressed: buttonLongPressedTexture,
    //
    map: map1xTexture,
    //
    streetLamp1: streetLampTexture1,
    streetLamp2: streetLampTexture2,
    streetLamp3: streetLampTexture3,
    streetLamp4: streetLampTexture4,
    streetLamp5: streetLampTexture5,
    //
    flagPink1: flagPinkTexture1,
    flagPink2: flagPinkTexture2,
    flagSchoolBlue1: flagSchoolBlueTexture1,
    flagSchoolBlue2: flagSchoolBlueTexture2,
    flagSchoolRed1: flagSchoolRedTexture1,
    flagSchoolRed2: flagSchoolRedTexture2,
    flagStation1: flagStationTexture1,
    flagStation2: flagStationTexture2,
    //
    wave1: waveTexture1,
    wave2: waveTexture2,
    wave3: waveTexture3,
    wave4: waveTexture4,
    wave5: waveTexture5,
    //
    cloudLarge: cloudLargeTexture,
    cloudMedium: cloudMediumTexture,
    cloudSmall: cloudSmallTexture,
    //
    tramFront: tramFrontTexture,
    tramBack: tramBackTexture,
    tramRight: tramRightTexture,
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
    characterMainViolateLeftWalk2: characterMainViolateLeftWalk2Texture
    //
  },
  station: {
    sky: stationSkyTexture,
    //
    cloud1: stationCloud1Texture,
    cloud2: stationCloud2Texture,
    cloud3: stationCloud3Texture,
    //
    platformBackground: stationPlatformBackgroundTexture,
    platformForeground: stationPlatformForegroundTexture,
    //
    stationTram: stationTramTexture,
    stationTramWire: stationTramWireTexture
    //
  }
})

const { width: screenWidth, height: screenHeight } = useWindowSize()

export type Character = 'black' | 'blue' | 'red' | 'violate'

export const useGameStore = defineStore('game', () => {
  const isMobile = computed(() => !(screenWidth.value > 640 && screenHeight.value > 640))
  const activeCharacter = ref<Character | null>(null)

  if (!isMobile.value) {
    resources.map.map = map2xTexture
  }

  const { isSupported: isFullscreenSupported, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, lockOrientation, unlockOrientation } = useScreenOrientation()

  // const $mapPosition = reactive({ x: 400, y: 680, scale: 0.22 })
  // const mapPosition = computed(() => $mapPosition)

  const currentScenceIndex = ref(0)
  const currentMapPositionIndex = ref(0)
  const isIphone = ref(false)

  watchArray([isFullscreenSupported, isOrientationSupported], async () => {
    if (isFullscreenSupported.value && isOrientationSupported.value) {
      try {
        await exitFullscreen()
        unlockOrientation()
        isIphone.value = false
      } catch (error) {
        isIphone.value = true
      }
    } else {
      isIphone.value = true
    }

    console.log({ isIphone: isIphone.value })
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
    isIphone,
    currentScenceIndex,
    currentMapPositionIndex,
    activeCharacter,
    toggleGameMode,
    nextScene,
    nextMapPosition,
    setActiveCharacter
  }
})
