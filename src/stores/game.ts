import { computed, reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFullscreen, useScreenOrientation, useWindowSize } from '@vueuse/core'

import frontINET from '/fonts/INET.ttf'
import frontLAN from '/fonts/LAN.ttf'
//
import popupBarTexture from '@/assets/popup/bg-bar.png'
import popupLandscapeTexture from '@/assets/popup/bg-landscape.png'
import popupPortraitTexture from '@/assets/popup/bg-portrait.png'
import popupSquareTexture from '@/assets/popup/bg-square.png'
//
import fountainTexture1 from '@/assets/fountain/1.png'
import fountainTexture2 from '@/assets/fountain/2.png'
import fountainTexture3 from '@/assets/fountain/3.png'
import fountainTexture4 from '@/assets/fountain/4.png'
import fountainTexture5 from '@/assets/fountain/5.png'
//
import buttonLongTexture from '@/assets/buttons/long.png'
import buttonLongPressedTexture from '@/assets/buttons/long-pressed.png'
import buttonShortTexture from '@/assets/buttons/short.png'
import buttonShortPressedTexture from '@/assets/buttons/short-pressed.png'
import buttonSquareTexture from '@/assets/buttons/square.png'
import buttonSquarePressedTexture from '@/assets/buttons/square-pressed.png'
//
import map1xTexture from '@/assets/map-1x.jpg'
//
import stationBgTexture from '@/assets/station-bg.png'
import stationFgTexture from '@/assets/station-fg.png'
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
//
import baloon1Texture from '@/assets/baloon-stand/1.png'
import baloon2Texture from '@/assets/baloon-stand/2.png'
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
import mapCharacterStationMaster1Texture from '@/assets/character/station-master/map-1.png'
import mapCharacterStationMaster2Texture from '@/assets/character/station-master/map-2.png'
import mapCharacterStationMaster3Texture from '@/assets/character/station-master/map-3.png'
//
import mapCharacterIcecreamVendor1Texture from '@/assets/character/icecream-vendor/map-1.png'
import mapCharacterIcecreamVendor2Texture from '@/assets/character/icecream-vendor/map-2.png'
//
import characterGenericLeftWalk1SideTexture from '@/assets/character/generic/left-walk-1-side.png'
import characterGenericLeftWalk2SideTexture from '@/assets/character/generic/left-walk-2-side.png'
// Main Character
import characterMainBlackFrontStillTexture from '@/assets/character/main/black/front-still.png'
import characterMainBlackFrontWalk1Texture from '@/assets/character/main/black/front-walk-1.png'
import characterMainBlackFrontWalk2Texture from '@/assets/character/main/black/front-walk-2.png'
import characterMainBlackBackWalk1Texture from '@/assets/character/main/black/back-walk-1.png'
import characterMainBlackBackWalk2Texture from '@/assets/character/main/black/back-walk-2.png'
import characterMainBlackLeftWalk1Texture from '@/assets/character/main/black/left-walk-1.png'
import characterMainBlackLeftWalk2Texture from '@/assets/character/main/black/left-walk-2.png'
import characterMainBlackRightWalk1Texture from '@/assets/character/main/black/right-walk-1.png'
import characterMainBlackRightWalk2Texture from '@/assets/character/main/black/right-walk-2.png'
//
import characterMainViolateFrontStillTexture from '@/assets/character/main/violate/front-still.png'
import characterMainViolateFrontWalk1Texture from '@/assets/character/main/violate/front-walk-1.png'
import characterMainViolateFrontWalk2Texture from '@/assets/character/main/violate/front-walk-2.png'
import characterMainViolateBackWalk1Texture from '@/assets/character/main/violate/back-walk-1.png'
import characterMainViolateBackWalk2Texture from '@/assets/character/main/violate/back-walk-2.png'
import characterMainViolateLeftWalk1Texture from '@/assets/character/main/violate/left-walk-1.png'
import characterMainViolateLeftWalk2Texture from '@/assets/character/main/violate/left-walk-2.png'
import characterMainViolateRightWalk1Texture from '@/assets/character/main/violate/right-walk-1.png'
import characterMainViolateRightWalk2Texture from '@/assets/character/main/violate/right-walk-2.png'
//
import characterMainRedFrontStillTexture from '@/assets/character/main/red/front-still.png'
import characterMainRedFrontWalk1Texture from '@/assets/character/main/red/front-walk-1.png'
import characterMainRedFrontWalk2Texture from '@/assets/character/main/red/front-walk-2.png'
import characterMainRedBackWalk1Texture from '@/assets/character/main/red/back-walk-1.png'
import characterMainRedBackWalk2Texture from '@/assets/character/main/red/back-walk-2.png'
import characterMainRedLeftWalk1Texture from '@/assets/character/main/red/left-walk-1.png'
import characterMainRedLeftWalk2Texture from '@/assets/character/main/red/left-walk-2.png'
import characterMainRedRightWalk1Texture from '@/assets/character/main/red/right-walk-1.png'
import characterMainRedRightWalk2Texture from '@/assets/character/main/red/right-walk-2.png'
//
import characterMainBlueFrontStillTexture from '@/assets/character/main/blue/front-still.png'
import characterMainBlueFrontWalk1Texture from '@/assets/character/main/blue/front-walk-1.png'
import characterMainBlueFrontWalk2Texture from '@/assets/character/main/blue/front-walk-2.png'
import characterMainBlueBackWalk1Texture from '@/assets/character/main/blue/back-walk-1.png'
import characterMainBlueBackWalk2Texture from '@/assets/character/main/blue/back-walk-2.png'
import characterMainBlueLeftWalk1Texture from '@/assets/character/main/blue/left-walk-1.png'
import characterMainBlueLeftWalk2Texture from '@/assets/character/main/blue/left-walk-2.png'
import characterMainBlueRightWalk1Texture from '@/assets/character/main/blue/right-walk-1.png'
import characterMainBlueRightWalk2Texture from '@/assets/character/main/blue/right-walk-2.png'
//
import dataTrailBack1Texture from '@/assets/trail/trail-back-1.png'
import dataTrailBack2Texture from '@/assets/trail/trail-back-2.png'
import dataTrailBack3Texture from '@/assets/trail/trail-back-3.png'
import dataTrailBack4Texture from '@/assets/trail/trail-back-4.png'
import dataTrailSide1Texture from '@/assets/trail/trail-side-1.png'
import dataTrailSide2Texture from '@/assets/trail/trail-side-2.png'
import dataTrailSide3Texture from '@/assets/trail/trail-side-3.png'
import dataTrailSide4Texture from '@/assets/trail/trail-side-4.png'
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
//
import parkBackgroundTexture from '@/assets/park/park-background.png'
import parkForegroundTexture from '@/assets/park/park-foreground.png'
//
import parkCharacterIcecreamVendorWave1Texture from '@/assets/character/icecream-vendor/park-wave-1.png'
import parkCharacterIcecreamVendorWave2Texture from '@/assets/character/icecream-vendor/park-wave-2.png'
import parkCharacterIcecreamVendorHandoutTexture from '@/assets/character/icecream-vendor/park-handout.png'
//
import bankSkyTexture from '@/assets/bank/sky.png'
import bankBackgroundTexture from '@/assets/bank/background.png'

