// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Train from '../components/Train';

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
)(Train);
