import {prepopulateCurrencyType} from "../../src/action/companies";
import configureStore, {initialStore} from "../../src/store/configureStore";
import request from "request";
import {API_URL} from "../../src/common/util/AppConstance";
import {filterByCurrency, filterCurrency} from "../../src/reducer/util";

let companies = null;
let centralBank = null;
let currencyType = ["EUR", "USD", "GBP"];

(function() {
  companiesRequest();
  setTimeout(function tick() {
    companiesRequest();
    setTimeout(tick, 7200000);
  }, 7200000);
})();

function companiesRequest() {
  request(`${API_URL}/exCompany/snapshot`, function (error, response, companiesResponse) {
    if (!error) {
      companies = JSON.parse(companiesResponse).company;
      centralBank = JSON.parse(companiesResponse).centralBank;
    }
  });
}

export function createStoreWithCompanies() {
  if (companies) {
    return configureStore(
      {
        ...initialStore,
        companies: {
          ...initialStore.companies,
          companies: companies,
          centralBank: centralBank,
          currencyTypes: prepopulateCurrencyType(currencyType),
          filteredCurrencies: filterByCurrency(companies, "USD", 100)
        }
      })
  }

  return null;
}

export function createStoreWithCompany(companyString) {
  const company = JSON.parse(companyString);
  return configureStore(
    {
      companies: {
        ...initialStore.companies,
        companies: companies,
        currencyTypes: prepopulateCurrencyType(companies),
        filteredCurrencies: filterByCurrency(companies, "USD", 100)
      },
      company: {
        ...initialStore.company,
        company: company,
        filteredCurrency: filterCurrency(company, "USD", 100)
      }
    })
}