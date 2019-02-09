import {
  CHANGE_SELECTED_RANGE,
  LOAD_ALL_COMPANIES, LOAD_CENTRAL_BANK_DATA,
  SET_ACTIVE_CURRENCY,
  SET_BUY_STATUS,
  SET_SUM_AMOUNT
} from "../constant/companies";
import {ecCurrencyMainTableRecord} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableConfig";
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

export function loadAllCompanies() {
  return (dispatch) => {
    dispatch(isCompaniesLoading(true));
    request({
      url: API_URL + '/exCompany',
      method: 'GET'
    }).then(companies => {
      dispatch({
        companies,
        currencyTypes: prepopulateCurrencyType(companies),
        type: LOAD_ALL_COMPANIES
      })
    }).finally(() => {
      dispatch(isCompaniesLoading(false));
    });
  }
}

export function prepopulateCurrencyType(companies) {
  let currencyTypes = [];
  let mainCurrencyType = ['EUR', 'USD', 'GBP'];

  companies.forEach(company => {
    company.exchange_currencies.forEach(currency => {
      const currencyIndex = currencyTypes.indexOf(currency.currency_type);
      const mainCurrencyIndex = mainCurrencyType.indexOf(currency.currency_type);
      if (currencyIndex === -1 && mainCurrencyIndex === -1) {
        currencyTypes.push(currency.currency_type);
      }
    })
  });

  const mappedCurrencyTypes = currencyTypes
    .filter(currencyType => !!currencyType)
    .map(currencyType => ({index: currencyType, value: currencyType}))
    .sort((a, b) => a.value >= b.value ? 1 : -1);
  const mappedMainCurrencyTypes = mainCurrencyType
    .map(currencyType => ({index: currencyType, value: currencyType}));

  return mappedMainCurrencyTypes.concat(mappedCurrencyTypes);
}

export function setActiveCurrency(selectedCurrency) {
  return {
    selectedCurrency,
    type: SET_ACTIVE_CURRENCY
  }
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
