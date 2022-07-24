import React, { createContext, useState } from 'react'

// TODO "Live" playback.
// TODO "Skippable" content.
// TODO `androidReceiverCompatible`
// TODO Queues
// TODO Advertismenets

export type validStates = 'IDLE' | 'BUFFERING' | 'LOADED' | 'PLAYING' | 'PAUSED'

export const PLAYER_STATE = {
  IDLE: 'IDLE',
  BUFFERING: 'BUFFERING',
  LOADED: 'LOADED',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
}

interface CastPlayerContextProps {
  // session
  readonly session: chrome.cast.Session | undefined
  setSession(val: chrome.cast.Session): void
  // states
  readonly playerState: string | undefined
  setPlayerState(val: string): void
  readonly currentTime: number
  setCurrentTime(val: number): void
  readonly duration: number
  setDuration(val: number): void
  readonly fullscreen: boolean
  setFullscreen(val: boolean): void
  readonly mediaInfo: object
  setMediaInfo(val: object): void
}

export const CastPlayerContext = createContext({} as CastPlayerContextProps)

interface CastPlayerProps {
  children: React.ReactNode
}

const CastPlayer = ({ children }: CastPlayerProps) => {
  const [session, setSession] = useState<chrome.cast.Session | undefined>()
  const [playerState, setPlayerState] = useState(PLAYER_STATE.IDLE)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const [mediaInfo, setMediaInfo] = useState({})

  return (
    <CastPlayerContext.Provider
      value={{
        // session
        session,
        setSession,
        // states
        playerState,
        setPlayerState,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        fullscreen,
        setFullscreen,
        mediaInfo,
        setMediaInfo,
      }}
    >
      {children}
    </CastPlayerContext.Provider>
  )
}

export default CastPlayer
