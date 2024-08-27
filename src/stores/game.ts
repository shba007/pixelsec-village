import { computed, reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFullscreen, useScreenOrientation, useWindowSize } from '@vueuse/core'

// public
// fonts
import frontINET from '/fonts/INET.ttf'
import frontLAN from '/fonts/LAN.ttf'
import frontUNI from '/fonts/UNI.ttf'
// images
import smartphone from '/images/smartphone/bg.png'
import smartphoneBankingHighlighted from '/images/smartphone/banking-highlighted.png'
import smartphoneBanking from '/images/smartphone/banking.png'
import smartphoneEmailHighlighted from '/images/smartphone/email-highlighted.png'
import smartphoneEmail from '/images/smartphone/email.png'
import smartphoneGameHighlighted from '/images/smartphone/game-highlighted.png'
import smartphoneGame from '/images/smartphone/game.png'
import smartphoneHealthHighlighted from '/images/smartphone/health-highlighted.png'
import smartphoneHealth from '/images/smartphone/health.png'
import smartphoneMovieHighlighted from '/images/smartphone/movie-highlighted.png'
import smartphoneMovie from '/images/smartphone/movie.png'
import smartphoneMusicHighlighted from '/images/smartphone/movie-highlighted.png'
import smartphoneMusic from '/images/smartphone/movie.png'
import smartphoneShoppingHighlighted from '/images/smartphone/shopping-highlighted.png'
import smartphoneShopping from '/images/smartphone/shopping.png'
import smartphoneSocialHighlighted from '/images/smartphone/social-highlighted.png'
import smartphoneSocial from '/images/smartphone/social.png'
// asset
import popupBarTexture from '@/assets/popup/bg-bar.png'
import popupLandscapeTexture from '@/assets/popup/bg-landscape.png'
import popupPortraitTexture from '@/assets/popup/bg-portrait.png'
import popupSquareTexture from '@/assets/popup/bg-square.png'
import popupCutSceneHomeTimeTexture from '@/assets/popup/cutscene/home-time.png'
import popupCutSceneResult1Texture from '@/assets/popup/cutscene/result-1.png'
import popupCutSceneResult2Texture from '@/assets/popup/cutscene/result-2.png'
//
import buttonLongTexture from '@/assets/buttons/long/pressed.png'
import buttonLongPressedTexture from '@/assets/buttons/long/unpressed.png'
import buttonShortTexture from '@/assets/buttons/short/pressed.png'
import buttonShortPressedTexture from '@/assets/buttons/short/unpressed.png'
import buttonSquareTexture from '@/assets/buttons/square/pressed.png'
import buttonSquarePressedTexture from '@/assets/buttons/square/unpressed.png'
//
import mapCloudLargeTexture from '@/assets/clouds/map-large.png'
import mapCloudMediumTexture from '@/assets/clouds/map-medium.png'
import mapCloudSmallTexture from '@/assets/clouds/map-small.png'
import stationCloudLargeTexture from '@/assets/clouds/station-large.png'
import stationCloudMediumTexture from '@/assets/clouds/station-medium.png'
import stationCloudSmallTexture from '@/assets/clouds/station-small.png'
import parkCloudLargeTexture from '@/assets/clouds/park-large.png'
import parkCloudMediumTexture from '@/assets/clouds/park-medium.png'
import parkCloudSmallTexture from '@/assets/clouds/park-small.png'
import bankCloudLargeTexture from '@/assets/clouds/bank-large.png'
import bankCloudMediumTexture from '@/assets/clouds/bank-medium.png'
import bankCloudSmallTexture from '@/assets/clouds/bank-small.png'
//
import pigeonLeftPeckTexture from '@/assets/pigeon/left-peck.png'
import pigeonLeftStandTexture from '@/assets/pigeon/left-stand.png'
import pigeonRightPeckTexture from '@/assets/pigeon/right-peck.png'
import pigeonRightStandTexture from '@/assets/pigeon/right-stand.png'
// Characters
// Generaic
import characterGenericFrontStillTexture from '@/assets/character/generic/front-still.png'
import characterGenericFrontWalk1Texture from '@/assets/character/generic/front-walk-1.png'
import characterGenericFrontWalk2Texture from '@/assets/character/generic/front-walk-2.png'
import characterGenericBackWalk1Texture from '@/assets/character/generic/back-walk-1.png'
import characterGenericBackWalk2Texture from '@/assets/character/generic/back-walk-2.png'
import characterGenericLeftWalk1Texture from '@/assets/character/generic/left-walk-1.png'
import characterGenericLeftWalk2Texture from '@/assets/character/generic/left-walk-2.png'
import characterGenericRightWalk1Texture from '@/assets/character/generic/right-walk-1.png'
import characterGenericRightWalk2Texture from '@/assets/character/generic/right-walk-2.png'
import characterGenericLeftWalk1SideTexture from '@/assets/character/generic/left-walk-1-side.png'
import characterGenericLeftWalk2SideTexture from '@/assets/character/generic/left-walk-2-side.png'
// Station Master
import characterStationMasterMap1Texture from '@/assets/character/station-master/map-1.png'
import characterStationMasterMap2Texture from '@/assets/character/station-master/map-2.png'
import characterStationMasterMap3Texture from '@/assets/character/station-master/map-3.png'
import characterStationMasterStation1Texture from '@/assets/character/station-master/station-1.png'
import characterStationMasterStation2Texture from '@/assets/character/station-master/station-2.png'
// Guard
import characterMapGuard1Texture from '@/assets/character/guard/map-1.png'
import characterMapGuard2Texture from '@/assets/character/guard/map-2.png'
import characterMapGuard3Texture from '@/assets/character/guard/map-3.png'
import characterBankGuard1Texture from '@/assets/character/guard/bank-1.png'
import characterBankGuard2Texture from '@/assets/character/guard/bank-2.png'
// Baloon Vendor
import characterBaloonVendor1Texture from '@/assets/character/ballon-vendor/1.png'
import characterBaloonVendor2Texture from '@/assets/character/ballon-vendor/2.png'
// Icecream Vendor
import characterMapIcecreamVendor1Texture from '@/assets/character/icecream-vendor/map-1.png'
import characterMapIcecreamVendor2Texture from '@/assets/character/icecream-vendor/map-2.png'
import characterParkIcecreamVendorHandoutTexture from '@/assets/character/icecream-vendor/park-handout.png'
import characterParkIcecreamVendorWave1Texture from '@/assets/character/icecream-vendor/park-wave-1.png'
import characterParkIcecreamVendorWave2Texture from '@/assets/character/icecream-vendor/park-wave-2.png'
// Panic Character
import characterPanicGreenMapLeftTexture from '@/assets/character/panic/green/map-left.png'
import characterPanicGreenMapRightTexture from '@/assets/character/panic/green/map-right.png'
import characterPanicGreenMapStandTexture from '@/assets/character/panic/green/map-stand.png'
import characterPanicGreenBankLeftTexture from '@/assets/character/panic/green/bank-left.png'
import characterPanicGreenBankRightTexture from '@/assets/character/panic/green/bank-right.png'
//
import characterPanicPurpleMapLeftTexture from '@/assets/character/panic/purple/map-left.png'
import characterPanicPurpleMapRightTexture from '@/assets/character/panic/purple/map-right.png'
import characterPanicPurpleMapStandTexture from '@/assets/character/panic/purple/map-stand.png'
import characterPanicPurpleBankLeftTexture from '@/assets/character/panic/purple/bank-left.png'
import characterPanicPurpleBankRightTexture from '@/assets/character/panic/purple/bank-right.png'
// Sus Guy
import characterSusGuyFishing1Texture from '@/assets/character/sus-guy/fishing-1.png'
import characterSusGuyFishing2Texture from '@/assets/character/sus-guy/fishing-2.png'
import characterSusGuyWalkBack1Texture from '@/assets/character/sus-guy/walk-back-1.png'
import characterSusGuyWalkBack2Texture from '@/assets/character/sus-guy/walk-back-2.png'
import characterSusGuyWalkFront1Texture from '@/assets/character/sus-guy/walk-front-1.png'
import characterSusGuyWalkFront2Texture from '@/assets/character/sus-guy/walk-front-2.png'
import characterSusGuyWalkLeft1Texture from '@/assets/character/sus-guy/walk-left-1.png'
import characterSusGuyWalkLeft2Texture from '@/assets/character/sus-guy/walk-left-2.png'
import characterSusGuyWalkRight1Texture from '@/assets/character/sus-guy/walk-right-1.png'
import characterSusGuyWalkRight2Texture from '@/assets/character/sus-guy/walk-right-2.png'
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
// Data Trail
import dataTrailBack1Texture from '@/assets/character/trail/back-1.png'
import dataTrailBack2Texture from '@/assets/character/trail/back-2.png'
import dataTrailBack3Texture from '@/assets/character/trail/back-3.png'
import dataTrailBack4Texture from '@/assets/character/trail/back-4.png'
import dataTrailSide1Texture from '@/assets/character/trail/side-1.png'
import dataTrailSide2Texture from '@/assets/character/trail/side-2.png'
import dataTrailSide3Texture from '@/assets/character/trail/side-3.png'
import dataTrailSide4Texture from '@/assets/character/trail/side-4.png'
// Map
import map1xBgTexture from '@/assets/map/1x-bg.png'
import map1xFgTexture from '@/assets/map/1x-fg.png'
import mapPalmTreesTexture from '@/assets/map/palm-trees.png'
import mapCarTexture from '@/assets/map/car.png'
import mapFenceTexture from '@/assets/map/fence.png'
// Fountain
import mapFountain1Texture from '@/assets/map/fountain/1.png'
import mapFountain2Texture from '@/assets/map/fountain/2.png'
import mapFountain3Texture from '@/assets/map/fountain/3.png'
import mapFountain4Texture from '@/assets/map/fountain/4.png'
import mapFountain5Texture from '@/assets/map/fountain/5.png'
// Street Lamp
import streetLamp1Texture from '@/assets/map/street-lamp/1.png'
import streetLamp2Texture from '@/assets/map/street-lamp/2.png'
import streetLamp3Texture from '@/assets/map/street-lamp/3.png'
import streetLamp4Texture from '@/assets/map/street-lamp/4.png'
import streetLamp5Texture from '@/assets/map/street-lamp/5.png'
// Flag
import flagPink1Texture from '@/assets/map/flags/pink-1.png'
import flagPink2Texture from '@/assets/map/flags/pink-2.png'
import flagSchoolBlue1Texture from '@/assets/map/flags/school-blue-1.png'
import flagSchoolBlue2Texture from '@/assets/map/flags/school-blue-2.png'
import flagSchoolRed1Texture from '@/assets/map/flags/school-red-1.png'
import flagSchoolRed2Texture from '@/assets/map/flags/school-red-2.png'
import flagStation1Texture from '@/assets/map/flags/station-1.png'
import flagStation2Texture from '@/assets/map/flags/station-2.png'
// Wave
import wave1Texture from '@/assets/map/waves/1.png'
import wave2Texture from '@/assets/map/waves/2.png'
import wave3Texture from '@/assets/map/waves/3.png'
import wave4Texture from '@/assets/map/waves/4.png'
import wave5Texture from '@/assets/map/waves/5.png'
// Baloon Stand
import baloonStand1Texture from '@/assets/map/baloon-stand/1.png'
import baloonStand2Texture from '@/assets/map/baloon-stand/2.png'
// Store App Sign
import appSign1Texture from '@/assets/map/app-sign/1.png'
import appSign2Texture from '@/assets/map/app-sign/2.png'
// Dog
import dog1Texture from '@/assets/map/dog/1.png'
import dog2Texture from '@/assets/map/dog/2.png'
// Wolf
import wolfLeft1Texture from '@/assets/map/wolf/left-1.png'
import wolfLeft2Texture from '@/assets/map/wolf/left-2.png'
import wolfRight1Texture from '@/assets/map/wolf/right-1.png'
import wolfRight2Texture from '@/assets/map/wolf/right-2.png'
// Map Tram
import tramFrontTexture from '@/assets/map/tram/front.png'
import tramBackTexture from '@/assets/map/tram/back.png'
import tramRightTexture from '@/assets/map/tram/right.png'
// import tramLeftTexture from '@/assets/map/tram/left.png'
//
import mapBoat1Texture from '@/assets/map/boat/1.png'
import mapBoat2Texture from '@/assets/map/boat/2.png'
//
import mapStationBgTexture from '@/assets/map/station-bg.png'
import mapStationFgTexture from '@/assets/map/station-fg.png'
/////
// Station
import stationSkyTexture from '@/assets/station/sky.png'
import stationPlatformBgTexture from '@/assets/station/platform-bg.png'
import stationPlatformFgTexture from '@/assets/station/platform-fg.png'
import stationTramWireTexture from '@/assets/station/tram-wire.png'
import stationTramTexture from '@/assets/station/tram.png'
//////
// Park
import parkBgTexture from '@/assets/park/bg.png'
import parkFgTexture from '@/assets/park/fg.png'
// Bank
import bankSkyTexture from '@/assets/bank/sky.png'
import bankBgTexture from '@/assets/bank/bg.png'
//
import bankDoorOpenTexture from '@/assets/bank/door/open.png'
import bankDoorCloseTexture from '@/assets/bank/door/close.png'
//
import bankAlarmBell1Texture from '@/assets/bank/alarm-bell/1.png'
import bankAlarmBell2Texture from '@/assets/bank/alarm-bell/2.png'
//
import bankAlarmLightLeft1Texture from '@/assets/bank/alarm-light/left-1.png'
import bankAlarmLightLeft2Texture from '@/assets/bank/alarm-light/left-2.png'
import bankAlarmLightRight1Texture from '@/assets/bank/alarm-light/right-1.png'
import bankAlarmLightRight2Texture from '@/assets/bank/alarm-light/right-2.png'
//
import popupProtip11Texture from '@/assets/popup/protip/1/1.png'
import popupProtip12Texture from '@/assets/popup/protip/1/2.png'
import popupProtip21Texture from '@/assets/popup/protip/2/1.png'
import popupProtip22Texture from '@/assets/popup/protip/2/2.png'
import popupProtip31Texture from '@/assets/popup/protip/3/1.png'
import popupProtip32Texture from '@/assets/popup/protip/3/2.png'
import popupProtip41Texture from '@/assets/popup/protip/4/1.png'
import popupProtip42Texture from '@/assets/popup/protip/4/2.png'
import popupProtip51Texture from '@/assets/popup/protip/5/1.png'
import popupProtip52Texture from '@/assets/popup/protip/5/2.png'

