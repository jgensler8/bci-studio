// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Predict from '../components/Predict';

function mapStateToProps(state: Object) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Predict);
