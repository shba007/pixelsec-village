import { computed, reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFullscreen, useScreenOrientation, useWindowSize } from '@vueuse/core'

// public
// fonts
import frontINET from '/fonts/INET.ttf'
import frontLAN from '/fonts/LAN.ttf'
import frontUNI from '/fonts/UNI.ttf'
// asset
import popupScene01LandscapeTexture from '@/assets/popup/scene-0-1-landscape.png'
import popupScene01PortraitTexture from '@/assets/popup/scene-0-1-portrait.png'
import popupScene02Texture from '@/assets/popup/scene-0-2.png'
import popupScene03Texture from '@/assets/popup/scene-0-3.png'
import popupScene04Texture from '@/assets/popup/scene-0-4.png'
import popupScene05Texture from '@/assets/popup/scene-0-5.png'
import popupScene04Button11Texture from '@/assets/popup/scene-0-4-button-1-1.png'
import popupScene04Button21Texture from '@/assets/popup/scene-0-4-button-2-1.png'
import popupScene11Button11Texture from '@/assets/popup/scene-1-1-button-1-1.png'
import popupScene11Button21Texture from '@/assets/popup/scene-1-1-button-2-1.png'
import popupScene11Button31Texture from '@/assets/popup/scene-1-1-button-3-1.png'
import popupScene11Button41Texture from '@/assets/popup/scene-1-1-button-4-1.png'
import popupScene11Texture from '@/assets/popup/scene-1-1.png'
import popupScene12Texture from '@/assets/popup/scene-1-2.png'
import smartphoneBankingHighlighted from '@/assets/station/smartphone/banking-highlighted.png'
import smartphoneBanking from '@/assets/station/smartphone/banking.png'
import smartphoneEmailHighlighted from '@/assets/station/smartphone/email-highlighted.png'
import smartphoneEmail from '@/assets/station/smartphone/email.png'
import smartphoneGameHighlighted from '@/assets/station/smartphone/game-highlighted.png'
import smartphoneGame from '@/assets/station/smartphone/game.png'
import smartphoneHealthHighlighted from '@/assets/station/smartphone/health-highlighted.png'
import smartphoneHealth from '@/assets/station/smartphone/health.png'
import smartphoneMovieHighlighted from '@/assets/station/smartphone/movie-highlighted.png'
import smartphoneMovie from '@/assets/station/smartphone/movie.png'
import smartphoneMusicHighlighted from '@/assets/station/smartphone/music-highlighted.png'
import smartphoneMusic from '@/assets/station/smartphone/music.png'
import smartphoneShoppingHighlighted from '@/assets/station/smartphone/shopping-highlighted.png'
import smartphoneShopping from '@/assets/station/smartphone/shopping.png'
import smartphoneSocialHighlighted from '@/assets/station/smartphone/social-highlighted.png'
import smartphoneSocial from '@/assets/station/smartphone/social.png'
import popupScene31Texture from '@/assets/popup/scene-3-1.png'
import popupScene32Texture from '@/assets/popup/scene-3-2.png'
import popupScene33Texture from '@/assets/popup/scene-3-3.png'
import popupScene34Texture from '@/assets/popup/scene-3-4.png'
import popupScene51Texture from '@/assets/popup/scene-5-1.png'
import popupScene52Texture from '@/assets/popup/scene-5-2.png'
import popupScene52Button11Texture from '@/assets/popup/scene-5-2-button-1-1.png'
import popupScene52Button12Texture from '@/assets/popup/scene-5-2-button-1-2.png'
import popupScene52Button21Texture from '@/assets/popup/scene-5-2-button-2-1.png'
import popupScene52Button22Texture from '@/assets/popup/scene-5-2-button-2-2.png'
import popupScene52Button31Texture from '@/assets/popup/scene-5-2-button-3-1.png'
import popupScene52Button32Texture from '@/assets/popup/scene-5-2-button-3-2.png'
import popupScene52Button41Texture from '@/assets/popup/scene-5-2-button-4-1.png'
import popupScene52Button42Texture from '@/assets/popup/scene-5-2-button-4-2.png'
import popupScene53Texture from '@/assets/popup/scene-5-3.png'
import popupScene54Texture from '@/assets/popup/scene-5-4.png'
import popupScene61Texture from '@/assets/popup/scene-6-1.png'
import popupScene62Texture from '@/assets/popup/scene-6-2.png'
import popupScene63Texture from '@/assets/popup/scene-6-3.png'
import popupScene63Button11Texture from '@/assets/popup/scene-6-3-button-1-1.png'
import popupScene63Button12Texture from '@/assets/popup/scene-6-3-button-1-2.png'
import popupScene63Button21Texture from '@/assets/popup/scene-6-3-button-2-1.png'
import popupScene63Button22Texture from '@/assets/popup/scene-6-3-button-2-2.png'
import popupScene64Texture from '@/assets/popup/scene-6-4.png'
import popupScene65Texture from '@/assets/popup/scene-6-5.png'
import popupScene71Texture from '@/assets/popup/scene-7-1.png'
import popupScene72Texture from '@/assets/popup/scene-7-2.png'
import popupScene73Texture from '@/assets/popup/scene-7-3.png'
import popupScene74Texture from '@/assets/popup/scene-7-4.png'
import popupScene8Texture from '@/assets/popup/scene-8.png'
//
import popupProtip1Texture from '@/assets/popup/protip-1.png'
import popupProtip2Texture from '@/assets/popup/protip-2.png'
import popupProtip3Texture from '@/assets/popup/protip-3.png'
import popupProtip4Texture from '@/assets/popup/protip-4.png'
import popupProtip5Texture from '@/assets/popup/protip-5.png'
//
import buttonLongTexture from '@/assets/buttons/long/pressed.png'
import buttonLongPressedTexture from '@/assets/buttons/long/unpressed.png'
import buttonShortTexture from '@/assets/buttons/short/pressed.png'
import buttonShortPressedTexture from '@/assets/buttons/short/unpressed.png'
import buttonSquareTexture from '@/assets/buttons/square/unpressed.png'
import buttonSquarePressedTexture from '@/assets/buttons/square/pressed.png'
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
import mapBoat1Texture from '@/assets/map/boat/1.png'
import mapBoat2Texture from '@/assets/map/boat/2.png'
//
import mapStationBgTexture from '@/assets/map/station-bg.png'
import mapStationFgTexture from '@/assets/map/station-fg.png'
//
// Station
import stationSkyTexture from '@/assets/station/sky.png'
import stationPlatformBgTexture from '@/assets/station/platform-bg.png'
import stationPlatformFgTexture from '@/assets/station/platform-fg.png'
import stationTramWireTexture from '@/assets/station/tram-wire.png'
import stationTramTexture from '@/assets/station/tram.png'
//
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
import resultStrawHutBgTexture from '@/assets/strawhut/bg.png'
import resultStrawHutFgTexture from '@/assets/strawhut/palm-trees.png'

