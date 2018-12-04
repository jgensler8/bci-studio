// @flow
import { Buffer, Event, Field } from './Buffer';

export class EEGEvent implements Event {
  constructor(SENSOR_AF3: number) {
    this.type = 'EEGEvent';
    this.timestamp = Date.now();
    this.values = [new Field('AF3', `${SENSOR_AF3}`, 'FLOAT')];
  }
}

export class POWEvent implements Event {
  constructor(powValues: Array<number>) {
    this.type = 'POWEvent';
    this.timestamp = Date.now();
    this.values = [
      // AF3
      new Field('AF3T', powValues[0], 'FLOAT'),
      new Field('AF3A', powValues[1], 'FLOAT'),
      new Field('AF3BL', powValues[2], 'FLOAT'),
      new Field('AF3BH', powValues[3], 'FLOAT'),
      new Field('AF3G', powValues[4], 'FLOAT'),
      // F7
      new Field('F7T', powValues[5], 'FLOAT'),
      new Field('F7A', powValues[6], 'FLOAT'),
      new Field('F7BL', powValues[7], 'FLOAT'),
      new Field('F7BH', powValues[8], 'FLOAT'),
      new Field('F73G', powValues[9], 'FLOAT'),
      // F3
      new Field('F3T', powValues[10], 'FLOAT'),
      new Field('F3A', powValues[11], 'FLOAT'),
      new Field('F3BL', powValues[12], 'FLOAT'),
      new Field('F3BH', powValues[13], 'FLOAT'),
      new Field('F3G', powValues[14], 'FLOAT'),
      // FC5
      new Field('FC5T', powValues[15], 'FLOAT'),
      new Field('FC5A', powValues[16], 'FLOAT'),
      new Field('FC5BL', powValues[17], 'FLOAT'),
      new Field('FC5BH', powValues[18], 'FLOAT'),
      new Field('FC5G', powValues[19], 'FLOAT'),
      // T7
      new Field('T7T', powValues[20], 'FLOAT'),
      new Field('T7A', powValues[21], 'FLOAT'),
      new Field('T7BL', powValues[22], 'FLOAT'),
      new Field('T7BH', powValues[23], 'FLOAT'),
      new Field('T7G', powValues[24], 'FLOAT'),
      // P7
      new Field('P7T', powValues[25], 'FLOAT'),
      new Field('P7A', powValues[26], 'FLOAT'),
      new Field('P7BL', powValues[27], 'FLOAT'),
      new Field('P7BH', powValues[28], 'FLOAT'),
      new Field('P7G', powValues[29], 'FLOAT'),
      // O1
      new Field('O1T', powValues[30], 'FLOAT'),
      new Field('O1A', powValues[31], 'FLOAT'),
      new Field('O1BL', powValues[32], 'FLOAT'),
      new Field('O1BH', powValues[33], 'FLOAT'),
      new Field('O1G', powValues[34], 'FLOAT'),
      // O2
      new Field('O2T', powValues[35], 'FLOAT'),
      new Field('O2A', powValues[36], 'FLOAT'),
      new Field('O2BL', powValues[37], 'FLOAT'),
      new Field('O2BH', powValues[38], 'FLOAT'),
      new Field('O2G', powValues[39], 'FLOAT'),
      // P8
      new Field('P8T', powValues[40], 'FLOAT'),
      new Field('P8A', powValues[41], 'FLOAT'),
      new Field('P8BL', powValues[42], 'FLOAT'),
      new Field('P8BH', powValues[43], 'FLOAT'),
      new Field('P8G', powValues[44], 'FLOAT'),
      // T8
      new Field('T8T', powValues[45], 'FLOAT'),
      new Field('T8A', powValues[46], 'FLOAT'),
      new Field('T8BL', powValues[47], 'FLOAT'),
      new Field('T8BH', powValues[48], 'FLOAT'),
      new Field('T8G', powValues[49], 'FLOAT'),
      // FC6
      new Field('FC6T', powValues[50], 'FLOAT'),
      new Field('FC6A', powValues[51], 'FLOAT'),
      new Field('FC6BL', powValues[52], 'FLOAT'),
      new Field('FC6BH', powValues[53], 'FLOAT'),
      new Field('FC6G', powValues[54], 'FLOAT'),
      // F4
      new Field('F4T', powValues[55], 'FLOAT'),
      new Field('F4A', powValues[56], 'FLOAT'),
      new Field('F4BL', powValues[57], 'FLOAT'),
      new Field('F4BH', powValues[58], 'FLOAT'),
      new Field('F4G', powValues[59], 'FLOAT'),
      // F8
      new Field('F8T', powValues[60], 'FLOAT'),
      new Field('F8A', powValues[61], 'FLOAT'),
      new Field('F8BL', powValues[62], 'FLOAT'),
      new Field('F8BH', powValues[63], 'FLOAT'),
      new Field('F8G', powValues[64], 'FLOAT'),
      // AF4
      new Field('AF4T', powValues[65], 'FLOAT'),
      new Field('AF4A', powValues[66], 'FLOAT'),
      new Field('AF4BL', powValues[67], 'FLOAT'),
      new Field('AF4BH', powValues[68], 'FLOAT'),
      new Field('AF4G', powValues[69], 'FLOAT'),
    ];
  }
}

