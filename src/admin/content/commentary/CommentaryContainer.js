import {connect} from 'react-redux';
import Commentary from './Commentary';

const mapStateToProps = state => {
  return {
    companies: state.admin.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commentary);