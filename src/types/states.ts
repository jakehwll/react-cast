export type validStates = 'IDLE' | 'BUFFERING' | 'LOADED' | 'PLAYING' | 'PAUSED'

export type StatesProps = {
  [key: string]: validStates
}

const States: StatesProps = {
  IDLE: 'IDLE',
  BUFFERING: 'BUFFERING',
  LOADED: 'LOADED',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
}

export default States