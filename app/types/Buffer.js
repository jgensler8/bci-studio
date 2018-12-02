// @flow

export class Field {
  name: string;

  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export interface Event {
  time: Date;

  values: Array<Field>;
}

export interface Buffer {
  recordEvent(event: Event): void;
}

export class InMemoryBuffer implements Buffer {
  events: Array<Event>;

  constructor() {
    this.events = [];
  }

  async recordEvent(event: Event) {
    this.events.push(event);
  }
}
