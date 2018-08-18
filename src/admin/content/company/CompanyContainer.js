import {connect} from "react-redux";

import Company from "./Company";

const mapStateToProps = state => {
  return {
    companies: state.admin.companies
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);