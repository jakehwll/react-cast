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
- [ ] (Partially implemented) Get audio and control with `volume` and `setVolume`.
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

`useContext(PlayerHandlerContext)` will return an object with..

#### States

- `playerState` The current `state` of the player, valid elements are contained in `VALID_STATES`
- `setPlayerState` Takes a string from `VALID_STATES`

```jsx
import { CastPlayerContext } from 'react-cast/contexts/cast'

const State = () => {
  const { playerState } = useContext(CastPlayerContext)

  return (
    <>
      Current player state: {playerState}
      <ul>
        <li>Idle? {(playerState === 'IDLE').toString()}</li>
        <li>Buffering? {(playerState === 'BUFFERING').toString()}</li>
        <li>Loaded? {(playerState === 'LOADED').toString()}</li>
        <li>Playing? {(playerState === 'PLAYING').toString()}</li>
        <li>Paused? {(playerState === 'PAUSED').toString()}</li>
      </ul>
    </>
  )
}
```

#### Values

- `currentTime` **UNIMPLEMENTED** The current time of the playhead for the player.
- `duration` **UNIMPLEMENTED** The current duration of the whole video loaded in the player.
- `fullscreen` **UNIMPLEMENTED** Unused?
- `mediaInfo` **UNIMPLEMENTED**

```jsx
{
  /** TODO **/
}
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
      <button type='button' onClick={() => useCast()}>
        Cast
      </button>
      {/** Send some media from the sender to the receiver to render. **/}
      <button
        type='button'
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
      <button type='button' onClick={() => play()}>
        Play
      </button>
      <button type='button' onClick={() => pause()}>
        Pause
      </button>
      <button type='button' onClick={() => stop()}>
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
import { PlayerHandlerContext } from 'react-cast/contexts/player'

const Volume = () => {
  const { mute, unmute, setVolume } = useContext(PlayerHandlerContext)
  return (
    <>
      <button type='button' onClick={() => mute()}>
        Mute
      </button>
      <button type='button' onClick={() => unmute()}>
        Unmute
      </button>
      <input
        type='range'
        defaultValue={100}
        min={0}
        max={100}
        onChange={(event) => {
          setVolume(parseInt(event.target.value) / 100)
        }}
      />
    </>
  )
}
```

#### Seeking

- `seekTo()` **UNIMPLEMENTED**

```jsx
{
  /** TODO **/
}
```
