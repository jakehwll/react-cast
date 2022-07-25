import React, { createContext, useState } from 'react'

// TODO "Live" playback.
// TODO "Skippable" content.
// TODO `androidReceiverCompatible`
// TODO Queues
// TODO Advertisements

interface CastPlayerContextProps {
  // session
  readonly session: chrome.cast.Session | undefined
  setSession(val: chrome.cast.Session): void
  // info
  readonly mediaInfo: object
  setMediaInfo(val: object): void
}

export const CastPlayerContext = createContext({} as CastPlayerContextProps)

interface CastPlayerProps {
  children: React.ReactNode
}

const CastPlayer = ({ children }: CastPlayerProps) => {
  const [session, setSession] = useState<chrome.cast.Session | undefined>()
  const [mediaInfo, setMediaInfo] = useState({})

  return (
    <CastPlayerContext.Provider
      value={{
        // session
        session,
        setSession,
        // info
        mediaInfo,
        setMediaInfo,
      }}
    >
      {children}
    </CastPlayerContext.Provider>
  )
}

export default CastPlayer
