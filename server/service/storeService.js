import {prepopulateCurrencyType} from "../../src/action/companies";
import {
  filterByCurrency,
  filterCurrency
} from "../../src/exchangeCompany/EcHomePage/EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableUtil";
import configureStore, {initialStore} from "../../src/store/configureStore";

export function createStoreWithCompanies(companiesString) {
  const companies = JSON.parse(companiesString);
  return configureStore(
    {
      ...initialStore,
      companies: {
        ...initialStore.companies,
        companies: companies,
        currencyTypes: prepopulateCurrencyType(companies),
        filteredCurrencies: filterByCurrency(companies, "USD", 100)
      }
    })
}

export function createStoreWithCompany(companiesString) {
  const company = JSON.parse(companiesString);
  return configureStore(
    {
      ...initialStore,
      company: {
        ...initialStore.company,
        company: company,
        filteredCurrency: filterCurrency(company, "USD", 100)
      }
    })
}