// @flow
import { DataSink, GCPDataSink } from '../types/DataSink';

export const NEW_DATA_SINK = 'NEW_DATA_SINK';
export const FILE_UPLOADED = 'FILE_UPLOADED';
export const FILE_CANCELLED = 'FILE_CANCELLED';
export const INVALID_CREDENTIALS_FILE = 'INVALID_CREDENTIALS_FILE';
export const DATA_SINK_SELECTED = 'DATA_SINK_SELECTED';

function newDataSinkEvent(dataSink: DataSink) {
  return {
    type: NEW_DATA_SINK,
    dataSink,
  };
}

function invalidCredentialsFileEvent(error) {
  return {
    type: INVALID_CREDENTIALS_FILE,
    error,
  };
}

function credentialsFileCancelledEvent() {
  return {
    type: FILE_CANCELLED,
  };
}

export function dataSinkSelected(dataSink: DataSink) {
  return {
    type: DATA_SINK_SELECTED,
    dataSink,
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
          const sink = new GCPDataSink('GCPDataSink', credentials);
          dispatch(newDataSinkEvent(sink));
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
