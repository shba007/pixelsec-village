export interface AssetState {
  x: number
  y: number
  scale: number
  alpha?: number
  time: number
}

export interface Asset {
  loaded: boolean
  alias: string
  steps: AssetState[]
  position: AssetState
  animation: 'init' | 'started' | 'finished'
}
