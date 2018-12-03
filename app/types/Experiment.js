// @flow
import React, { Component } from 'react';
import { EEGDevice, NullDevice } from './Device';
import { DataSink, NullDataSink } from './DataSink';
import { Buffer, InMemoryBuffer, Event, Field } from './Buffer';

export const START_BASIC_EXPERIMENT = 'START_BASIC_EXPERIMENT';
export const EXPERIMENT_SHOW_SCREEN = 'EXPERIMENT_SHOW_SCREEN';

type ScreenProps = {
  /* eslint-disable react/no-unused-prop-types */
  /* This will have to stay until I figure out how components can force rerender */
  id: number,
  /* eslint-enable react/no-unused-prop-types */
};
export class Screen extends Component<ScreenProps> {}

export class BlankScreen extends Screen {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }

  render() {
    return <div>blank</div>;
  }
}

const EmptyScreen = new BlankScreen();
export { EmptyScreen };

export class GreenScreen extends Screen {
  id: number = 1;

  constructor() {
    super();
    this.id = 1;
  }

  render() {
    return <div>GREEN</div>;
  }
}

export function waitWrapper(waitMillis: number) {
  return async function(dispatch: () => void) {
    return wait(dispatch, waitMillis);
  };
}

export async function wait(dispatch: () => void, waitMillis: number) {
  return new Promise(resolve => setTimeout(resolve, waitMillis));
}

export function showScreenWrapper(screen: Screen) {
  return async function(dispatch: () => void) {
    return showScreen(dispatch, screen);
  };
}

export function showScreen(dispatch: () => void, screen: Screen) {
  return dispatch({
    type: EXPERIMENT_SHOW_SCREEN,
    screen,
  });
}

export class Action {
  name: string;

  todo: () => void;

  constructor(name: string, todo: () => void) {
    this.name = name;
    this.todo = todo;
  }

  async do(dispatch: () => void): void {
    await this.todo(dispatch);
  }
}

export interface Trial {
  id: number;

  actions: Array<Action>;

  preRun(): void;

  run(dispatch: () => void): void;

  postRun(): void;
}

export class ActionStartEvent implements Event {
  constructor(action: Action) {
    this.type = 'ActionStart';
    this.timestamp = Date.now();
    this.values = [new Field('action_name', action.name, 'STRING')];
  }
}

export class RunnableTrial implements Trial {
  id: number;

  actions: Array<Action>;

  constructor(id: number, actions: Array<Action>) {
    this.id = id;
    this.actions = actions;
  }

  preRun() {
    console.log(this.id);
  }

  async run(dispatch: () => void, buffer: Buffer) {
    /* eslint-disable no-restricted-syntax */
    for (const action of this.actions) {
      /* eslint-enable no-restricted-syntax */
      // TODO set action event
      buffer.recordEvent(new ActionStartEvent(action));
      /* eslint-disable no-await-in-loop */
      await action.do(dispatch);
      /* eslint-enable no-await-in-loop */
    }
  }

  postRun() {
    console.log(this.id);
  }
}

export class TrialBuilder {
  id: number;

  actions: Array<Action>;

  constructor() {
    this.actions = [];
  }

  withId(id: number): TrialBuilder {
    this.id = id;
    return this;
  }

  wait(waitMillis: number): TrialBuilder {
    this.actions.push(new Action('wait', waitWrapper(waitMillis)));
    return this;
  }

  show(screen: Screen): TrialBuilder {
    this.actions.push(new Action('screen', showScreenWrapper(screen)));
    return this;
  }

  build(): Trial {
    return new RunnableTrial(this.id, this.actions);
  }
}

function BasicVisualTrialFactory(id: number): Trial {
  const builder = new TrialBuilder();
  return builder
    .withId(id)
    .show(new BlankScreen())
    .wait(500)
    .show(new GreenScreen())
    .wait(500)
    .show(new BlankScreen())
    .wait(500)
    .build();
}

export interface Experiment {
  name: string;

  device: EEGDevice;

  dataSink: DataSink;

  trials: Array<Trial>;

  preRun(): void;

  postRun(): void;
}

export class BasicUploadExperiment implements Experiment {
  name: string;

  device: EEGDevice;

  dataSink: DataSink;

  trials: Array<Trial>;

  constructor(name: string, device: EEGDevice, dataSink: DataSink) {
    this.name = name;
    this.device = device;
    this.dataSink = dataSink;
    this.trials = [
      BasicVisualTrialFactory(1),
      // BasicVisualTrialFactory(2),
      // BasicVisualTrialFactory(3),
    ];
  }

  preRun(): void {
    console.log(this.name);
  }

  postRun(): void {
    console.log(this.name, new Date().toDateString());
  }
}

export class EmptyExperiment implements Experiment {
  name: string;

  device: EEGDevice;

  dataSink: DataSink;

  trials: Array<Trial>;

  constructor(name: string) {
    this.name = name;
    this.device = NullDevice;
    this.dataSink = NullDataSink;
    this.trials = [];
  }

  preRun(): void {
    console.log(this.name);
  }

  postRun(): void {
    console.log(this.name);
  }
}

const NullExperimentName = 'Null';
const NullExperiment = new EmptyExperiment(NullExperimentName);
export { NullExperiment };

export async function runExperiment(
  experiment: Experiment,
  dispatch: () => void,
) {
  experiment.preRun();
  const eegBuffer = new InMemoryBuffer();
  const eventBuffer = new InMemoryBuffer();
  console.log(eegBuffer);
  console.log(eventBuffer);
  /* eslint-disable no-restricted-syntax */
  for (const trial of experiment.trials) {
    /* eslint-enable no-restricted-syntax */
    trial.preRun();
    experiment.device.startEmitting(eegBuffer);
    /* eslint-disable no-await-in-loop */
    await trial.run(dispatch, eventBuffer);
    await experiment.device.stopEmitting();
    /* eslint-enable no-await-in-loop */
    trial.postRun();
  }
  experiment.dataSink.upload(eegBuffer);
  experiment.dataSink.upload(eventBuffer);
  experiment.postRun();
}
