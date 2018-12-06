// @flow

import type { Action } from './types';
import {
  FOUND_DATASETS,
  INVALID_CREDENTIALS_FILE,
  DATASET_SELECTED,
} from '../actions/data';
import { NullDataset, NullDatasetProvider } from '../types/Data';

export default function data(
  state: Object = {
    error: '',
    datasets: [],
    datasetProvider: NullDatasetProvider,
    selectedDataset: NullDataset,
  },
  action: Action,
) {
  switch (action.type) {
    case FOUND_DATASETS:
      return {
        error: state.error,
        datasets: action.datasets,
        datasetProvider: action.datasetProvider,
        selectedDataset: state.selectedDataset,
      };
    case INVALID_CREDENTIALS_FILE:
      return {
        error: action.error,
        datasets: state.datasets,
        datasetProvider: state.datasetProvider,
        selectedDataset: state.selectedDataset,
      };
    case DATASET_SELECTED:
      return {
        error: state.error,
        datasets: state.datasets,
        datasetProvider: state.datasetProvider,
        selectedDataset: action.dataset,
      };
    default:
      return state;
  }
}
