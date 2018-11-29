import {connect} from 'react-redux';

import EcCompany from "./EcCompany";
import {findCompanyByBranchName, loadCompanyByBranchName} from "../../action/company";
import {loadAllCompanies} from "../../action/companies";
import {setBranchRout} from "../../action/rout";

const mapStateToProps = state => {
  return {
    company: state.company.company,
    filteredCurrency: state.company.filteredCurrency,
    companies: state.companies.companies,
    isBuyStatus: state.company.isBuyStatus,
    currencyAmount: state.company.currencyAmount,
    currencyTypes: state.companies.currencyTypes,
    selectedCurrency: state.companies.selectedCurrency,
    selectedCompanyCurrency: state.company.selectedCompanyCurrency,
    isCompaniesLoading: state.load.isCompaniesLoading,
    isCompanyLoading: state.load.isCompanyLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadCompany(branch_name) {
      dispatch(loadCompanyByBranchName(branch_name))
    },
    loadAllCompanies() {
      dispatch(loadAllCompanies());
    },
    findCompanyByBranchName(name, companies, selectedCurrency) {
      dispatch(findCompanyByBranchName(name, companies, selectedCurrency));
    },
    setBranchRout(branchRout) {
      dispatch(setBranchRout(branchRout))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcCompany);