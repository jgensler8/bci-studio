// @flow

export function generateUID() {
  return Math.floor(Math.random() * 1000000000000000000);
}

export class Field {
  name: string;

  value: any;

  type: string;

  constructor(name: string, value: any, type: string) {
    this.name = name;
    this.value = value;
    this.type = type;
  }
}

export interface Event {
  timestamp: number;

  type: string;

  values: Array<Field>;
}

export interface Buffer<T: Event> {
  uid: number;

  recordEvent(event: T): void;
  getEvents(): Array<T>;
}

export class InMemoryBuffer<T: Event> implements Buffer {
  events: Array<T>;

  uid: number;

  constructor(uid: number) {
    this.events = [];
    this.uid = uid;
  }

  async recordEvent(event: T) {
    event.values.push(new Field('uid', this.uid, 'INTEGER'));
    this.events.push(event);
  }

  getEvents(): Array<T> {
    return this.events;
  }
}
