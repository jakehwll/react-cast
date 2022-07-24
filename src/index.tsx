import React from 'react'
import { Helmet } from 'react-helmet'
import CastPlayer from './contexts/cast'
import PlayerHandler from './contexts/player'

const ReactCast = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Helmet>
        <script src='https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'></script>
      </Helmet>
      <CastPlayer>
        <PlayerHandler>
          <>{children}</>
        </PlayerHandler>
      </CastPlayer>
    </>
  )
}

export default ReactCast
