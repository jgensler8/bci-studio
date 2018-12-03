// @flow
import { EEGDevice } from '../types/Device';
import { DataSink } from '../types/DataSink';
import { BasicUploadExperiment, runExperiment } from '../types/Experiment';

/* eslint-disable import/prefer-default-export */
export function startExperiment(
  name: string,
  device: EEGDevice,
  dataSink: DataSink,
) {
  /* eslint-disable import/prefer-default-export */
  return async function(dispatch) {
    runExperiment(new BasicUploadExperiment(name, device, dataSink), dispatch);
  };
}
