export interface EEGDevice {
  name: string;
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

export class GenericEEGDevice implements EEGDevice {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
