// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import type { Action } from './types';

export default function counter(state: number = 12, action: Action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
