// @flow
import React, { Component } from 'react';
import { Button, Radio } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DataSink } from '../types/DataSink';

type Props = {
  dataSink: DataSink,
  selected: boolean,
  dataSinkSelected: () => void,
};

export default class DataSinkComponent extends Component<Props> {
  props: Props;

  render() {
    const { dataSink, selected, dataSinkSelected } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography>Name: {dataSink.name}</Typography>
          <Typography component="p">Details: TODO</Typography>
          <Radio
            checked={selected}
            onChange={() => dataSinkSelected(dataSink)}
            value={dataSink.name}
            name="select"
            aria-label="Select"
          />
        </CardContent>
        <CardActions>
          <Button size="small">Connect</Button>
        </CardActions>
      </Card>
    );
  }
}
