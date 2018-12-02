// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Devices from './Devices';
import DataSinks from './DataSinks';
import ExperimentComponent from './Experiment';
import { EEGDevice } from '../types/Device';
import { DataSink } from '../types/DataSink';
import { Experiment, Screen } from '../types/Experiment';
import routes from '../constants/routes';

type Props = {
  deviceSelected: () => void,
  selectedDevice: EEGDevice,
  searchDevices: () => void,
  devices: Array<EEGDevice>,
  credentialsFileUploaded: () => void,
  selectedDataSink: DataSink,
  dataSinkSelected: () => void,
  dataSinks: Array<DataSink>,
  dataSinkError: string,
  startExperiment: () => void,
  experiment: Experiment,
  screen: Screen,
};

export default class Connect extends Component<Props> {
  props: Props;

  render() {
    const {
      deviceSelected,
      selectedDevice,
      searchDevices,
      devices,
      credentialsFileUploaded,
      selectedDataSink,
      dataSinkSelected,
      dataSinks,
      dataSinkError,
      startExperiment,
      experiment,
      screen,
    } = this.props;
    return (
      <React.Fragment>
        <Link to={routes.HOME}>
          <Button variant="contained" color="primary">
            To Home
          </Button>
        </Link>

        <Devices
          searchDevices={searchDevices}
          devices={devices}
          deviceSelected={deviceSelected}
          selectedDevice={selectedDevice}
        />

        <DataSinks
          credentialsFileUploaded={credentialsFileUploaded}
          dataSinks={dataSinks}
          dataSinkError={dataSinkError}
          dataSinkSelected={dataSinkSelected}
          selectedDataSink={selectedDataSink}
        />

        <ExperimentComponent
          startExperiment={startExperiment}
          experiment={experiment}
          device={selectedDevice}
          dataSink={selectedDataSink}
          screen={screen}
        />
      </React.Fragment>
    );
  }
}
