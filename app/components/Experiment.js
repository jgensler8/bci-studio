// @flow
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { EEGDevice, isNullDevice } from '../types/Device';
import { DataSink, isNullDataSink } from '../types/DataSink';
import { Screen } from '../types/Experiment';

type Props = {
  startExperiment: () => void,
  device: EEGDevice,
  dataSink: DataSink,
  screen: Screen,
};

export default class ExperimentComponent extends Component<Props> {
  props: Props;

  render() {
    this.experimentName = 'test';
    const { startExperiment, device, dataSink, screen } = this.props;
    console.log(screen);
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h2">
            Experiment
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                id="experimentname"
                label="Experiment Name"
                value={this.experimentName}
              />

              <React.Fragment>
                {!isNullDataSink(dataSink) && !isNullDevice(device) ? (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        startExperiment(this.experimentName, device, dataSink)
                      }
                    >
                      Start Basic Experiment
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    You need to select a Device and a Data Sink before starting
                    an Experiment
                  </React.Fragment>
                )}
              </React.Fragment>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={24}>
          {screen.render()}
        </Grid>
      </Grid>
    );
  }
}
