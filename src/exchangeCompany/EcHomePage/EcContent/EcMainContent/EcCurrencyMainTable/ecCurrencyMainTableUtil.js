import { distance } from '../../../../../common/util/geolocation';

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
      if (isBuy) return itemA.buyPrice - itemB.buyPrice;
      return itemA.sellPrice - itemB.sellPrice
    })
  }
  return records.sort((itemA, itemB) => {
    if (isBuy) return itemB.buyPrice - itemA.buyPrice;
    return itemB.sellPrice - itemA.sellPrice
  })
}

export function sortByGeolocation(records, lat, lon) {
  return records.map(record => {
    if (record.coordinateX && record.coordinateY) {
      return {...record, distance: distance(lat, lon, record.coordinateX, record.coordinateY, "K")}
    }

    return {...record, distance: Infinity};
  }).sort((itemA, itemB) => itemA.distance - itemB.distance);
}

export function filterByName(records, filterPattern) {
  const regExp = RegExp(filterPattern);
  return records.filter(record => regExp.test(record.name))
}