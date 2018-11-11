import {LOAD_ALL_COMPANIES, SET_ACTIVE_CURRENCY, SET_BUY_STATUS, SET_SUM_AMOUNT} from "../constant/ecHomePage";
import {filterByCurrency} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableUtil";

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true,
  companies: [],
  currencyTypes: [],
  selectedCurrency: 'EUR',
  filteredCurrencies: []
};

export default function companies(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_COMPANIES:
      return {
        ...state,
        companies: action.companies,
        currencyTypes: action.currencyTypes,
        filteredCurrencies: filterByCurrency(action.companies, state.selectedCurrency, state.currencyAmount)
      };
    case SET_BUY_STATUS:
      return {...state, isBuyStatus: action.isBuyStatus};
    case SET_SUM_AMOUNT:
      return {
        ...state,
        currencyAmount: action.currencyAmount,
        filteredCurrencies: filterByCurrency(state.companies, state.selectedCurrency, action.currencyAmount)
      };
    case SET_ACTIVE_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.selectedCurrency,
        filteredCurrencies: filterByCurrency(state.companies, action.selectedCurrency, state.currencyAmount)
      };
    default:
      return state;
  }
}