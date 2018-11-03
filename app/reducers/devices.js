// @flow
import { CONNECT_HEADSET, DISCONNECT_HEADSET } from '../actions/devices';
import type { Action } from './types';

export default function devices(state: Object = { devices: []}, action: Action) {
  console.log("devices -- device.js")
  console.log(state)
  switch (action.type) {
    case CONNECT_HEADSET:
        // state.push({"name": "mydevice"})
        // console.log("pushing", state)
        console.log("returning new")
      return { devices: [{"name": "mydevice", "key": "123"}] };
    case DISCONNECT_HEADSET:
      return { devices: []};
    default:
      return state;
  }
}
