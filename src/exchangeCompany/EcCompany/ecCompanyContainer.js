import {connect} from 'react-redux';

import EcCompany from "./EcCompany";
import {findCompanyByBranchName, loadCompanyByName} from "../../action/company";

const mapStateToProps = state => {
  return {
    company: state.company.company,
    filteredCurrency: state.company.filteredCurrency,
    companies: state.companies.companies,
    isBuyStatus: state.company.isBuyStatus,
    currencyAmount: state.company.currencyAmount,
    currencyTypes: state.companies.currencyTypes,
    selectedCurrency: state.companies.selectedCurrency,
    selectedCompanyCurrency: state.company.selectedCompanyCurrency
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadCompany(name) {
      dispatch(loadCompanyByName(name))
    },
    findCompanyByBranchName(name, companies, selectedCurrency) {
      dispatch(findCompanyByBranchName(name, companies, selectedCurrency));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcCompany);