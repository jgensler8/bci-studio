// @flow
import {
  Dataset,
  DatasetProvider,
  BigQueryDatasetProvider,
} from '../types/Data';

export const FOUND_DATASETS = 'FOUND_DATASETS';
export const FILE_UPLOADED = 'FILE_UPLOADED';
export const FILE_CANCELLED = 'FILE_CANCELLED';
export const INVALID_CREDENTIALS_FILE = 'INVALID_CREDENTIALS_FILE';
export const DATASET_SELECTED = 'DATASET_SELECTED';

function foundDatasets(
  datasets: Array<Dataset>,
  datasetProvider: DatasetProvider,
) {
  return {
    type: FOUND_DATASETS,
    datasets,
    datasetProvider,
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

export function datasetSelected(dataset: Dataset) {
  return {
    type: DATASET_SELECTED,
    dataset,
  };
}

// thunk action creator
export function credentialsFileUploaded(event) {
  return function(dispatch) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = async function(loadevent) {
        try {
          const credentials = JSON.parse(loadevent.target.result);
          // TODO
          const provider = new BigQueryDatasetProvider(credentials);
          const datasets = await provider.getDatasets();
          dispatch(foundDatasets(datasets, provider));
        } catch (error) {
          console.log(error);
          dispatch(invalidCredentialsFileEvent('ERROR'));
        }
      };
      reader.readAsText(event.target.files[0]);
    } else {
      dispatch(credentialsFileCancelledEvent());
    }
  };
}
