// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import routes from '../constants/routes';

type Props = {};

export default class PredictComponent extends Component<Props> {
  props: Props;

  render() {
    // const {} = this.props;
    return (
      <React.Fragment>
        <Link to={routes.HOME}>
          <Button variant="contained" color="primary">
            To Home
          </Button>
        </Link>
        <Card>
          <CardContent>
            <Typography>Live Predict</Typography>
            <Typography component="p">
              Connect a Device and Run a Live Predict Experiment
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Run</Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}
