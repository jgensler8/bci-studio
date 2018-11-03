// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Connect from '../components/Connect';
import * as ConnectActions from '../actions/devices';
import * as ClientActions from '../actions/client';
import * as EEGEventActions from '../actions/eegEvent';

function mapStateToProps(state: Object) {
  console.log("ConnectPage.js -- mapStateToProps")
  console.log(state)
  return {
    devices: state.devices.devices,
    credentials: state.client.credentials
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  {
    ...ConnectActions,
    ...ClientActions,
    ...EEGEventActions
  }
  , dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connect);
