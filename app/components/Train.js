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

export default class TrainComponent extends Component<Props> {
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
            <Typography>Train a Model</Typography>
            <Typography component="p">
              This functionality is not implemented quite yet. There are several
              manual steps that you can follow in the README of the BCI Studio
              Project
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Train</Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}
