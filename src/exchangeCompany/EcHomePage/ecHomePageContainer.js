import {connect} from 'react-redux';

import EcHomePage from "./EcHomePage";
import {loadAllCompaniesByCurrencyType, loadAllCurrencyTypes} from "../../action/companies";

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    filteredCurrencies: state.companies.filteredCurrencies,
    currencyTypes: state.companies.currencyTypes,
    currencyAmount: state.companies.currencyAmount,
    isBuyStatus: state.companies.isBuyStatus,
    selectedCurrency: state.companies.selectedCurrency,
    centralBank: state.companies.centralBank,
    selectedRange: state.companies.selectedRange,
    currencyMark: state.companies.currencyMark,
    sortType: state.companies.sortingType,
    filteringNameValue: state.companies.filteringNameValue,
    currentPage: state.companies.currentPage,
    amountOfPage: state.companies.amountOfPage,
    isCompaniesLoading: state.load.isCompaniesLoading,
    isCentralBankLoading: state.load.isCentralBankLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadAllCompaniesByCurrencyType(currencyType) {
      dispatch(loadAllCompaniesByCurrencyType(currencyType));
    },
    loadAllCurrencyTypes() {
      dispatch(loadAllCurrencyTypes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcHomePage);