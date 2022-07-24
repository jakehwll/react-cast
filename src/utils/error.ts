export const getErrorMessage = (error: any) => {
  switch (error.code) {
    case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
      return (
        'The API is not initialized.' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.CANCEL:
      return (
        'The operation was cancelled by the user' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.CHANNEL_ERROR:
      return (
        'A channel to the receiver is not available.' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.EXTENSION_MISSING:
      return (
        'The Cast extension is not available.' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.INVALID_PARAMETER:
      return (
        'The parameters to the operation were not valid.' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
      return (
        'No receiver was compatible with the session request.' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.SESSION_ERROR:
      return (
        'A session could not be created, or a session was invalid.' +
        (error.description ? ' :' + error.description : '')
      )
    case chrome.cast.ErrorCode.TIMEOUT:
      return (
        'The operation timed out.' +
        (error.description ? ' :' + error.description : '')
      )
    default:
      return error
  }
}
