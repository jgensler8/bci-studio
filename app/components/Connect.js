// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Devices from './Devices';
import DataSinks from './DataSinks';
import ExperimentComponent from './Experiment';
import { EEGDevice } from '../types/Device';
import { DataSink } from '../types/DataSink';
import { Experiment, Screen } from '../types/Experiment';
import routes from '../constants/routes';

type Props = {
  toggleCollapse: () => void,
  collapseState: boolean,
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
      toggleCollapse,
      collapseState,
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleCollapse()}
        >
          Toggle Collapse
        </Button>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Collapse in={collapseState}>
              <Devices
                searchDevices={searchDevices}
                devices={devices}
                deviceSelected={deviceSelected}
                selectedDevice={selectedDevice}
              />
            </Collapse>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Collapse in={collapseState}>
              <DataSinks
                credentialsFileUploaded={credentialsFileUploaded}
                dataSinks={dataSinks}
                dataSinkError={dataSinkError}
                dataSinkSelected={dataSinkSelected}
                selectedDataSink={selectedDataSink}
              />
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <ExperimentComponent
              startExperiment={startExperiment}
              experiment={experiment}
              device={selectedDevice}
              dataSink={selectedDataSink}
              screen={screen}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
