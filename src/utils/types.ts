export interface State {
  x: number
  y: number
  scale: number
  alpha: number
  time: number
}

export interface Asset {
  loaded: boolean
  alias: string
  states: State[]
  state: State
  animation: 'init' | 'started' | 'finished'
}

export enum SCALE_MODES {
  NEAREST,
  LINEAR,
}

export enum BLEND_MODES {
  NORMAL,
  ADD,
  SCREEN,
  DARKEN,
  LIGHTEN,
  COLOR_DODGE,
  COLOR_BURN,
  LINEAR_BURN,
  LINEAR_DODGE,
  LINEAR_LIGHT,
  HARD_LIGHT,
  SOFT_LIGHT,
  PIN_LIGHT,
  DIFFERENCE,
  EXCLUSION,
  OVERLAY,
  SATURATION,
  COLOR,
  LUMINOSITY,
  ADD_NPM,
  SUBTRACT,
  DIVIDE,
  VIVID_LIGHT,
  HARD_MIX,
  NEGATION,
}
