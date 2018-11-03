// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';

type Props = {
  eegEvent: () => void,
};

export default class EEGEmitter extends Component<Props> {
  props: Props;

  render() {
    const {
      eegEvent
    } = this.props;
    console.log("render -- EEGEmitter.js -- ")
    return (
        <React.Fragment>
            <button onClick={eegEvent}>Click to generate a fake event</button>
        </React.Fragment>
    );
  }
}
