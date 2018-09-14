import {connect} from 'react-redux';

import EcHomePage from "./EcHomePage";
import {loadAllCompanies} from "../../action/companies";

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    currencyAmount: state.companies.currencyAmount,
    isBuyStatus: state.companies.isBuyStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadAllCompanies() {
      dispatch(loadAllCompanies());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcHomePage);