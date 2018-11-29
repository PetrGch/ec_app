import {
  CHANGE_SELECTED_RANGE,
  LOAD_ALL_COMPANIES,
  LOAD_CENTRAL_BANK_DATA,
  SET_ACTIVE_CURRENCY,
  SET_BUY_STATUS,
  SET_SUM_AMOUNT
} from "../constant/companies";
import {filterByCurrency} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableUtil";

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true,
  companies: [],
  currencyTypes: [],
  selectedCurrency: 'EUR',
  filteredCurrencies: [],
  centralBank: null,
  selectedRange: "7"
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
    case LOAD_CENTRAL_BANK_DATA:
      return {
        ...state,
        centralBank: action.centralBank,
        selectedRange: action.selectedRange
      };
    default:
      return state;
  }
}