function randomEEGEvent(): EEGEvent {
  return new EEGEvent(Math.random());
}

export { randomEEGEvent };

export interface EEGDevice {
  name: string;

  startEmitting(buffer: Buffer<EEGEvent>): Promise;

  stopEmitting(): void;
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

  socket: WebSocket;

  streams: Array<string>;

  authToken: string;

  sessionId: string;

  constructor(name: string) {
    this.name = name;
    // this might be reserved to different licenses?
    // this.streams = ["eeg"];
    this.streams = ['pow'];
  }

  async startEmitting(buffer: Buffer<EEGEvent>) {
    this.socket = new WebSocket('wss://emotivcortex.com:54321');

    return new Promise((resolve, reject) => {
      this.socket.onopen = () => {
        console.log('SOCKET OPENED');
        this.socket.send(
          JSON.stringify({
            jsonrpc: '2.0',
            method: 'authorize',
            params: {},
            id: 2,
          }),
        );
      };
      this.socket.onerror = (error: MessageEvent) => {
        console.log('SOCKET ERROR: ', error);
        reject(error);
      };
      this.socket.onmessage = (message: MessageEvent) => {
        const response = JSON.parse(message.data);
        if (response.error) {
          console.log('MESSAGE ERROR', response);
          // if(response.error.code === -32006) {
          //   this.socket.send(JSON.stringify({
          //     jsonrpc: '2.0',
          //     method: 'querySessions',
          //     params: {
          //       _auth: this.authToken,
          //     },
          //     id: 30,
          //   }));
          // } else {
          reject(response);
          // }
        } else if (response.id === 2) {
          console.log('Received Authorization Response', response);
          /* eslint-disable no-underscore-dangle */
          this.authToken = response.result._auth;
          /* eslint-enable no-underscore-dangle */
          // no sessions are created by EmotivBCI or CortexService...?
          // (maybe not?) looks like sessions are already created when you use EmotivBCI or CortexService
          // this.socket.send(JSON.stringify({
          //   jsonrpc: '2.0',
          //   method: 'createSession',
          //   params: {
          //     _auth: this.authToken,
          //     status: "active",
          //   },
          //   id: 4,
          // }));
          this.socket.send(
            JSON.stringify({
              jsonrpc: '2.0',
              method: 'createSession',
              params: {
                _auth: this.authToken,
                status: 'open',
              },
              // would only use this if we need to activate a session to get more metrics
              // id: 3,
              id: 4,
            }),
          );
        }
        // else if(response.id === 30) {
        //   console.log("Received Query Session Response", response)
        //   if(response.result.length === 0) {
        //     reject();
        //   } else {
        //     this.sessionId = response.result[0].id;
        //     this.socket.send(JSON.stringify({
        //       jsonrpc: '2.0',
        //       method: 'updateSession',
        //       params: {
        //         _auth: this.authToken,
        //         session: this.sessionId,
        //         status: "active",
        //       },
        //       id: 4,
        //     }));
        //   }
        // }
        // else if(response.id === 3) {
        //   console.log("Received Create Session Response", response)
        //   this.sessionId = response.result.id;
        //   this.socket.send(JSON.stringify({
        //     jsonrpc: '2.0',
        //     method: 'updateSession',
        //     params: {
        //       _auth: this.authToken,
        //       session: this.sessionId,
        //       status: "active",
        //     },
        //     id: 4,
        //   }));
        // }
        else if (response.id === 4) {
          console.log(
            'Received Update Session (startRecord) Response',
            response,
          );
          this.socket.send(
            JSON.stringify({
              jsonrpc: '2.0',
              method: 'subscribe',
              params: {
                _auth: this.authToken,
                session: this.sessionId,
                streams: this.streams,
              },
              id: 5,
            }),
          );
        } else if (response.id === 5) {
          console.log('Received Subscription Response', response);
          if (response.result[0].code === -32016) {
            this.socket.close();
            reject();
          } else {
            resolve();
          }
        } else {
          console.log(response);
          // buffer.recordEvent(new EEGEvent(response.pow[0]));
          buffer.recordEvent(new POWEvent(response.pow));
        }
      };
    });
  }

  stopEmitting() {
    if (this.socket.readyState === this.socket.OPEN) {
      // not sure which one I need to do.
      // hopefully, closing a session also closes subscriptions
      // we are closing the socket anyway. I suppose just to be graceful.
      this.socket.send(
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'updateSession',
          params: {
            auth: this.authToken,
            session: this.sessionId,
            state: 'close',
          },
          id: 5,
        }),
      );
      // this.socket.send(JSON.stringify({
      //   jsonrpc: '2.0',
      //   method: 'unsubscribe',
      //   params: {
      //     auth: this.authToken,
      //     streams: this.streams,
      //   },
      //   id: 5,
      // }));
      this.socket.close();
    }
  }
}

async function uploadRandomDataToBuffer(buffer: Buffer<EEGEvent>) {
  buffer.recordEvent(randomEEGEvent());
}

export class GenericEEGDevice implements EEGDevice {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async startEmitting(buffer: Buffer<EEGEvent>) {
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
