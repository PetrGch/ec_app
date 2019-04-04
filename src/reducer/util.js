import {sortingType} from "../constant/companies";
import {distance} from "../common/util/geolocation";

export const currencyMark = {
  USD: "$", GBP: "£", EUR: "€", AUD: "$", JPY: "¥",
  SGD: "$", HKD: "$", CAD: "$", SAR: "﷼", QAR: "﷼",
  OMR: "﷼", SEK: "kr", TWD: "NT$", KRW: "₩", CNY: "¥",
  PHP: "₱", NZD: "$", VND: "₫", BND: "$", ZAR: "R", IDR: "Rp",
  RUB: "₽", PKR: "₨", HUF: "Ft", ILS: "₪", NPR: "₨", LKR: "₨",
  PLN: "zł", EGP: "£", LAK: "₭", KHR: "៛", CZK: "Kč", MXN: "$",
  CHF: "CHF", MYR: "RM", DKK: "kr", NOK: "kr", INR: "₹", SCOT: "£",
  TRY: "₺", UAH: "₴"
};

function filterAmounts(currency, currencyAmount) {
  const result = {
    buy_price: 0,
    buy_trend: 0,
    sell_price: 0,
    sell_trend: 0,
    isPriceCorrect: true,
    updated_at: null
  };
  let minCurrencyAmountFrom = Infinity;

  if (currency && currency.exchange_currency_amounts
    && currency.exchange_currency_amounts.length !== 0) {

    for (let amount of currency.exchange_currency_amounts) {
      result.updated_at = amount.updated_at;

      if (amount.currency_amount_from && amount.currency_amount_to) {
        if (currencyAmount >= parseInt(amount.currency_amount_from)
          && currencyAmount <= parseInt(amount.currency_amount_to)) {

          result.buy_price = amount.buy_price;
          result.buy_trend = amount.buy_trend;
          result.sell_price = amount.sell_price;
          result.sell_trend = amount.sell_trend;
          result.isPriceCorrect = true;

          return result;
        }
      }

      if (amount.currency_amount_from && !amount.currency_amount_to) {
        if (currencyAmount === parseInt(amount.currency_amount_from)) {
          result.buy_price = amount.buy_price;
          result.buy_trend = amount.buy_trend;
          result.sell_price = amount.sell_price;
          result.sell_trend = amount.sell_trend;
          result.isPriceCorrect = true;

          return result;
        }
      }
      if (parseInt(amount.currency_amount_from) < minCurrencyAmountFrom) {
        minCurrencyAmountFrom = parseInt(amount.currency_amount_from);

        result.buy_price = amount.buy_price;
        result.buy_trend = amount.buy_trend;
        result.sell_price = amount.sell_price;
        result.sell_trend = amount.sell_trend;
        result.isPriceCorrect = false;
      }
    }
  }

  return result;
}

export function filterCurrency(record, currencyType, currencyAmount) {
  let filteredRecord = null;
  if (record.currencies.length !== 0) {
    record.currencies.some(currency => {
      if (currency.currency_type === currencyType) {
        const filteredAmount = filterAmounts(currency, currencyAmount);
        filteredRecord = {
          id: record.id,
          uuid: record.uuid,
          currencyMark: currencyMark[currencyType] || "",
          workingTime: record.exchange_company_working_time,
          company_name: record.company_name,
          branch_name: record.branch_name,
          lat: record.lat,
          lng: record.lng,
          buy_price: filteredAmount.buy_price,
          buy_trend: filteredAmount.buy_trend,
          sell_price: filteredAmount.sell_price,
          sell_trend: filteredAmount.sell_trend,
          isPriceCorrect: filteredAmount.isPriceCorrect,
          updated_at: filteredAmount.updated_at,
          address: record.address,
          google_map_url: record.google_map_url
        };
        return true;
      }
      return false
    })
  }

  return filteredRecord;
}

export function filterByCurrency(records, currencyType, currencyAmount) {
  const filteredRecords = [];

  if (records && currencyType) {
    records.forEach(record => {
      const filteredRecord = filterCurrency(record, currencyType, currencyAmount);
      if (filteredRecord) {
        filteredRecords.push(filteredRecord);
      }
    });
  }

  return filteredRecords;
}

export function sortCompanyByPrice(companies, isHighPrice, isBuyMode) {
  return companies.sort((itemA, itemB) => {
    let a;
    let b;

    if (isBuyMode) {
      a = !isNaN(itemA.buy_price) && !!itemA.buy_price ? itemA.buy_price : Infinity;
      b = !isNaN(itemB.buy_price) && !!itemB.buy_price ? itemB.buy_price : Infinity;

      return isHighPrice ? b - a : a - b;
    }
    a = !isNaN(itemA.sell_price) && !!itemA.sell_price ? itemA.sell_price : Infinity;
    b = !isNaN(itemB.sell_price) && !!itemB.sell_price ? itemB.sell_price : Infinity;

    return isHighPrice ? b - a : a - b;
  });
}

export function sortCompanyByField(records, isIncrease, fieldName) {
  if (isIncrease) {
    return records.sort((itemA, itemB) => {
      if (itemA[fieldName] <= itemB[fieldName]) return -1;
      if (itemA[fieldName] > itemB[fieldName]) return 1;
    })
  }
  return records.sort((itemA, itemB) => {
    if (itemA[fieldName] > itemB[fieldName]) return -1;
    if (itemA[fieldName] <= itemB[fieldName]) return 1;
  })
}

export function sortByGeolocation(records, lat, lng) {
  return records.map(record => {
    if (record.lat && record.lng) {
      return {...record, distance: distance(lat, lng, record.lat, record.lng, "K")}
    }

    return {...record, distance: Infinity};
  }).sort((itemA, itemB) => itemA.distance - itemB.distance);
}

export function sortCompany(sortType = sortingType.HIGH_PRICE, companies, parameters) {
  switch (sortType) {
    case sortingType.HIGH_PRICE:
      return sortCompanyByPrice(companies, true, parameters.isBuyMode);
    case sortingType.LOW_PRICE:
      return sortCompanyByPrice(companies, false, parameters.isBuyMode);
    case sortingType.NAME:
      return sortCompanyByField(companies, true, "company_name");
    case sortingType.GEOLOCATION:
      return sortByGeolocation(companies, parameters.lat, parameters.lng)
    default:
      return companies;
  }
}

export function filterByName(records, filterPattern) {
  const regExp = RegExp(filterPattern.toLowerCase());
  return records.filter(record => regExp.test(record.company_name.toLowerCase())
    || regExp.test(record.branch_name.toLowerCase()))
}
