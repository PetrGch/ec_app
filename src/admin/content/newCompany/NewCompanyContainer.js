import {connect} from "react-redux";

import NewCompany from "./NewCompany";

const mapStateToProps = state => {
  return {
    newCompany: state.admin.newCompany
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
)(NewCompany);