export const resources = reactive({
  // fonts
  frontINET,
  frontLAN,
  frontUNI,

  // images
  smartphone,
  smartphoneBankingHighlighted,
  smartphoneBanking,
  smartphoneEmailHighlighted,
  smartphoneEmail,
  smartphoneGameHighlighted,
  smartphoneGame,
  smartphoneHealthHighlighted,
  smartphoneHealth,
  smartphoneMovieHighlighted,
  smartphoneMovie,
  smartphoneMusicHighlighted,
  smartphoneMusic,
  smartphoneShoppingHighlighted,
  smartphoneShopping,
  smartphoneSocialHighlighted,
  smartphoneSocial,
  // asset
  popupBar: popupBarTexture,
  popupSquare: popupSquareTexture,
  popupLandscape: popupLandscapeTexture,
  popupPortrait: popupPortraitTexture,
  //
  popupProtip11: popupProtip11Texture,
  popupProtip12: popupProtip12Texture,
  popupProtip21: popupProtip21Texture,
  popupProtip22: popupProtip22Texture,
  popupProtip31: popupProtip31Texture,
  popupProtip32: popupProtip32Texture,
  popupProtip41: popupProtip41Texture,
  popupProtip42: popupProtip42Texture,
  popupProtip51: popupProtip51Texture,
  popupProtip52: popupProtip52Texture,
  //
  popupCutSceneHomeTime: popupCutSceneHomeTimeTexture,
  popupCutSceneResult1: popupCutSceneResult1Texture,
  popupCutSceneResult2: popupCutSceneResult2Texture,
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
  mapBg: map1xBgTexture,
  mapFg: map1xFgTexture,
  mapCar: mapCarTexture,
  mapFence: mapFenceTexture,
  mapPalmTrees: mapPalmTreesTexture,
  //
  fountain1: mapFountain1Texture,
  fountain2: mapFountain2Texture,
  fountain3: mapFountain3Texture,
  fountain4: mapFountain4Texture,
  fountain5: mapFountain5Texture,
  //
  mapStationBg: mapStationBgTexture,
  mapStationFg: mapStationFgTexture,
  //
  streetLamp1: streetLamp1Texture,
  streetLamp2: streetLamp2Texture,
  streetLamp3: streetLamp3Texture,
  streetLamp4: streetLamp4Texture,
  streetLamp5: streetLamp5Texture,
  //
  flagPink1: flagPink1Texture,
  flagPink2: flagPink2Texture,
  flagSchoolBlue1: flagSchoolBlue1Texture,
  flagSchoolBlue2: flagSchoolBlue2Texture,
  flagSchoolRed1: flagSchoolRed1Texture,
  flagSchoolRed2: flagSchoolRed2Texture,
  flagStation1: flagStation1Texture,
  flagStation2: flagStation2Texture,
  //
  wave1: wave1Texture,
  wave2: wave2Texture,
  wave3: wave3Texture,
  wave4: wave4Texture,
  wave5: wave5Texture,
  //
  mapCloudLarge: mapCloudLargeTexture,
  mapCloudMedium: mapCloudMediumTexture,
  mapCloudSmall: mapCloudSmallTexture,
  //
  tramFront: tramFrontTexture,
  tramBack: tramBackTexture,
  tramRight: tramRightTexture,
  //
  mapBoat1: mapBoat1Texture,
  mapBoat2: mapBoat2Texture,
  //
  mapStationBgTexture: mapStationBgTexture,
  mapStationFgTexture: mapStationBgTexture,
  //
  baloon1: baloonStand1Texture,
  baloon2: baloonStand2Texture,
  //
  appSign1: appSign1Texture,
  appSign2: appSign2Texture,
  //
  dog1: dog1Texture,
  dog2: dog2Texture,
  //
  wolfLeft1: wolfLeft1Texture,
  wolfLeft2: wolfLeft2Texture,
  wolfRight1: wolfRight1Texture,
  wolfRight2: wolfRight2Texture,
  // Characters
  characterSusGuyFishing1: characterSusGuyFishing1Texture,
  characterSusGuyFishing2: characterSusGuyFishing2Texture,
  characterSusGuyWalkBack1: characterSusGuyWalkBack1Texture,
  characterSusGuyWalkBack2: characterSusGuyWalkBack2Texture,
  characterSusGuyWalkFront1: characterSusGuyWalkFront1Texture,
  characterSusGuyWalkFront2: characterSusGuyWalkFront2Texture,
  characterSusGuyWalkLeft1: characterSusGuyWalkLeft1Texture,
  characterSusGuyWalkLeft2: characterSusGuyWalkLeft2Texture,
  characterSusGuyWalkRight1: characterSusGuyWalkRight1Texture,
  characterSusGuyWalkRight2: characterSusGuyWalkRight2Texture,
  //
  characterPanicGreenMapLeft: characterPanicGreenMapLeftTexture,
  characterPanicGreenMapRight: characterPanicGreenMapRightTexture,
  characterPanicGreenMapStand: characterPanicGreenMapStandTexture,
  characterPanicGreenBankLeft: characterPanicGreenBankLeftTexture,
  characterPanicGreenBankRight: characterPanicGreenBankRightTexture,
  //
  characterPanicPurpleMapLeft: characterPanicPurpleMapLeftTexture,
  characterPanicPurpleMapRight: characterPanicPurpleMapRightTexture,
  characterPanicPurpleMapStand: characterPanicPurpleMapStandTexture,
  characterPanicPurpleBankLeft: characterPanicPurpleBankLeftTexture,
  characterPanicPurpleBankRight: characterPanicPurpleBankRightTexture,
  //
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
  mapCharacterStationMaster1: characterStationMasterMap1Texture,
  mapCharacterStationMaster2: characterStationMasterMap2Texture,
  mapCharacterStationMaster3: characterStationMasterMap3Texture,
  //
  mapCharacterIcecreamVendor1: characterMapIcecreamVendor1Texture,
  mapCharacterIcecreamVendor2: characterMapIcecreamVendor2Texture,
  // Main Character
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
  stationCloudSmall: stationCloudSmallTexture,
  stationCloudMedium: stationCloudMediumTexture,
  stationCloudLarge: stationCloudLargeTexture,
  //
  platformBackground: stationPlatformBgTexture,
  platformForeground: stationPlatformFgTexture,
  //
  stationTram: stationTramTexture,
  stationTramWire: stationTramWireTexture,
  //
  stationCharacterStationMaster1: characterStationMasterStation1Texture,
  stationCharacterStationMaster2: characterStationMasterStation2Texture,
  //
  parkBackground: parkBgTexture,
  parkForeground: parkFgTexture,
  //
  parkCloudSmall: parkCloudSmallTexture,
  parkCloudMedium: parkCloudMediumTexture,
  parkCloudLarge: parkCloudLargeTexture,
  //
  parkCharacterIcecreamVendorWave1: characterParkIcecreamVendorWave1Texture,
  parkCharacterIcecreamVendorWave2: characterParkIcecreamVendorWave2Texture,
  parkCharacterIcecreamVendorHandout: characterParkIcecreamVendorHandoutTexture,
  //
  characterBaloonVendor1: characterBaloonVendor1Texture,
  characterBaloonVendor2: characterBaloonVendor2Texture,
  //
  bankSky: bankSkyTexture,
  bankBackground: bankBgTexture,
  //
  bankCloudSmall: bankCloudSmallTexture,
  bankCloudMedium: bankCloudMediumTexture,
  bankCloudLarge: bankCloudLargeTexture,
  //
  bankDoorClose: bankDoorCloseTexture,
  bankDoorOpen: bankDoorOpenTexture,
  //
  bankAlarmBell1: bankAlarmBell1Texture,
  bankAlarmBell2: bankAlarmBell2Texture,
  //
  bankAlarmLightLeft1: bankAlarmLightLeft1Texture,
  bankAlarmLightLeft2: bankAlarmLightLeft2Texture,
  bankAlarmLightRight1: bankAlarmLightRight1Texture,
  bankAlarmLightRight2: bankAlarmLightRight2Texture,
  //
  mapCharacterGuard1: characterMapGuard1Texture,
  mapCharacterGuard2: characterMapGuard2Texture,
  mapCharacterGuard3: characterMapGuard3Texture,
  bankCharacterGuard1: characterBankGuard1Texture,
  bankCharacterGuard2: characterBankGuard2Texture,
})

