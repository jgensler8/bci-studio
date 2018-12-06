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

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            @jeffzzq
          </Typography>
          <Typography variant="h5" component="h2">
            BCI Studio
          </Typography>
          <Typography color="textSecondary">
            A Desktop Electron Application for Designing BCI Application
          </Typography>
          <Typography component="p">
            Supports: EPOC+, Google BigQuery
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={routes.CONNECT}>
            <Button size="small" variant="contained" color="primary">
              Start An Experiment
            </Button>
          </Link>
          <Link to={routes.DATA}>
            <Button size="small" variant="contained" color="primary">
              Analyze You Data
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}
