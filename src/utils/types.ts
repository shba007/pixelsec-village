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
