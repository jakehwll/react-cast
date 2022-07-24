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

- `CastPlayerContext` stores things like the chromecast `session` and players current `playerState`.
- `PlayerHandlerContext` stores things like the `play()` and `pause()` functions along with the `currentTime`, `duration`, `isMuted` etc.

```jsx
<ReactCast>{/** Logic goes here. **/}</ReactCast>
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

- `setVolume(val)` Sets the players volume to a range between `0.0` and `1.0`.
- `mute()` Completely mutes the output of the player.
- `unmute()` Complete unmutes the output of the player. ([Issue](https://github.com/jakehwll/react-cast/issues/1))
- `isMuted` A `boolean` value as to whether the current output is muted or not.

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

### useContext(CastPlayerContext)

`useContext(CastPlayerContext)` will return an object with..

#### Sessions

- `session` The current `chrome.cast.Session` if one is defined.

```jsx
const { session } = useContext(CastPlayerContext)
const Session = () => {
  return (
    <>
      <span>
        Are we currently casting? {(session !== undefined).toString()}
      </span>
    </>
  )
}
```

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

#### Media Info

```
{
  /** TODO **/
}
```
