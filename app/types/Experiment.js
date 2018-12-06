// @flow
import React, { Component } from 'react';
import { EEGDevice, NullDevice } from './Device';
import { DataSink, NullDataSink } from './DataSink';
import { Buffer, InMemoryBuffer, Event, Field, generateUID } from './Buffer';

export const EXPERIMENT_SHOW_SCREEN = 'EXPERIMENT_SHOW_SCREEN';

export const ACTION_ID_WAIT = 0;
export const ACTION_ID_TRIAL_END = 1;
export const ACTION_ID_BLANK_SCREEN = 10;
export const ACTION_ID_GREEN_SCREEN = 11;

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
    this.id = ACTION_ID_BLANK_SCREEN;
  }

  render() {
    return <div>blank</div>;
  }
}

const EmptyScreen = new BlankScreen();
export { EmptyScreen };

export class GreenScreen extends Screen {
  id: number;

  constructor() {
    super();
    this.id = ACTION_ID_GREEN_SCREEN;
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
  id: number;

  todo: () => void;

  constructor(id: number, todo: () => void) {
    this.id = id;
    this.todo = todo;
  }

  async do(dispatch: () => void): void {
    await this.todo(dispatch);
  }
}

export interface Trial {
  id: number;

  actions: Array<Action>;

  preRun(buffer: Buffer): void;

  run(dispatch: () => void): void;

  postRun(buffer: Buffer): void;
}

export const ActionStartEventTypeName = 'ActionStartEvent';

export class ActionStartEvent implements Event {
  constructor(action: Action) {
    this.type = ActionStartEventTypeName;
    this.timestamp = Date.now();
    this.values = [new Field('action_id', action.id, 'INTEGER')];
  }
}

export class RunnableTrial implements Trial {
  id: number;

  actions: Array<Action>;

  constructor(id: number, actions: Array<Action>) {
    this.id = id;
    this.actions = actions;
  }

  preRun(buffer: Buffer) {
    console.log(buffer.uid, this.id);
  }

  async run(dispatch: () => void, buffer: Buffer) {
    /* eslint-disable no-restricted-syntax */
    for (const action of this.actions) {
      /* eslint-enable no-restricted-syntax */
      buffer.recordEvent(new ActionStartEvent(action));
      /* eslint-disable no-await-in-loop */
      await action.do(dispatch);
      /* eslint-enable no-await-in-loop */
    }
  }

  postRun(buffer: Buffer) {
    console.log(buffer.uid, this.id);
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
    this.actions.push(new Action(ACTION_ID_WAIT, waitWrapper(waitMillis)));
    return this;
  }

  show(screen: Screen): TrialBuilder {
    this.actions.push(new Action(screen.id, showScreenWrapper(screen)));
    return this;
  }

  build(): Trial {
    this.actions.push(new Action(ACTION_ID_TRIAL_END, () => {}));
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

export const TrialEventTypeName = 'TrialEvent';

export class TrialEvent implements Event {
  constructor(startTimestamp: number, trial: Trial) {
    this.type = TrialEventTypeName;
    this.timestamp = Date.now();
    this.values = [
      new Field('start', new Date(startTimestamp).toISOString(), 'TIMESTAMP'),
      new Field('id', trial.id, 'INTEGER'),
    ];
  }
}

export interface Experiment {
  name: string;

  device: EEGDevice;

  dataSink: DataSink;

  trials: Array<Trial>;

  preRun(buffer: Buffer): void;

  postRun(buffer: Buffer): void;
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
      BasicVisualTrialFactory(2),
      // BasicVisualTrialFactory(3),
    ];
  }

  preRun(buffer: Buffer): void {
    console.log(buffer.uid, this.name);
  }

  postRun(buffer: Buffer): void {
    console.log(buffer.uid, this.name, new Date().toDateString());
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

  preRun(buffer: Buffer): void {
    console.log(buffer.uid, this.name);
  }

  postRun(buffer: Buffer): void {
    console.log(buffer.uid, this.name);
  }
}

export class ExperimentEvent implements Event {
  constructor(startTimestamp: number, experiment: Experiment) {
    this.type = 'ExperimentEvent';
    this.timestamp = Date.now();
    this.values = [
      new Field('start', new Date(startTimestamp).toISOString(), 'TIMESTAMP'),
      new Field('name', experiment.name, 'STRING'),
    ];
  }
}

const NullExperimentName = 'Null';
const NullExperiment = new EmptyExperiment(NullExperimentName);
export { NullExperiment };

export async function runExperiment(
  experiment: Experiment,
  dispatch: () => void,
) {
  const uid = generateUID();
  const eegBuffer = new InMemoryBuffer(uid);
  const eventBuffer = new InMemoryBuffer(uid);
  const experimentBuffer = new InMemoryBuffer(uid);
  const trialBuffer = new InMemoryBuffer(uid);
  const experimentStartMilliseconds = Date.now();
  experiment.preRun(experimentBuffer);
  /* eslint-disable no-restricted-syntax */
  for (const trial of experiment.trials) {
    /* eslint-enable no-restricted-syntax */
    const trialStartMilliseconds = Date.now();
    trial.preRun(trialBuffer);
    /* eslint-disable no-await-in-loop */
    await experiment.device.startEmitting(eegBuffer);
    await trial.run(dispatch, eventBuffer);
    await experiment.device.stopEmitting();
    /* eslint-enable no-await-in-loop */
    trial.postRun(trialBuffer);
    trialBuffer.recordEvent(new TrialEvent(trialStartMilliseconds, trial));
  }
  experiment.postRun(experimentBuffer);
  experimentBuffer.recordEvent(
    new ExperimentEvent(experimentStartMilliseconds, experiment),
  );
  await experiment.dataSink.upload(eegBuffer);
  await experiment.dataSink.upload(eventBuffer);
  await experiment.dataSink.upload(trialBuffer);
  await experiment.dataSink.upload(experimentBuffer);
}
