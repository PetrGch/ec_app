import {connect} from 'react-redux';

import EcHomePage from "./EcHomePage";

const mapStateToProps = state => {
  return {
    ecHomePage: state.ecHomePage
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
)(EcHomePage);