export const resources = reactive({
  // fonts
  frontINET,
  frontLAN,
  frontUNI,
  // images
  //
  popupScene01Landscape: popupScene01LandscapeTexture,
  popupScene01Portrait: popupScene01PortraitTexture,
  popupScene02: popupScene02Texture,
  popupScene03: popupScene03Texture,
  popupScene04: popupScene04Texture,
  popupScene04Button11: popupScene04Button11Texture,
  popupScene04Button12: popupScene04Button11Texture,
  popupScene04Button21: popupScene04Button21Texture,
  popupScene04Button22: popupScene04Button21Texture,
  popupScene05: popupScene05Texture,
  popupScene11: popupScene11Texture,
  popupScene11Button11: popupScene11Button11Texture,
  popupScene11Button12: popupScene11Button11Texture,
  popupScene11Button21: popupScene11Button21Texture,
  popupScene11Button22: popupScene11Button21Texture,
  popupScene11Button31: popupScene11Button31Texture,
  popupScene11Button32: popupScene11Button31Texture,
  popupScene11Button41: popupScene11Button41Texture,
  popupScene11Button42: popupScene11Button41Texture,
  popupScene12: popupScene12Texture,
  smartphoneBanking,
  smartphoneBankingHighlighted,
  smartphoneEmail,
  smartphoneEmailHighlighted,
  smartphoneGame,
  smartphoneGameHighlighted,
  smartphoneHealth,
  smartphoneHealthHighlighted,
  smartphoneMovie,
  smartphoneMovieHighlighted,
  smartphoneMusic,
  smartphoneMusicHighlighted,
  smartphoneShopping,
  smartphoneShoppingHighlighted,
  smartphoneSocial,
  smartphoneSocialHighlighted,
  popupScene31: popupScene31Texture,
  popupScene32: popupScene32Texture,
  popupScene33: popupScene33Texture,
  popupScene34: popupScene34Texture,
  popupScene51: popupScene51Texture,
  popupScene52: popupScene52Texture,
  popupScene52Button11: popupScene52Button11Texture,
  popupScene52Button12: popupScene52Button12Texture,
  popupScene52Button21: popupScene52Button21Texture,
  popupScene52Button22: popupScene52Button22Texture,
  popupScene52Button31: popupScene52Button31Texture,
  popupScene52Button32: popupScene52Button32Texture,
  popupScene52Button41: popupScene52Button41Texture,
  popupScene52Button42: popupScene52Button42Texture,
  popupScene53: popupScene53Texture,
  popupScene54: popupScene54Texture,
  popupScene61: popupScene61Texture,
  popupScene62: popupScene62Texture,
  popupScene63: popupScene63Texture,
  popupScene64: popupScene64Texture,
  popupScene63Button11: popupScene63Button11Texture,
  popupScene63Button12: popupScene63Button12Texture,
  popupScene63Button21: popupScene63Button21Texture,
  popupScene63Button22: popupScene63Button22Texture,
  popupScene65: popupScene65Texture,
  popupScene71: popupScene71Texture,
  popupScene72: popupScene72Texture,
  popupScene73: popupScene73Texture,
  popupScene74: popupScene74Texture,
  popupScene8: popupScene8Texture,
  //
  popupProtip1: popupProtip1Texture,
  popupProtip2: popupProtip2Texture,
  popupProtip3: popupProtip3Texture,
  popupProtip4: popupProtip4Texture,
  popupProtip5: popupProtip5Texture,
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
  parkBg: parkBgTexture,
  parkFg: parkFgTexture,
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
  //
  resultStrawHutBg: resultStrawHutBgTexture,
  resultStrawHutFg: resultStrawHutFgTexture,
})

