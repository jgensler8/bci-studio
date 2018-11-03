// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';

type Props = {
  credentials: object,
  onCredentialsLoad: () => void,
};

export default class GoogleCloudAPI extends Component<Props> {
  props: Props;

  render() {
    const {
      credentials,
      onCredentialsLoad
    } = this.props;
    console.log("render -- Counter.js -- ", counter)
    return (
        <React.Fragment>
        </React.Fragment>
    );
  }
}
