import React, { createContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

interface ContextProps {
  children: React.ReactNode
}

const MediaContext = createContext({
  initiated: false,
})

const Media: React.FC<ContextProps> = ({ children }: ContextProps) => {
  const [isInitiated, setInitiated] = useState(false)

  useEffect(() => {
    ;(window as any)['__onGCastApiAvailable'] = (isAvailable: boolean) => {
      if (isAvailable) setInitiated(true)
    }
  })

  return (
    <>
      <Helmet>
        <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
      </Helmet>
      <MediaContext.Provider
        value={{
          initiated: isInitiated,
        }}
      >
        {children}
      </MediaContext.Provider>
    </>
  )
}

export default Media
