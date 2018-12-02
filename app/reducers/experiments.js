// @flow
import type { Action } from './types';

import {
  EXPERIMENT_SHOW_SCREEN,
  NullExperiment,
  EmptyScreen,
} from '../types/Experiment';
import { NullDevice } from '../types/Device';
import { NullDataSink } from '../types/DataSink';

export default function experiments(
  state: Object = {
    experiment: NullExperiment,
    selectedDevice: NullDevice,
    selectedDataSink: NullDataSink,
    screen: EmptyScreen,
  },
  action: Action,
) {
  switch (action.type) {
    case EXPERIMENT_SHOW_SCREEN:
      return {
        ...state,
        screen: action.screen,
      };
    default:
      return state;
  }
}
