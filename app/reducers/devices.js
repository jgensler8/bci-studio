// @flow
import {
  CONNECT_HEADSET,
  DISCONNECT_HEADSET,
  DEVICES_UPDATED,
  DEVICE_SELECTED,
} from '../actions/devices';
import type { Action } from './types';
import { NullDevice } from '../types/Device';

export default function devices(
  state: Object = { devices: [], selectedDevice: NullDevice },
  action: Action,
) {
  switch (action.type) {
    case CONNECT_HEADSET:
      return {
        devices: [{ name: 'mydevice', key: '123' }],
        selectedDevice: state.selectedDevice,
      };
    case DISCONNECT_HEADSET:
      return { devices: [], selectedDevice: state.selectedDevice };
    case DEVICE_SELECTED:
      return {
        devices: state.devices,
        selectedDevice: action.device,
      };
    case DEVICES_UPDATED:
      return {
        devices: [
          ...state.devices,
          ...action.devices.filter(device => {
            state.devices.forEach(existingDevice => {
              if (existingDevice.name === device.name) {
                return false;
              }
            });
            return true;
          }),
        ],
        selectedDevice: state.selectedDevice,
      };
    default:
      return state;
  }
}
