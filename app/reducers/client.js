// @flow
import { FILE_UPLOADED } from '../actions/client';
import type { Action } from './types';

export default function client(state: Object = { credentials: {} }, action: Action) {
  console.log("client -- client.js")
  console.log(action.type)
  switch (action.type) {
    case FILE_UPLOADED:
      console.log("!!! file uploaded")
      return {
        credentials: action.credentials
      };
    default:
      console.log("Deafult!!!")
      return state;
  }
}
