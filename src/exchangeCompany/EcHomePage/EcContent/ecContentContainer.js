import {connect} from 'react-redux';

import EcContent from "./EcContent";

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
)(EcContent);