import {
  IS_CENTRAL_BANK_EUR_USD_LOADING,
  IS_CENTRAL_BANK_LOADING,
  IS_COMPANIES_LOADING,
  IS_COMPANY_LOADING
} from "../constant/load";

export function isCompaniesLoading(isLoading) {
  return {
    type: IS_COMPANIES_LOADING,
    isCompaniesLoading: isLoading
  }
}

export function isCompanyLoading(isLoading) {
  return {
    type: IS_COMPANY_LOADING,
    isCompanyLoading: isLoading
  }
}

export function isCentralBankLoading(isLoading) {
  return {
    type: IS_CENTRAL_BANK_LOADING,
    isCentralBankLoading: isLoading
  }
}

export function isCentralBankEurUsdLoading(isLoading) {
  return {
    type: IS_CENTRAL_BANK_EUR_USD_LOADING,
    isCentralBankEurUsdLoading: isLoading
  }
}