export const resources = reactive({
  frontINET,
  frontLAN,
  //
  popupBar: popupBarTexture,
  popupSquare: popupSquareTexture,
  popupLandscape: popupLandscapeTexture,
  popupPortrait: popupPortraitTexture,
  //
  buttonLong: buttonLongTexture,
  buttonLongPressed: buttonLongPressedTexture,
  buttonShort: buttonShortTexture,
  buttonShortPressed: buttonShortPressedTexture,
  buttonSquare: buttonSquareTexture,
  buttonSquarePressed: buttonSquarePressedTexture,
  //
  pigeonLeftPeck: pigeonLeftPeckTexture,
  pigeonLeftStand: pigeonLeftStandTexture,
  pigeonRightPeck: pigeonRightPeckTexture,
  pigeonRightStand: pigeonRightStandTexture,
  //
  fountain1: fountainTexture1,
  fountain2: fountainTexture2,
  fountain3: fountainTexture3,
  fountain4: fountainTexture4,
  fountain5: fountainTexture5,
  //
  map: map1xTexture,
  //
  stationBg: stationBgTexture,
  stationFg: stationFgTexture,
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
  //
  baloon1: baloon1Texture,
  baloon2: baloon2Texture,
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
  characterGenericLeftWalk1Side: characterGenericLeftWalk1SideTexture,
  characterGenericLeftWalk2Side: characterGenericLeftWalk2SideTexture,
  //
  mapCharacterStationMaster1: mapCharacterStationMaster1Texture,
  mapCharacterStationMaster2: mapCharacterStationMaster2Texture,
  mapCharacterStationMaster3: mapCharacterStationMaster3Texture,
  //
  mapCharacterIcecreamVendor1: mapCharacterIcecreamVendor1Texture,
  mapCharacterIcecreamVendor2: mapCharacterIcecreamVendor2Texture,
  // Main Character
  characterMainFrontStill: characterMainBlackFrontStillTexture,
  characterMainFrontWalk1: characterMainBlackFrontWalk1Texture,
  characterMainFrontWalk2: characterMainBlackFrontWalk2Texture,
  characterMainBackWalk1: characterMainBlackBackWalk1Texture,
  characterMainBackWalk2: characterMainBlackBackWalk2Texture,
  characterMainLeftWalk1: characterMainBlackLeftWalk1Texture,
  characterMainLeftWalk2: characterMainBlackLeftWalk2Texture,
  characterMainRightWalk1: characterMainBlackRightWalk1Texture,
  characterMainRightWalk2: characterMainBlackRightWalk2Texture,
  //
  characterMainBlackFrontStill: characterMainBlackFrontStillTexture,
  characterMainBlackFrontWalk1: characterMainBlackFrontWalk1Texture,
  characterMainBlackFrontWalk2: characterMainBlackFrontWalk2Texture,
  characterMainBlackBackWalk1: characterMainBlackBackWalk1Texture,
  characterMainBlackBackWalk2: characterMainBlackBackWalk2Texture,
  characterMainBlackLeftWalk1: characterMainBlackLeftWalk1Texture,
  characterMainBlackLeftWalk2: characterMainBlackLeftWalk2Texture,
  characterMainBlackRightWalk1: characterMainBlackRightWalk1Texture,
  characterMainBlackRightWalk2: characterMainBlackRightWalk2Texture,
  //
  characterMainViolateFrontStill: characterMainViolateFrontStillTexture,
  characterMainViolateFrontWalk1: characterMainViolateFrontWalk1Texture,
  characterMainViolateFrontWalk2: characterMainViolateFrontWalk2Texture,
  characterMainViolateBackWalk1: characterMainViolateBackWalk1Texture,
  characterMainViolateBackWalk2: characterMainViolateBackWalk2Texture,
  characterMainViolateLeftWalk1: characterMainViolateLeftWalk1Texture,
  characterMainViolateLeftWalk2: characterMainViolateLeftWalk2Texture,
  characterMainViolateRightWalk1: characterMainViolateRightWalk1Texture,
  characterMainViolateRightWalk2: characterMainViolateRightWalk2Texture,
  //
  characterMainRedFrontStill: characterMainRedFrontStillTexture,
  characterMainRedFrontWalk1: characterMainRedFrontWalk1Texture,
  characterMainRedFrontWalk2: characterMainRedFrontWalk2Texture,
  characterMainRedBackWalk1: characterMainRedBackWalk1Texture,
  characterMainRedBackWalk2: characterMainRedBackWalk2Texture,
  characterMainRedLeftWalk1: characterMainRedLeftWalk1Texture,
  characterMainRedLeftWalk2: characterMainRedLeftWalk2Texture,
  characterMainRedRightWalk1: characterMainRedRightWalk1Texture,
  characterMainRedRightWalk2: characterMainRedRightWalk2Texture,
  //
  characterMainBlueFrontStill: characterMainBlueFrontStillTexture,
  characterMainBlueFrontWalk1: characterMainBlueFrontWalk1Texture,
  characterMainBlueFrontWalk2: characterMainBlueFrontWalk2Texture,
  characterMainBlueBackWalk1: characterMainBlueBackWalk1Texture,
  characterMainBlueBackWalk2: characterMainBlueBackWalk2Texture,
  characterMainBlueLeftWalk1: characterMainBlueLeftWalk1Texture,
  characterMainBlueLeftWalk2: characterMainBlueLeftWalk2Texture,
  characterMainBlueRightWalk1: characterMainBlueRightWalk1Texture,
  characterMainBlueRightWalk2: characterMainBlueRightWalk2Texture,
  //
  dataTrailBack1: dataTrailBack1Texture,
  dataTrailBack2: dataTrailBack2Texture,
  dataTrailBack3: dataTrailBack3Texture,
  dataTrailBack4: dataTrailBack4Texture,
  dataTrailSide1: dataTrailSide1Texture,
  dataTrailSide2: dataTrailSide2Texture,
  dataTrailSide3: dataTrailSide3Texture,
  dataTrailSide4: dataTrailSide4Texture,
  //
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
  stationTramWire: stationTramWireTexture,
  //
  stationCharacterStationMaster1: stationCharacterStationMaster1Texture,
  stationCharacterStationMaster2: stationCharacterStationMaster2Texture,
  //
  parkBackground: parkBackgroundTexture,
  parkForeground: parkForegroundTexture,
  //
  parkCharacterIcecreamVendorWave1: parkCharacterIcecreamVendorWave1Texture,
  parkCharacterIcecreamVendorWave2: parkCharacterIcecreamVendorWave2Texture,
  parkCharacterIcecreamVendorHandout: parkCharacterIcecreamVendorHandoutTexture,
  //
  bankSky: bankSkyTexture,
  bankBackground: bankBackgroundTexture,
})