export type Character = 'black' | 'blue' | 'red' | 'violate'

export const timeline: {
  screen: number
  popup: number
  scene: number
  character: number
  time?: number
}[] = [
    { screen: 0, popup: 0, scene: 0, character: 0, time: 0 }, // welcome
    { screen: 0, popup: 0.5, scene: 1, character: 0, time: 0 }, //
    { screen: 0, popup: 1, scene: 2, character: 0, time: 0 }, // lets start
    { screen: 0, popup: 2, scene: 3, character: 0, time: 0 }, // choose avatar
    { screen: 0, popup: 3, scene: 4, character: 0, time: 0 }, // read t&c
    { screen: 0, popup: 4, scene: 4, character: 0, time: 0 }, // t&c
    { screen: 0, popup: -1, scene: 5, character: 0, time: 0 }, // zoom
    { screen: 1, popup: -1, scene: 5, character: 0, time: 0 }, // in to the station
    { screen: 1, popup: 5, scene: 5, character: 0, time: 0 }, // your age
    { screen: 1, popup: 6, scene: 5, character: 0, time: 0 }, // your used app
    { screen: 2, popup: 7, scene: 5, character: 1, time: 0.25 }, // out of the station in the map
    { screen: 2, popup: 7, scene: 6, character: 2, time: 0.5 }, //
    { screen: 2, popup: 7, scene: 7, character: 3, time: 0.5 }, //
    { screen: 2, popup: -1, scene: 8, character: 4, time: 1.25 }, // changed
    { screen: 2, popup: -1, scene: 9, character: 5, time: 3 },
    { screen: 2, popup: -1, scene: 10, character: 6, time: 6 },
    { screen: 2, popup: -1, scene: 11, character: 7, time: 9 },
    { screen: 2, popup: -1, scene: 12, character: 8, time: 12 },
    { screen: 2, popup: -1, scene: 13, character: 9, time: 14.25 },
    { screen: 2, popup: -1, scene: 14, character: 10, time: 15 },
    { screen: 2, popup: -1, scene: 15, character: 11, time: 16.5 },
    { screen: 2, popup: -1, scene: 16, character: 12 },
    { screen: 3, popup: 8, scene: 16, character: 12 },
    { screen: 3, popup: 9, scene: 16, character: 12 },
    { screen: 3, popup: 10, scene: 16, character: 12 },
    { screen: 4, popup: 11, scene: 17, character: 13 },
    { screen: 4, popup: 11, scene: 18, character: 14 },
    { screen: 4, popup: 11, scene: 19, character: 15 },
    //
    { screen: 5, popup: 12, scene: 19, character: 15 },
    { screen: 5, popup: 13, scene: 19, character: 15 },
    { screen: 5, popup: 14, scene: 19, character: 15 },
    { screen: 5, popup: 15, scene: 19, character: 15 },
    { screen: 5, popup: 16, scene: 20, character: 16 },
    { screen: 5, popup: 16, scene: 20, character: 16 },
    //
    { screen: 6, popup: -1, scene: 21, character: 17 },
    { screen: 6, popup: -1, scene: 22, character: 18 },
    { screen: 6, popup: -1, scene: 23, character: 19 },
    { screen: 6, popup: -1, scene: 23, character: 20 },
    { screen: 6, popup: -1, scene: 23, character: 21 },
    { screen: 6, popup: -1, scene: 23, character: 22 },
    { screen: 6, popup: -1, scene: 23, character: 23 },
    { screen: 6, popup: -1, scene: 23, character: 24 },
    { screen: 6, popup: -1, scene: 23, character: 25 },
    { screen: 6, popup: 17, scene: 23, character: 26 },
    { screen: 6, popup: 18, scene: 23, character: 27 },
    { screen: 6, popup: 18, scene: 23, character: 28 },
    { screen: 6, popup: -1, scene: 24, character: 29 },
    // loop start
    { screen: 6, popup: -1, scene: 25, character: 30 },
    { screen: 6, popup: -1, scene: 26, character: 31 },
    { screen: 6, popup: -1, scene: 27, character: 32 },
    { screen: 6, popup: 19, scene: 28, character: 33 },
    { screen: 6, popup: 20, scene: 29, character: 34 },
    { screen: 6, popup: 20, scene: 29, character: 34 },
    { screen: 6, popup: -1, scene: 30, character: 35 },
    { screen: 6, popup: 21, scene: 30, character: 35 },
    { screen: 6, popup: 22, scene: 30, character: 36 },
    // **
    { screen: 6, popup: -1, scene: 31, character: 37 },
    { screen: 6, popup: 23, scene: 32, character: 38 },
    { screen: 6, popup: 23, scene: 33, character: 39 },
    //
    { screen: 7, popup: -1, scene: 33, character: 39 },
    { screen: 7, popup: -1, scene: 33, character: 39 },
  ]

