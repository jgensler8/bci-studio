// @flow

import { EEGDevice, EmotivEPOCPlus } from '../types/Device';

export const CONNECT_HEADSET = 'CONNECT_HEADSET';
export const DISCONNECT_HEADSET = 'DISCONNECT_HEADSET';
export const SEARCH_DEVICES = 'SEARCH_DEVICES';
export const DEVICES_UPDATED = 'DEVICES_UPDATED';
export const DEVICE_SELECTED = 'DEVICE_SELECTED';
export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE';

export function connect() {
  return {
    type: CONNECT_HEADSET,
  };
}

export function disconnect() {
  return {
    type: DISCONNECT_HEADSET,
  };
}

export function devicesUpdatedEvent(devices: Array<EEGDevice>) {
  return {
    type: DEVICES_UPDATED,
    devices,
  };
}

export function deviceSelected(device: EEGDevice) {
  return {
    type: DEVICE_SELECTED,
    device,
  };
}

export function searchDevices() {
  return function(dispatch) {
    // Search for Emotiv Devices
    const socket = new WebSocket('wss://emotivcortex.com:54321');
    socket.onopen = function() {
      socket.send(
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'queryHeadsets',
          params: {},
          id: 1,
        }),
      );
    };
    socket.onerror = function(ev) {
      console.log('SOCKET ERROR: ', ev);
    };
    socket.onmessage = function(ev) {
      console.log('SOCKET MESSAGE: ', ev);
      const response = JSON.parse(ev.data);
      const devices = [];
      response.result.forEach(device => {
        devices.push(new EmotivEPOCPlus(device.id));
      });
      dispatch(devicesUpdatedEvent(devices));
      socket.close();
    };

    // Search for NeuroSky Devices
    // I think browser based bluetooth will work when electon moves to Chrome 70+
    // Electon 4.0.0-beta.5 is at 69.0.3497.10
    // navigator.bluetooth
    // .requestDevice({filters: [{namePrefix: "MindWave"}]})
    // .then(device => {
    //     console.log(device)
    // })

    // Search for InteraXon (Muse)
    // TODO: should be same as NeuroSky above

    // Search for OpenBCI Devices
    // TODO: Not sure this is possible as it uses RFDuino instead of native OS bluetooth
  };
}

export function toggleCollapse() {
  return {
    type: TOGGLE_COLLAPSE,
  };
}
