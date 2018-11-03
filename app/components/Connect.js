// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';
import EEGEmitter from './EEGEmitter';

type Props = {
  connect: () => void,
  disconnect: () => void,
  devices: Array<any>,
  credentialsFileUploaded: () => void,
  credentials: Object,
  eegEvent: () => void
};

export default class Connect extends Component<Props> {
  props: Props;

  render() {
    const {
      connect,
      disconnect,
      credentialsFileUploaded,
      devices,
      credentials,
      eegEvent
    } = this.props;
    console.log("render -- Connect.js -- ", devices)
    return (<div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        { (devices && devices.length !== 0)  ? <div>Devices: {devices.map(function(x){return <div>{x.name}</div>})}</div> : <div>no devices: <button onClick={connect}>connect</button></div>}
        <input type="file" id="input" onChange={credentialsFileUploaded}></input>
        { credentials ? <EEGEmitter eegEvent={eegEvent}></EEGEmitter> : <React.Fragment>Upload a credentials file before testing events</React.Fragment> }
        </div>)
    }
}