const { width: screenWidth, height: screenHeight } = useWindowSize()

export const useGameStore = defineStore('game', () => {
  const isLandscape = computed(() => screenWidth.value > screenHeight.value)
  const isMobile = computed(() => !(Math.min(screenWidth.value, screenHeight.value) > 640))

  const timelineIndex = ref(0)

  const currentScreenIndex = computed(() => timeline[timelineIndex.value].screen)
  const currentPopupIndex = computed(() => timeline[timelineIndex.value].popup)
  const currentSceneIndex = computed(() => timeline[timelineIndex.value].scene)
  const currentCharacterIndex = computed(() => timeline[timelineIndex.value].character)
  const characterSkin = ref<Character>()

  const $motionBlur = ref(false)
  const motionBlur = computed(() => $motionBlur.value)

  const $hardStop = ref(false)
  const hardStop = computed(() => $hardStop.value)

  const rotationStop = computed(() => $hardStop.value || (currentSceneIndex.value > 0 && !isLandscape.value))

  const { isSupported: isFullscreenSupported, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, lockOrientation, unlockOrientation } = useScreenOrientation()

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

  function setCharacterSkin(value: Character) {
    characterSkin.value = value
  }

  function nextTimeline(data?: { screen?: number; id: number }) {
    const { screen = 1, id } = data ?? { screen: 1, id: -1 }
    // alert(`Timeline Trigger ${id}`)

    timelineIndex.value += screen
    console.log({ id: id })
    // console.timeEnd()
    // console.time()
  }

  return {
    isLandscape,
    isMobile,
    rotationStop,
    motionBlur,
    hardStop,
    timelineIndex,
    currentScreenIndex,
    currentPopupIndex,
    currentSceneIndex,
    currentCharacterIndex,
    characterSkin,
    toggleHardStop,
    toggleMotionBlur,
    toggleGameMode,
    setCharacterSkin,
    nextTimeline,
  }
})
