import React, { createContext, useContext, useEffect, useState } from 'react'
import { getErrorMessage } from 'react-cast/utils/error'
import { CastPlayerContext, PLAYER_STATE } from './cast'

// TODO receiverApplicationId
// TODO autoJoinPolicy

export const PlayerHandlerContext = createContext(
  {} as {
    // base
    play(): void
    pause(): void
    stop(): void
    // volume
    setVolume(val: number): void
    mute(): void
    unmute(): void
    isMuted(): boolean
    // seeker
    seekTo(val: number): void
    // state
    useCast(): void
    useMedia(value: { url: string; contentType: string }): void
  }
)

const PlayerHandler = ({ children }: { children: React.ReactNode }) => {
  const { setPlayerState, session, setSession } = useContext(CastPlayerContext)
  const [playerTarget, setPlayerTarget] = useState<
    undefined | cast.framework.RemotePlayer
  >(undefined)
  const [media, setMedia] = useState<chrome.cast.media.Media | undefined>()

  function initialize({
    receiverApplicationId = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
  }: {
    receiverApplicationId?: string
    autoJoinPolicy?: chrome.cast.AutoJoinPolicy
  }) {
    const options: cast.framework.CastOptions = {
      receiverApplicationId: receiverApplicationId,
      autoJoinPolicy: autoJoinPolicy,
    }
    cast.framework.CastContext.getInstance().setOptions(options)
  }

  useEffect(() => {
    ;(window as any)['__onGCastApiAvailable'] = async (
      isAvailable: boolean
    ) => {
      if (isAvailable) {
        initialize({})
        const _playerTarget = new cast.framework.RemotePlayer()
        const _playerController = new cast.framework.RemotePlayerController(
          _playerTarget
        )
        _playerController.addEventListener(
          cast.framework.RemotePlayerEventType.ANY_CHANGE,
          () => {
            console.log('asdfoiasdjoiasdoijasdjoiiojs')
          }
        )
      }
    }
  }, [])

  // base functions
  const play = () =>
    media &&
    media.play(
      new chrome.cast.media.PlayRequest(),
      () => setPlayerState(PLAYER_STATE.PLAYING),
      (errorCode) => console.warn('[react-cast]', getErrorMessage(errorCode))
    )
  const pause = () =>
    media &&
    media.pause(
      new chrome.cast.media.PauseRequest(),
      () => setPlayerState(PLAYER_STATE.PAUSED),
      (errorCode) => console.warn('[react-cast]', getErrorMessage(errorCode))
    )
  const stop = () =>
    media &&
    media.stop(
      new chrome.cast.media.StopRequest(),
      () => setPlayerState(PLAYER_STATE.IDLE),
      (errorCode) => console.warn('[react-cast]', getErrorMessage(errorCode))
    )

  // state functions
  const setVolume = () => {}
  const mute = () => {}
  const unmute = () => {}

  const isMuted = () => {
    return false
  }

  const seekTo = () => {}

  function useCast() {
    chrome.cast.requestSession(
      (e) => {
        setSession(e)
      },
      (errorCode) => {
        setPlayerState(PLAYER_STATE.IDLE)
        console.warn('[react-cast]', getErrorMessage(errorCode))
      }
    )
  }

  function useMedia({
    url,
    contentType,
  }: {
    url: string
    contentType: string
  }) {
    if (!session) return
    var mediaInfo = new chrome.cast.media.MediaInfo(url, contentType)
    var request = new chrome.cast.media.LoadRequest(mediaInfo)
    session.loadMedia(
      request,
      (media: chrome.cast.media.Media) => {
        setMedia(media)
      },
      (errorCode) => console.error('[react-cast]' + errorCode)
    )
  }

  return (
    <PlayerHandlerContext.Provider
      value={{
        // base
        play,
        pause,
        stop,
        // volume
        setVolume,
        mute,
        unmute,
        isMuted,
        // seeker
        seekTo,
        // state
        useCast,
        useMedia,
      }}
    >
      {children}
    </PlayerHandlerContext.Provider>
  )
}

export default PlayerHandler