export type Character = 'black' | 'blue' | 'red' | 'violate'

const { width: screenWidth, height: screenHeight } = useWindowSize()

/* const timeline = [
  { screen: 0, scene: 0 },
  { screen: 0, scene: 0 },
] */

export const useGameStore = defineStore('game', () => {
  const isLandscape = computed(() => screenWidth.value > screenHeight.value)
  const isMobile = computed(() => !(Math.min(screenWidth.value, screenHeight.value) > 640))

  const currentMapStateIndex = ref(0)
  const currentSceneIndex = ref(20)
  const currentScreenIndex = ref(6)

  const currentScreenAnimation = ref<'init' | 'started' | 'finished'>('init')
  const $currentScreenState = reactive({ x: 0, y: 0, scale: 1, alpha: 1, time: 0 })

  const characterSkin = ref<Character>()
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
    $motionBlur.value = value
  }

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
    console.log({ currentSceneIndex: currentSceneIndex.value })
  }

  function nextMapState(animate = true) {
    if (animate) currentScreenAnimation.value = 'started'
    currentMapStateIndex.value++
    console.log({ currentMapStateIndex: currentMapStateIndex.value })
  }

  function setCharacterSkin(value: Character) {
    characterSkin.value = value
  }

  return {
    isLandscape,
    isMobile,
    currentSceneIndex,
    currentMapStateIndex,
    currentScreenIndex,
    currentScreenAnimation,
    currentScreenState,
    rotationStop,
    motionBlur,
    hardStop,
    characterSkin,
    updateScreen,
    toggleHardStop,
    toggleMotionBlur,
    toggleGameMode,
    nextScene,
    nextMapState,
    setCharacterSkin,
  }
})
