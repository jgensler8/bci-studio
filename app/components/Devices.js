// @flow
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeviceComponent from './Device';
import { EEGDevice } from '../types/Device';

type Props = {
  searchDevices: () => void,
  devices: Array<EEGDevice>
};

export default class Devices extends Component<Props> {
  props: Props;

  render() {
    const { searchDevices, devices } = this.props;
    console.log('render -- Devices.js -- ', devices);
    return (
      <React.Fragment>
        <Typography variant="h3" component="h2">
          Devices
        </Typography>
        {devices.length !== 0 ? (
          <React.Fragment>
            <Typography component="div">
              {devices.map(device => (
                <DeviceComponent key={device.name} device={device} />
              ))}
            </Typography>
            <Typography component="div">
              <Button
                variant="contained"
                color="primary"
                onClick={searchDevices}
              >
                Refresh Devices
              </Button>
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="body1" component="h2">
              No Devices
            </Typography>
            <Typography component="div">
              <Button
                variant="contained"
                color="primary"
                onClick={searchDevices}
              >
                Search Devices
              </Button>
            </Typography>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
