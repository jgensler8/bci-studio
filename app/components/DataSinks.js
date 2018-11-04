// @flow
import React, { Component } from 'react';
// import EEGEmitter from './EEGEmitter';
// import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

type Props = {
  //   dataSinkAdded: () => void,
};

export default class DataSinks extends Component<Props> {
  props: Props;

  render() {
    // const {
    //   dataSinkAdded,
    // } = this.props;
    console.log('render -- DataSinks.js -- ');
    return (
      <React.Fragment>
        <Typography variant="h3" component="h2">
          Data Sinks
        </Typography>
        {/* { credentials ? <EEGEmitter eegEvent={eegEvent}></EEGEmitter> :  */}
        <React.Fragment>
          <Typography component="div">No Data Sink Defined.</Typography>
          {/* <Typography component="div">
            <Button containerElement='label' label="upload">
              <input type="file" id="input" onChange={credentialsFileUploaded}></input>
            </Button>
          </Typography> */}
        </React.Fragment>
      </React.Fragment>
    );
  }
}
