import {CHANGE_CURRENCY_VALUE, SELECT_UNSELECT_CURRENCY, SET_INITIAL_CURRENCY_STATE} from "../constant/currencyRate";

export function selectUnselectCurrency(companyId, selectedCurrency) {
  return {
    type: SELECT_UNSELECT_CURRENCY,
    companyId: companyId,
    currency: selectedCurrency
  }
}

export function changeCurrencyValue(companyId, currencyType, fieldName, value) {
  return {
    type: CHANGE_CURRENCY_VALUE,
    companyId: companyId,
    currencyType: currencyType,
    fieldName: fieldName,
    value: value
  }
}

export function setInitialCurrencyState(companyId, initialCurrencyRate) {
  return {
    type: SET_INITIAL_CURRENCY_STATE,
    companyId, companyId,
    initialCurrencyRate: initialCurrencyRate
  }
}
