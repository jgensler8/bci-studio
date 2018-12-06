// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Data from '../components/Data';
import * as DataActions from '../actions/data';

function mapStateToProps(state: Object) {
  return {
    error: state.data.error,
    datasets: state.data.datasets,
    datasetProvider: state.data.datasetProvider,
    selectedDataset: state.data.selectedDataset,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...DataActions,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Data);
