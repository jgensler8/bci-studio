// @flow
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import DataSinkComponent from './DataSink';
import { DataSink } from '../types/DataSink';

type Props = {
  credentialsFileUploaded: () => void,
  dataSinks: Array<DataSink>,
  selectedDataSink: DataSink,
  dataSinkSelected: () => void,
  dataSinkError: string,
};

export default class DataSinks extends Component<Props> {
  props: Props;

  render() {
    const {
      credentialsFileUploaded,
      dataSinks,
      selectedDataSink,
      dataSinkSelected,
      dataSinkError,
    } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h3" component="h2">
          Data Sinks
        </Typography>
        <React.Fragment>
          {dataSinks.map(dataSink => (
            <DataSinkComponent
              key={dataSink.name}
              dataSink={dataSink}
              selected={
                selectedDataSink.name
                  ? selectedDataSink.name === dataSink.name
                  : false
              }
              dataSinkSelected={dataSinkSelected}
            />
          ))}
        </React.Fragment>
        <React.Fragment>
          {dataSinkError !== null ? (
            <React.Fragment>{dataSinkError}</React.Fragment>
          ) : (
            <React.Fragment>No error</React.Fragment>
          )}
        </React.Fragment>
        <React.Fragment>
          <Typography component="div">No Data Sink Defined.</Typography>
          <Typography component="div">
            <input type="file" id="input" onChange={credentialsFileUploaded} />
          </Typography>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
