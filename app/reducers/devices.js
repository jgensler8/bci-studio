// @flow
import {
  CONNECT_HEADSET,
  DISCONNECT_HEADSET,
  DEVICES_UPDATED,
  DEVICE_SELECTED,
  TOGGLE_COLLAPSE,
} from '../actions/devices';
import type { Action } from './types';
import { NullDevice, GenericEEGDevice } from '../types/Device';

export default function devices(
  state: Object = {
    devices: [new GenericEEGDevice('FakeDevice')],
    selectedDevice: NullDevice,
    collapseState: true,
  },
  action: Action,
) {
  switch (action.type) {
    case TOGGLE_COLLAPSE:
      return {
        devices: state.devices,
        selectedDevice: state.selectedDevice,
        collapseState: !state.collapseState,
      };
    case CONNECT_HEADSET:
      return {
        devices: [{ name: 'mydevice', key: '123' }],
        selectedDevice: state.selectedDevice,
        collapseState: state.collapseState,
      };
    case DISCONNECT_HEADSET:
      return {
        devices: [],
        selectedDevice: state.selectedDevice,
        collapseState: state.collapseState,
      };
    case DEVICE_SELECTED:
      return {
        devices: state.devices,
        selectedDevice: action.device,
        collapseState: state.collapseState,
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
        collapseState: state.collapseState,
      };
    default:
      return state;
  }
}
