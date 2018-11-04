// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Devices from './Devices';
import DataSinks from './DataSinks';
import { EEGDevice } from '../types/Device';
import routes from '../constants/routes';

type Props = {
  searchDevices: () => void,
  devices: Array<EEGDevice>
};

export default class Connect extends Component<Props> {
  props: Props;

  render() {
    const { searchDevices, devices } = this.props;
    console.log('render -- Connect.js -- ', devices);
    return (
      <React.Fragment>
        <Link to={routes.HOME}>
          <Button variant="contained" color="primary">
            To Home
          </Button>
        </Link>

        <Devices searchDevices={searchDevices} devices={devices} />

        <DataSinks />
      </React.Fragment>
    );
  }
}
