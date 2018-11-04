// @flow
export const EEG_EVENT = 'EEG_EVENT';

export function eegEvent() {
  return {
    type: EEG_EVENT,
    event: {
      t1: 1234,
      t2: 1234,
      c1: 1234
    }
  };
}
