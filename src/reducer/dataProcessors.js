export function selectUnselectCurrency(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      let tempCurrencies = [...company.currencyRates];
      if (company.currencyRates.every(c => c.currencyType !== action.currency.currencyType)) {
        tempCurrencies.push({
          currencyName: action.currency.currencyName,
          currencyType: action.currency.currencyType
        })
      } else {
        tempCurrencies = tempCurrencies.filter(c => c.currencyType !== action.currency.currencyType);
      }
      company.currencyRates = tempCurrencies;
    }
    return company;
  });
}

export function changeCurrencyValue(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company.currencyRates.forEach(c => {
        if (c.currencyType === action.currencyType) {
          c[action.fieldName] = Number(action.value);
        }
      })
    }
    return company;
  });
}

export function changeParserValue(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      if (!company.exchangeCompanyParseData) {
        company.exchangeCompanyParseData = {};
      }
      company.exchangeCompanyParseData[action.fieldName] = action.value
    }
    return company;
  });
}

export function setInitialCurrencyState(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company.currencyRates = JSON.parse(action.initialCurrencyRate);
    }
    return company;
  });
}

export function setInitialParserState(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company.exchangeCompanyParseData = JSON.parse(action.initialParserData);
    }
    return company;
  });
}

export function deleteCommentaryById(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company.comments = company.comments.filter(comment => {
        return comment.id !== action.commentaryId;
      });
    }
    return company;
  })
}

export function changeCompanyMainInfoValue(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company[action.fieldName] = action.value;
    }
    return company;
  })
}

export function setInitialCompanyMainInfoState(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      return { ...company, ...JSON.parse(action.companyMainInfo) };
    }
    return company;
  });
}

export function changeWorkingTimeValue(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company.workingTime[action.fieldName] = action.value;
    }
    return company;
  })
}

export function changeCompanyDataInfoValue(companies, action) {
  return companies.map(company => {
    if (company.id === Number(action.companyId)) {
      company.exchangeCompanyDetail[action.fieldName] = action.value;
    }
    return company;
  })
}