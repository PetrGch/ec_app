import {
  FIND_COMPANY_BY_NAME, LOAD_ALL_COMPANIES,
  LOAD_COMPANY_BY_NAME,
  SET_BUY_STATUS_FOR_COMPANY,
  SET_SUM_AMOUNT
} from "../constant/ecHomePage";
import {ecCurrencyMainTableRecord} from "../exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableConfig";
import {API_URL} from "../common/util/AppConstance";
import {request} from "../common/util/APIUtil";

export function setBuyStatus(isBuyStatus) {
  return {
    isBuyStatus,
    type: SET_BUY_STATUS_FOR_COMPANY
  }
}

export function setSumAmount(currencyAmount) {
  return {
    currencyAmount,
    type: SET_SUM_AMOUNT
  }
}

export function loadCompanyByName(name) {
  return (dispatch) => {
    request({
      url: API_URL + `/company/${name}`,
      method: 'GET'
    }).then((data) => {
      dispatch({
        company: data,
        type: LOAD_COMPANY_BY_NAME
      })
    });
  };
}

export function findCompanyByName(name, companies) {
  let foundCompany = null;

  companies && companies.some(company => {
    if (company.name === name) {
      foundCompany = company;
      return true;
    }
    return false;
  });

  return {
    company: foundCompany,
    type: FIND_COMPANY_BY_NAME
  }
}