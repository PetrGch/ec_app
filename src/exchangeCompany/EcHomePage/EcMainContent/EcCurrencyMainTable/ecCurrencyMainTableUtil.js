import { distance } from '../../../../common/util/geolocation';

export function sortedWithField(records, isIncrease, fieldName) {
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

export function sortedByPrice(records, isIncrease, isBuy) {
  let a;
  let b;

  return records.sort((itemA, itemB) => {
    if (isBuy) {
      a = !isNaN(itemA.buy_price) && !!itemA.buy_price ? itemA.buy_price : Infinity;
      b = !isNaN(itemB.buy_price) && !!itemB.buy_price ? itemB.buy_price : Infinity;
      return isIncrease ? a - b : b - a;
    }
    a = !isNaN(itemA.sell_price) && !!itemA.sell_price ? itemA.sell_price : Infinity;
    b = !isNaN(itemB.sell_price) && !!itemB.sell_price ? itemB.sell_price : Infinity;
    return isIncrease ? a - b : b - a;
  });
}

export function sortByGeolocation(records, lat, lng) {
  return records.map(record => {
    if (record.lat && record.lng) {
      return {...record, distance: distance(lat, lng, record.lat, record.lng, "K")}
    }

    return {...record, distance: Infinity};
  }).sort((itemA, itemB) => itemA.distance - itemB.distance);
}

export function filterByName(records, filterPattern) {
  const regExp = RegExp(filterPattern.toLowerCase());
  return records.filter(record => regExp.test(record.company_name.toLowerCase())
    || regExp.test(record.branch_name.toLowerCase()))
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

export function filterCurrency(record, currencyType, currencyAmount) {
  let filteredRecord = null;
  if (record.exchange_currencies.length !== 0) {
    record.exchange_currencies.some(currency => {
      if (currency.currency_type === currencyType) {
        const filteredAmount = filterAmounts(currency, currencyAmount);
        filteredRecord = {
          id: record.id,
          uuid: record.uuid,
          company_name: record.company_name,
          branch_name: record.branch_name,
          is_central_bank: record.is_central_bank,
          lat: record.lat,
          lng: record.lng,
          buy_price: filteredAmount.buy_price,
          sell_price: filteredAmount.sell_price,
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

function filterAmounts(currency, currencyAmount) {
  let buy_price = 0;
  let sell_price = 0;
  let updated_at = null;

  if (currency && currency.exchange_currency_amounts
    && currency.exchange_currency_amounts.length !== 0) {
    currency.exchange_currency_amounts.forEach(amount => {
      updated_at = amount.updated_at;
      if (amount.currency_amount_from && amount.currency_amount_to) {
        if (currencyAmount >= parseInt(amount.currency_amount_from)
          && currencyAmount <= parseInt(amount.currency_amount_to)) {
          buy_price = amount.buy_price;
          sell_price = amount.sell_price;
        }
      }
      if (amount.currency_amount_from && !amount.currency_amount_to) {
        if (currencyAmount >= parseInt(amount.currency_amount_from)) {
          buy_price = amount.buy_price;
          sell_price = amount.sell_price;
        } else if (!buy_price && !sell_price && currencyAmount < parseInt(amount.currency_amount_from)) {
          buy_price = 0;
          sell_price = 0;
        }
      }
    })
  }

  return {
    buy_price,
    sell_price,
    updated_at
  }
}