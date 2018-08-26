import {connect} from 'react-redux';

import Currency from './Parser';

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
)(Currency);