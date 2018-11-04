// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import devices from './devices';
import client from './client';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer, devices, client })
  );
}
