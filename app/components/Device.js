// @flow
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { EEGDevice } from '../types/Device';

type Props = {
  device: EEGDevice
};

export default class Device extends Component<Props> {
  props: Props;

  render() {
    const { device } = this.props;
    console.log(device);
    return (
      <Card>
        <CardContent>
          <Typography>Name: {device.name}</Typography>
          <Typography component="p">Details: TODO</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Connect</Button>
        </CardActions>
      </Card>
    );
  }
}
