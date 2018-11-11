import {connect} from 'react-redux';

import EcHomePage from "./EcHomePage";
import {loadAllCompanies} from "../../action/companies";

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    filteredCurrencies: state.companies.filteredCurrencies,
    currencyTypes: state.companies.currencyTypes,
    currencyAmount: state.companies.currencyAmount,
    isBuyStatus: state.companies.isBuyStatus,
    selectedCurrency: state.companies.selectedCurrency
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