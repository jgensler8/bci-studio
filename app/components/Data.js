// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Radio } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import routes from '../constants/routes';
import { Dataset, DatasetProvider } from '../types/Data';

type Props = {
  error: string,
  datasets: Array<Object>,
  datasetProvider: DatasetProvider,
  selectedDataset: Dataset,
  datasetSelected: (dataset: Dataset) => void,
  credentialsFileUploaded: () => void,
};

function toDateTextFieldInput(date: Date) {
  return date.toISOString().substr(0, 10);
}

export default class Data extends Component<Props> {
  props: Props;

  render() {
    const {
      error,
      datasets,
      datasetProvider,
      selectedDataset,
      datasetSelected,
      credentialsFileUploaded,
    } = this.props;

    const today = new Date();
    const yesterday = new Date(today - 1 * 24 * 60 * 60 * 1000);

    return (
      <React.Fragment>
        <Link to={routes.HOME}>
          <Button variant="contained" color="primary">
            To Home
          </Button>
        </Link>
        <Card>
          <CardContent>
            <Typography>Fuse BigQuery Data</Typography>
            <Typography component="p">
              This fuses eeg events and trail events to give you a table that
              can predict features based on eeg data.
            </Typography>
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              defaultValue={toDateTextFieldInput(yesterday)}
            />
            <TextField
              id="endDat"
              label="End Date"
              type="date"
              defaultValue={toDateTextFieldInput(today)}
            />
            <input type="file" id="input" onChange={credentialsFileUploaded} />
            <div>
              Datasets:
              {datasets.map(dataset => (
                <React.Fragment key={dataset.name}>
                  <Radio
                    checked={selectedDataset.name === dataset.name}
                    onChange={() => datasetSelected(dataset)}
                    value={dataset.name}
                    name="select"
                    aria-label="Select"
                  />
                  {dataset.name}
                </React.Fragment>
              ))}
            </div>
            <React.Fragment>
              {error !== null ? (
                <React.Fragment>{error}</React.Fragment>
              ) : (
                <React.Fragment>No error</React.Fragment>
              )}
            </React.Fragment>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => datasetProvider.fuse(selectedDataset, 0)}
            >
              Fuse
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}
