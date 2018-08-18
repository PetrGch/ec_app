import {CHANGE_COMPANY_DATA_INFO_VALUE, SET_INITIAL_COMPANY_DATA_INFO_STATE} from "../constant/companyDataInfo";

export function changeCompanyDataInfoValue(companyId, fieldName, value, isNewCompany) {
  return {
    type: CHANGE_COMPANY_DATA_INFO_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value,
    isNewCompany: isNewCompany
  }
}

export function setInitialCompanyDataInfoState(companyId, companyMainInfo, isNewCompany) {
  return {
    type: SET_INITIAL_COMPANY_DATA_INFO_STATE,
    companyId, companyId,
    companyMainInfo: companyMainInfo,
    isNewCompany: isNewCompany
  }
}