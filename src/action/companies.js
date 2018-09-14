import {FIND_COMPANY_BY_NAME, LOAD_ALL_COMPANIES, SET_BUY_STATUS, SET_SUM_AMOUNT} from "../constant/ecHomePage";
import {ecCurrencyMainTableRecord} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableConfig";

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
  return {
    companies: ecCurrencyMainTableRecord,
    type: LOAD_ALL_COMPANIES
  }
}
