// @flow

export class Field {
  name: string;

  value: string;

  type: string;

  constructor(name: string, value: string, type: string) {
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
  recordEvent(event: T): void;
  getEvents(): Array<T>;
}

export class InMemoryBuffer<T: Event> implements Buffer {
  events: Array<T>;

  constructor() {
    this.events = [];
  }

  async recordEvent(event: T) {
    this.events.push(event);
  }

  getEvents(): Array<T> {
    return this.events;
  }
}
