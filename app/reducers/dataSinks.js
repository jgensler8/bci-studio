// @flow
import {
  NEW_DATA_SINK,
  INVALID_CREDENTIALS_FILE,
  DATA_SINK_SELECTED,
} from '../actions/dataSink';
import type { Action } from './types';
import { NullDataSink } from '../types/DataSink';

export default function dataSinks(
  state: Object = { error: '', dataSinks: [], selectedDataSink: NullDataSink },
  action: Action,
) {
  switch (action.type) {
    case NEW_DATA_SINK:
      return {
        dataSinks: [action.dataSink],
        error: state.error,
        selectedDataSink: state.selectedDataSink,
      };
    case INVALID_CREDENTIALS_FILE:
      return {
        dataSinks: [],
        error: action.error.message,
        selectedDataSink: state.selectedDataSink,
      };
    case DATA_SINK_SELECTED:
      return {
        dataSinks: state.dataSinks,
        error: state.error,
        selectedDataSink: action.dataSink,
      };
    default:
      return state;
  }
}
