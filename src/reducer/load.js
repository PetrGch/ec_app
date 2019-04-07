import {
  IS_CENTRAL_BANK_EUR_USD_LOADING,
  IS_CENTRAL_BANK_LOADING,
  IS_COMPANIES_LOADING,
  IS_COMPANY_LOADING
} from "../constant/load";

const initialState = {
  isCompaniesLoading: false,
  isCompanyLoading: false,
  isCentralBankLoading: false,
  isCentralBankEurUsdLoading: false
};

export default function load(state = initialState, action) {
  switch (action.type) {
    case IS_COMPANIES_LOADING:
      return {...state, isCompaniesLoading: action.isCompaniesLoading};
    case IS_COMPANY_LOADING:
      return {...state, isCompanyLoading: action.isCompanyLoading};
    case IS_CENTRAL_BANK_LOADING:
      return {...state, isCentralBankLoading: action.isCentralBankLoading};
    case IS_CENTRAL_BANK_EUR_USD_LOADING:
      return {...state, isCentralBankEurUsdLoading: action.isCentralBankEurUsdLoading};
    default:
      return state;
  }
}