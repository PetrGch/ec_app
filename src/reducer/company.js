import {
  FIND_COMPANY_BY_NAME,
  LOAD_COMPANY_BY_NAME, SET_ACTIVE_COMPANY_CURRENCY, SET_ACTIVE_CURRENCY,
  SET_BUY_STATUS_FOR_COMPANY
} from "../constant/ecHomePage";
import {
  filterByCurrency,
  filterCurrency
} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableUtil";

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true,
  company: null,
  selectedCompanyCurrency: null,
  filteredCurrency: null
};

export default function company(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMPANY_BY_NAME:
    case FIND_COMPANY_BY_NAME:
      return {
        ...state,
        company: action.company,
        filteredCurrency: filterCurrency(action.company, action.selectedCurrency || 'EUR', state.currencyAmount)
      };
    case SET_BUY_STATUS_FOR_COMPANY:
      return {...state, isBuyStatus: action.isBuyStatus};
    case SET_ACTIVE_COMPANY_CURRENCY:
      return {
        ...state,
        selectedCompanyCurrency: action.selectedCurrency,
        filteredCurrency: filterCurrency(state.company, action.selectedCurrency, state.currencyAmount)
      };
    default:
      return state;
  }
}