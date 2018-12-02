// @flow
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

type Props = {
  eegEvent: () => void,
};

export default class EEGEmitter extends Component<Props> {
  props: Props;

  render() {
    const { eegEvent } = this.props;
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={eegEvent}>
          Click to generate a fake event
        </Button>
      </React.Fragment>
    );
  }
}
