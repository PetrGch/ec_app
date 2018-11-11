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
  if (isIncrease) {
    return records.sort((itemA, itemB) => {
      if (isBuy) return itemA.buy_price - itemB.buy_price;
      return itemA.sell_price - itemB.sell_price
    })
  }
  return records.sort((itemA, itemB) => {
    if (isBuy) return itemB.buy_price - itemA.buy_price;
    return itemB.sell_price - itemA.sell_price
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
          updated_at: record.updated_at,
          lat: record.lat,
          lng: record.lng,
          buy_price: filteredAmount.buy_price,
          sell_price: filteredAmount.sell_price
        };
        return true;
      }
      return false
    })
  }

  return filteredRecord;
}

function filterAmounts(currency, currencyAmount) {
  let buy_price = null;
  let sell_price = null;

  if (currency && currency.exchange_currency_amounts
    && currency.exchange_currency_amounts.length !== 0) {
    currency.exchange_currency_amounts.some(amount => {
      if (amount.currency_amount_from && amount.currency_amount_to) {
        if (currencyAmount >= amount.currency_amount_from && currencyAmount <= amount.currency_amount_to) {
          buy_price = amount.buy_price;
          sell_price = amount.sell_price;
          return true
        }
      }
      if (amount.currency_amount_from && !amount.currency_amount_to) {
        buy_price = amount.buy_price;
        sell_price = amount.sell_price;
        return true
      }
      return false;
    })
  }

  return {
    buy_price,
    sell_price
  }
}