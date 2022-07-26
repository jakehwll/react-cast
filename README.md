<img src="icon.svg" alt="logo" width="256" height="256" height="auto" />

# react-cast

> **Note**:
> This library is highly unfinished and should not be considered for production.

Context-based Chromecast Library for React

```sh
# add dependency
yarn add @jakehwll/react-cast
```

## Features

### Features

- [x] Send to Chromecast via browser.
- [x] Send URL to Chromecast to play.
- [x] Control playback with `play()`, `pause()`, `stop()`.
- [ ] (Partially implemented) Get audio and control with `volume` and `setVolume`.
- [ ] (Partially implemented) Get `currentTime` and control with `seek()`
- [ ] Watches events for updates on chromecast device.

### Planned Features

- Queues support.
- Live playback support.
- Advertisements support.
- `androidReceiverCompatible` support.
- `autoJoinPolicy`/`receiveApplicationId` support.
- Resumable Session

## Library Comparison

|                             | `react-cast` | `react-chromecast`\*\*\* |
| --------------------------- | ------------ | ------------------------ |
| Cast URL                    | ✅           | ✅                       |
| `play()` `pause()` `stop()` | ✅           | ✅                       |
| `seekTo()`                  | ✅           | ✅                       |
| `volume()` `setVolume()`    | ✅\*         | ❌                       |
| Queue                       | ❓\*\*       | ✅                       |
| Live Playback               | ❓\*\*       | ❌                       |
| Advertisements Support      | ❓\*\*       | ❌                       |

- \* Partially implemented.
- \*\* Planned feature.
- \*\*\* Library is in alpha/abandoned.

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
- `useMedia(val: object)` Begins the playback of a piece of media to the receiver.

```jsx
// Example Media Object
const mediaObject = {
  // a `https` url for the player to load.
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucketbig_buck_bunny_1080p.mp4',
  // a video/audio mime-type, i.e `video/mp4`, `audio/mp3`, `video/
  contentType: 'video/mp4',
}
```

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
      <button type='button' onClick={() => useMedia(mediaObject)}>
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

#### Playback Controls

- `isPlaying` Whether the player is currently playing back content or not.
- `isBuffering` Whether the player is currently buffering/loading the content.
- `isIdle` Whether player has content to render or not.

```jsx
import { PlayerHandlerContext } from 'react-cast/contexts/player'

const PlaybackControls = () => {
  const { play, pause, isPlaying, isBuffering, isIdle } = useContext(PlayerHandlerContext)

  if ( isIdle ): return <>{/** NO ICON **/}</>
  else if ( isBuffering ): return <>{/** BUFFERING ICON **/}</>
  else:
    { isPlaying ?
      <button type="button" onClick={() => pause()}>{/** PAUSE ICON **/}</button> :
      <button type="button" onClick={() => play()}>{/** PLAY ICON **/}</button> }
}
```

#### Audio

- `setVolume(val: number)` Sets the players volume to a range between `0.0` and `1.0`.
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

- `currentTime` The current playhead of the player ([Issue](https://github.com/jakehwll/react-cast/issues/2))
- `duration` The complete duration length of the current loaded media.
- `seekTo(val: number)` Jumps the player to the provided `val` index.

```jsx
const Seeker = () => {
  const { currentTime, duration, seekTo } = useContext(PlayerHandlerContext)

  return (
    <>
      <span>{currentTime}</span>
      <input
        type='range'
        value={currentTime ?? 0}
        min={0}
        max={duration ?? 0}
        onChange={(event) => {
          seekTo(parseInt(event.target.value))
        }}
      />
      <span>{duration}</span>
    </>
  )
}
```

### useContext(CastPlayerContext)

`useContext(CastPlayerContext)` will return an object with..

#### Sessions

- `session` The current `chrome.cast.Session` if one is defined.

```jsx
const Session = () => {
  const { session } = useContext(CastPlayerContext)

  return (
    <>
      <span>
        Are we currently casting? {(session !== undefined).toString()}
      </span>
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

## Development

The easiest way to get started is by running the following commands.

```sh
# install dependencies
yarn install
# build code
yarn build
```

## Contributing

Checkout our [Contributing](/CONTRIBUTING.md) guidelines.
