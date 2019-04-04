import {
  CHANGE_PAGE, FILTER_COMPANIES_BY_NAME,
  LOAD_ALL_COMPANIES, LOAD_ALL_CURRENCIES, LOAD_CENTRAL_BANK_DATA,
  SET_BUY_STATUS, SET_SORTING_TYPE,
  SET_SUM_AMOUNT
} from "../constant/companies";
import {request} from "../common/util/APIUtil";
import {API_URL} from "../common/util/AppConstance";
import {isCentralBankLoading, isCompaniesLoading} from "./load";

export function setBuyStatus(isBuyStatus) {
  return {
    isBuyStatus,
    type: SET_BUY_STATUS
  }
}

export function setSumAmount(currencyAmount) {
  return {
    currencyAmount,
    type: SET_SUM_AMOUNT
  }
}

export function loadAllCompaniesByCurrencyType(currencyType) {
  return (dispatch) => {
    dispatch(isCompaniesLoading(true));
    request({
      url: API_URL + `/exCompany?currencyType=${currencyType}`,
      method: 'GET'
    }).then((companies) => {
      dispatch({
        companies,
        selectedCurrency: currencyType,
        type: LOAD_ALL_COMPANIES
      })
    }).finally(() => {
      dispatch(isCompaniesLoading(false));
    });
  }
}

export function loadAllCurrencyTypes() {
  return (dispatch) => {
    request({
      url: API_URL + `/exCurrency/types`,
      method: 'GET'
    }).then((currencyTypes) => {
      dispatch({
        currencyTypes: currencyTypes,
        type: LOAD_ALL_CURRENCIES
      })
    });
  }
}

export function prepopulateCurrencyType(currencyTypes) {
  return currencyTypes.map((currencyType) => {
    return {
      index: currencyType,
      value: currencyType
    }
  })
}

export function loadDataOfCentralBank(currencyType, period, selectedRangeCB) {
  return (dispatch) => {
    dispatch(isCentralBankLoading(true));
    request({
      url: API_URL + `/centralBank?currencyType=${currencyType.toUpperCase()}&period=${period}`,
      method: 'GET'
    }).then((centralBank) => {
      if (typeof selectedRangeCB === "function") {
        selectedRangeCB();
      }

      dispatch({
        centralBank,
        selectedRange: period,
        type: LOAD_CENTRAL_BANK_DATA
      })
    }).finally(() => {
      dispatch(isCentralBankLoading(false));
    });
  };
}

export function setSortingType(sortingType, parameters = {}) {
  return {
    sortingType,
    parameters,
    type: SET_SORTING_TYPE
  }
}

export function filterCompanyByName(nameValue) {
  return {
    nameValue,
    type: FILTER_COMPANIES_BY_NAME
  }
}

export function changePage(pageNumber) {
  return {
    pageNumber,
    type: CHANGE_PAGE
  }
}