export type Character = 'black' | 'blue' | 'red' | 'violate'

const { width: screenWidth, height: screenHeight } = useWindowSize()

function capitalizeFirstLetter(word: string): string {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const useGameStore = defineStore('game', () => {
  const isLandscape = computed(() => screenWidth.value > screenHeight.value)
  const isMobile = computed(() => !(Math.min(screenWidth.value, screenHeight.value) > 640))

  const currentSceneIndex = ref(0)
  const currentStateIndex = ref(0)
  const currentScreenIndex = ref(0)
  const currentScreenAnimation = ref<'init' | 'started' | 'finished'>('init')
  const $currentScreenState = reactive({ x: 0, y: 0, scale: 1, alpha: 1, time: 0 })

  const activeCharacter = ref<Character | null>(null)
  const $hardStop = ref(false)
  const $motionBlur = ref(false)

  const currentScreenState = computed(() => $currentScreenState)
  const rotationStop = computed(() => $hardStop.value || (currentSceneIndex.value > 0 && !isLandscape.value))
  const hardStop = computed(() => $hardStop.value)
  const motionBlur = computed(() => $motionBlur.value)

  const { isSupported: isFullscreenSupported, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, lockOrientation, unlockOrientation } = useScreenOrientation()

  function updateScreen(data: { x: number; y: number; scale: number; alpha: number; time: number }) {
    $currentScreenState.x = data.x
    $currentScreenState.y = data.y
    $currentScreenState.scale = data.scale
    $currentScreenState.alpha = data.alpha
    $currentScreenState.time = data.time
  }

  function toggleHardStop(value: boolean) {
    $hardStop.value = value
  }

  function toggleMotionBlur(value: boolean) {
    console.log({ toggleMotionBlur: value })
    $motionBlur.value = value
  }

  watch(activeCharacter, (value) => {
    if (!value) return

    console.log({ activeCharacter: value })
    // @ts-ignore
    resources.characterMainFrontStill = resources[`characterMain${capitalizeFirstLetter(value)}FrontStill`]
    // @ts-ignore
    resources.characterMainFrontWalk1 = resources[`characterMain${capitalizeFirstLetter(value)}FrontWalk1`]
    // @ts-ignore
    resources.characterMainFrontWalk2 = resources[`characterMain${capitalizeFirstLetter(value)}FrontWalk2`]
    // @ts-ignore
    resources.characterMainBackWalk1 = resources[`characterMain${capitalizeFirstLetter(value)}BackWalk1`]
    // @ts-ignore
    resources.characterMainBackWalk2 = resources[`characterMain${capitalizeFirstLetter(value)}BackWalk2`]
    // @ts-ignore
    resources.characterMainLeftWalk1 = resources[`characterMain${capitalizeFirstLetter(value)}LeftWalk1`]
    // @ts-ignore
    resources.characterMainLeftWalk2 = resources[`characterMain${capitalizeFirstLetter(value)}LeftWalk2`]
    // @ts-ignore
    resources.characterMainRightWalk1 = resources[`characterMain${capitalizeFirstLetter(value)}RightWalk1`]
    // @ts-ignore
    resources.characterMainRightWalk1 = resources[`characterMain${capitalizeFirstLetter(value)}RightWalk1`]
    // @ts-ignore
    resources.characterMainRightWalk2 = resources[`characterMain${capitalizeFirstLetter(value)}RightWalk2`]
  })

  async function toggleGameMode(value: boolean) {
    try {
      if (value) {
        await enterFullscreen()
        await lockOrientation('landscape')
      } else {
        await exitFullscreen()
        unlockOrientation()
      }
    } catch (error) {
      // console.log(error)
    }
  }

  function nextScene(screen = 1) {
    currentSceneIndex.value += screen
  }

  function nextMapState() {
    currentScreenAnimation.value = 'started'
    currentStateIndex.value++
  }

  function setActiveCharacter(value: Character) {
    activeCharacter.value = value
  }

  return {
    isLandscape,
    isMobile,
    currentSceneIndex,
    currentStateIndex,
    currentScreenIndex,
    currentScreenAnimation,
    currentScreenState,
    activeCharacter,
    rotationStop,
    motionBlur,
    hardStop,
    updateScreen,
    toggleHardStop,
    toggleMotionBlur,
    toggleGameMode,
    nextScene,
    nextMapState,
    setActiveCharacter,
  }
})
