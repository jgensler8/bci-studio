// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Connect from '../components/Connect';
import * as ConnectActions from '../actions/devices';
import * as ClientActions from '../actions/client';
import * as EEGEventActions from '../actions/eegEvent';
import * as DataSinkActions from '../actions/dataSink';
import * as ExperimentActions from '../actions/experiment';

function mapStateToProps(state: Object) {
  return {
    collapseState: state.devices.collapseState,
    devices: state.devices.devices,
    selectedDevice: state.devices.selectedDevice,
    dataSinks: state.dataSinks.dataSinks,
    selectedDataSink: state.dataSinks.selectedDataSink,
    dataSinkError: state.dataSinks.error,
    experiment: state.experiments.experiment,
    screen: state.experiments.screen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ConnectActions,
      ...ClientActions,
      ...EEGEventActions,
      ...DataSinkActions,
      ...ExperimentActions,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Connect);
