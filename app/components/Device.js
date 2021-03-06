// @flow
import React, { Component } from 'react';
import { Button, Radio } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { EEGDevice } from '../types/Device';

type Props = {
  device: EEGDevice,
  selected: boolean,
  deviceSelected: () => void,
};

export default class DeviceComponent extends Component<Props> {
  props: Props;

  render() {
    const { device, selected, deviceSelected } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography>Name: {device.name}</Typography>
          <Typography component="p">Details: TODO</Typography>
          <Radio
            checked={selected}
            onChange={() => deviceSelected(device)}
            value={device.name}
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
