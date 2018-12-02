// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import devices from './devices';
import dataSinks from './dataSinks';
import experiments from './experiments';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer, devices, dataSinks, experiments }),
  );
}
