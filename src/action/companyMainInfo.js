import {
  CHANGE_COMPANY_MAIN_INFO_VALUE, CHANGE_WORKING_TIME_VALUE,
  SET_INITIAL_COMPANY_MAIN_INFO_STATE
} from "../constant/companyMainInfo";

export function changeCompanyMainInfoValue(companyId, fieldName, value, isNewCompany = false) {
  return {
    type: CHANGE_COMPANY_MAIN_INFO_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value,
    isNewCompany: isNewCompany
  }
}

export function setInitialCompanyMainInfoState(companyId, companyMainInfo, isNewCompany = false) {
  return {
    type: SET_INITIAL_COMPANY_MAIN_INFO_STATE,
    companyId, companyId,
    companyMainInfo: companyMainInfo,
    isNewCompany: isNewCompany
  }
}

export function changeWorkingTimeValue(companyId, fieldName, value, isNewCompany = false) {
  return {
    type: CHANGE_WORKING_TIME_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value,
    isNewCompany: isNewCompany
  }
}
