import {
  CHANGE_PAGE,
  FILTER_COMPANIES_BY_NAME,
  LOAD_ALL_COMPANIES, LOAD_ALL_CURRENCIES,
  LOAD_CENTRAL_BANK_DATA,
  SET_BUY_STATUS, SET_SORTING_TYPE,
  SET_SUM_AMOUNT, sortingType
} from "../constant/companies";
import {currencyMark, filterByCurrency, filterByName, sortCompany} from "./util";
import {prepopulateCurrencyType} from "../action/companies";

const AMOUNT_OF_COMPANIES_ON_PAGE = 15;

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true,
  companies: [],
  currencyTypes: [],
  selectedCurrency: 'EUR',
  filteredCurrencies: [],
  centralBank: null,
  selectedRange: "7",
  currencyMark: currencyMark["EUR"],
  currentPage: 1,
  amountOfPage: 1,

  filteringNameValue: "",
  sortingType: sortingType.HIGH_PRICE
};

export default function companies(state = initialState, action) {
  let filteredByCurrency = null;
  let sortedCompany = null;
  let amountOfPage = null;
  let sortingParams = null;
  let filteredCompaniesByName = null;

  switch (action.type) {
    case LOAD_ALL_COMPANIES:
      sortingParams = {
        isBuyMode: state.isBuyStatus
      };
      filteredByCurrency = filterByCurrency(action.companies, action.selectedCurrency, state.currencyAmount);
      sortedCompany = sortCompany(state.sortingType, filteredByCurrency, sortingParams);
      amountOfPage = Math.ceil(sortedCompany.length / AMOUNT_OF_COMPANIES_ON_PAGE);

      return {
        ...state,
        amountOfPage,
        currentPage: 1,
        companies: action.companies,
        selectedCurrency: action.selectedCurrency,
        filteredCurrencies: sortedCompany.slice(0, AMOUNT_OF_COMPANIES_ON_PAGE)
      };
    case SET_BUY_STATUS:
      sortingParams = {
        isBuyMode: state.isBuyStatus
      };
      sortedCompany = sortCompany(state.sortingType, state.filteredCurrencies, sortingParams);

      return {
        ...state,
        currentPage: 1,
        filteredCurrencies: sortedCompany.slice(0, AMOUNT_OF_COMPANIES_ON_PAGE),
        isBuyStatus: action.isBuyStatus
      };
    case SET_SUM_AMOUNT:
      sortingParams = {
        isBuyMode: state.isBuyStatus
      };
      filteredByCurrency = filterByCurrency(action.companies, action.selectedCurrency, state.currencyAmount);
      sortedCompany = sortCompany(state.sortingType, filteredByCurrency, sortingParams);

      return {
        ...state,
        currentPage: 1,
        currencyAmount: action.currencyAmount,
        filteredCurrencies: sortedCompany.slice(0, AMOUNT_OF_COMPANIES_ON_PAGE)
      };
    case LOAD_CENTRAL_BANK_DATA:
      return {
        ...state,
        centralBank: action.centralBank,
        selectedRange: action.selectedRange
      };
    case LOAD_ALL_CURRENCIES:
      return {
        ...state,
        currencyTypes: prepopulateCurrencyType(action.currencyTypes)
      };
    case SET_SORTING_TYPE:
      sortingParams = {
        isBuyMode: state.isBuyStatus,
        lat: action.sortingType === sortingType.GEOLOCATION
          ? action.parameters.position.coords.latitude : null,
        lng: action.sortingType === sortingType.GEOLOCATION
          ? action.parameters.position.coords.longitude : null
      };
      sortedCompany = sortCompany(action.sortingType, state.filteredCurrencies, sortingParams);

      return {
        ...state,
        currentPage: 1,
        filteredCurrencies: sortedCompany.slice(0, AMOUNT_OF_COMPANIES_ON_PAGE),
        sortingType: action.sortingType
      };
    case FILTER_COMPANIES_BY_NAME:
      sortingParams = {
        isBuyMode: state.isBuyStatus
      };
      filteredByCurrency = filterByCurrency(state.companies, state.selectedCurrency, state.currencyAmount);
      filteredCompaniesByName = filterByName(filteredByCurrency, action.nameValue);
      sortedCompany = sortCompany(state.sortingType, filteredCompaniesByName, sortingParams);

      return {
        ...state,
        currentPage: 1,
        filteringNameValue: action.nameValue,
        filteredCurrencies: sortedCompany.slice(0, AMOUNT_OF_COMPANIES_ON_PAGE)
      };
    case CHANGE_PAGE:
      sortingParams = {
        isBuyMode: state.isBuyStatus
      };
      filteredByCurrency = filterByCurrency(state.companies, state.selectedCurrency, state.currencyAmount);
      filteredCompaniesByName = filterByName(filteredByCurrency, state.filteringNameValue);
      sortedCompany = sortCompany(state.sortingType, filteredCompaniesByName, sortingParams);
      const slicePageTo = action.pageNumber * AMOUNT_OF_COMPANIES_ON_PAGE;
      const slicePageFrom = slicePageTo - AMOUNT_OF_COMPANIES_ON_PAGE;

      return {
        ...state,
        currentPage: action.pageNumber,
        filteredCurrencies: sortedCompany.slice(slicePageFrom, slicePageTo)
      };
    default:
      return state;
  }
}