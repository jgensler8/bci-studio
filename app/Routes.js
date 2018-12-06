/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConnectPage from './containers/ConnectPage';
import DataPage from './containers/DataPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.DATA} component={DataPage} />
      <Route path={routes.CONNECT} component={ConnectPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
