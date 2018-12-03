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
