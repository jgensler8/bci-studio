// @flow
import { Buffer, Event, Field } from './Buffer';

export interface EEGDevice {
  name: string;

  startEmitting(buffer: Buffer): void;

  stopEmitting(): void;
}

function randomEEGEvent(): EEGEvent {
  return new EEGEvent(Math.random());
}

export { randomEEGEvent };

export class EEGEvent implements Event {
  constructor(SENSOR_AF3: number) {
    this.time = new Date();
    this.values = [new Field('AF3', `${SENSOR_AF3}`)];
  }
}

/*
{
    "connectedBy":"bluetooth",
    "dongle":"0",
    "firmware":"625",
    "id":"EPOCPLUS-3B9AE6AF",
    "label":"",
    "motionSensors":["GYROX","GYROY","GYROZ","ACCX","ACCY","ACCZ","MAGX","MAGY","MAGZ"],
    "sensors":["AF3","F7","F3","FC5","T7","P7","O1","O2","P8","T8","FC6","F4","F8","AF4"],
    "settings":{
        "eegRate":128,
        "eegRes":16,
        "memsRate":64,
        "memsRes":16,
        "mode":"EPOCPLUS"},
    "status":"connected"
}
*/
export class EmotivEPOCPlus implements EEGDevice {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

async function uploadRandomDataToBuffer(buffer: Buffer) {
  buffer.recordEvent(randomEEGEvent());
}

export class GenericEEGDevice implements EEGDevice {
  name: string;

  uploadInterval: number;

  constructor(name: string) {
    this.name = name;
  }

  async startEmitting(buffer: Buffer) {
    this.emitInterval = window.setInterval(
      uploadRandomDataToBuffer,
      1000,
      buffer,
    );
  }

  stopEmitting() {
    window.clearInterval(this.emitInterval);
  }
}

const NullDeviceName = 'Null';
const NullDevice = new GenericEEGDevice(NullDeviceName);
function isNullDevice(device: EEGDevice) {
  return device.name === NullDeviceName;
}
export { NullDevice, isNullDevice };
