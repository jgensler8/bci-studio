// @flow
export const FILE_UPLOADED = 'FILE_UPLOADED';
export const FILE_CANCELLED = 'FILE_CANCELLED';
export const INVALID_CREDENTIALS_FILE = 'INVALID_CREDENTIALS_FILE';

function credentialsFileUploadedEvent(credentials: Object) {
  return {
    type: FILE_UPLOADED,
    credentials
  };
}

function invalidCredentialsFileEvent(error) {
  return {
    type: INVALID_CREDENTIALS_FILE,
    error
  };
}

function credentialsFileCancelledEvent() {
  return {
    type: FILE_CANCELLED
  };
}

// thunk action creator
export function credentialsFileUploaded(event) {
  return function(dispatch) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(loadevent) {
        try {
          const credentials = JSON.parse(loadevent.target.result);
          dispatch(credentialsFileUploadedEvent(credentials));
        } catch (error) {
          dispatch(invalidCredentialsFileEvent(error));
        }
      };
      reader.readAsText(event.target.files[0]);
    } else {
      dispatch(credentialsFileCancelledEvent());
    }
  };
}
