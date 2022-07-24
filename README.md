<img src="icon.svg" alt="logo" width="256" height="256" height="auto" />

# react-cast

> **Note**:
> This library is highly unfinished and should not be considered for production.

Context-based Chromecast Library for React

## Features

### Features

- [x] Send to Chromecast via browser.
- [x] Send URL to Chromecast to play.
- [x] Control playback with `play()`, `pause()`, `stop()`.
- [ ] Get audio and control with `volume` and `setVolume`.
- [ ] Get `currentTime` and control with `seek()`
- [ ] Watches events for updates on chromecast device.

### Planned Features

- Queues support.
- Live playback support.
- Advertisements support.
- `androidReceiverCompatible` support.
- `autoJoinPolicy`/`receiveApplicationId` support.

## Usage

To use react-cast you need to wrap all your elements with a `<ReactCast />` element.

This will provide both the `CastPlayerContext` and `PlayerHandlerContext` to be used by your app.

```jsx
<ReactCast>{/** Logic goes here. **/}</ReactCast>
```

### useContext(CastPlayerContext)

```sh
# TODO
```

### useContext(PlayerHandlerContext)

`useContext(PlayerHandlerContext)` will return an object with..

#### Casting

- `useCast()` Starts the cast session between sender and receiver.
- `useMedia(value)` Begins the playback of a piece of media to the receiver.

```jsx
import { PlayerHandlerContext } from 'react-cast/contexts/player'

const Casting = () => {
  const { useCast, useMedia } = useContext(PlayerHandlerContext)
  return (
    <>
      {/** Initiate a connection between sender and receiver. **/}
      <button type="button" onClick={() => useCast()}>
        Cast
      </button>
      {/** Send some media from the sender to the receiver to render. **/}
      <button
        type="button"
        onClick={() =>
          useMedia({
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucketbig_buck_bunny_1080p.mp4',
            contentType: 'video/mp4',
          })
        }
      >
        Media
      </button>
    </>
  )
}
```

#### Playback

- `play()` Begins/resumes playback of a already casted video.
- `pause()` Pauses playback of a already casted video.
- `stop()` Stop and removes all the currently casted videos.

```jsx
import { PlayerHandlerContext } from 'react-cast/contexts/player'

const Playback = () => {
  const { play, pause, stop } = useContext(PlayerHandlerContext)
  return (
    <>
      <button type="button" onClick={() => play()}>
        Play
      </button>
      <button type="button" onClick={() => pause()}>
        Pause
      </button>
      <button type="button" onClick={() => stop()}>
        Stop
      </button>
    </>
  )
}
```

#### Audio

- `setVolume()` **UNIMPLMENTED**
- `mute()` **UNIMPLMENTED**
- `unmute()` **UNIMPLEMENTED**
- `isMuted()` **UNIMPLEMENTED**

```jsx
{
  /** TODO **/
}
```

#### Seeking

- `seekTo()` **UNIMPLEMENTED**

```jsx
{
  /** TODO **/
}
```
