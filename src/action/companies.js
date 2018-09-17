import {FIND_COMPANY_BY_NAME, LOAD_ALL_COMPANIES, SET_BUY_STATUS, SET_SUM_AMOUNT} from "../constant/ecHomePage";
import {ecCurrencyMainTableRecord} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableConfig";
import {request} from "../common/util/APIUtil";
import {API_URL} from "../common/util/AppConstance";

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
    request({
      url: API_URL + '/company',
      method: 'GET'
    }).then((data) => {
      dispatch({
        companies: data,
        type: LOAD_ALL_COMPANIES
      })
    });
  }
}
