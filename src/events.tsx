export const initializeEvents = (
  controller: cast.framework.RemotePlayerController
) => {
  controller.addEventListener(
    cast.framework.RemotePlayerEventType.ANY_CHANGE,
    () => {
      console.log('adsf')
    }
  )
  controller.addEventListener(
    cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
    () => {
      console.log('events')
    }
  )
}
