import {connect} from 'react-redux';

import EcCompany from "./EcCompany";
import {findCompanyByBranchName, loadCompanyByBranchName} from "../../action/company";
import {loadAllCompaniesByCurrencyType, loadAllCurrencyTypes, loadCentralBankEurUsdData} from "../../action/companies";
import {setBranchRout} from "../../action/rout";

const mapStateToProps = state => {
  return {
    company: state.company.company,
    filteredCurrency: state.company.filteredCurrency,
    isBuyStatus: state.company.isBuyStatus,
    currencyAmount: state.company.currencyAmount,
    selectedCompanyCurrency: state.company.selectedCompanyCurrency,

    companies: state.companies.companies,
    currencyTypes: state.companies.currencyTypes,
    selectedCurrency: state.companies.selectedCurrency,
    centralBankEurUsd: state.companies.centralBankEurUsd,

    isCompaniesLoading: state.load.isCompaniesLoading,
    isCompanyLoading: state.load.isCompanyLoading,
    isCentralBankEurUsdLoading: state.load.isCentralBankEurUsdLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadCompany(branch_name) {
      dispatch(loadCompanyByBranchName(branch_name))
    },
    findCompanyByBranchName(name, companies, selectedCurrency) {
      dispatch(findCompanyByBranchName(name, companies, selectedCurrency));
    },
    setBranchRout(branchRout) {
      dispatch(setBranchRout(branchRout))
    },
    loadAllCompaniesByCurrencyType(currencyType) {
      dispatch(loadAllCompaniesByCurrencyType(currencyType));
    },
    loadAllCurrencyTypes() {
      dispatch(loadAllCurrencyTypes());
    },
    loadCentralBankEurUsdData() {
      dispatch(loadCentralBankEurUsdData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcCompany);