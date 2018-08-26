export const baseCurrencyGridConfig = (isBuy) => {
  if (isBuy) {
    return baseCurrencyBuy;
  }

  return baseCurrencySell;
};

const baseCurrencySell = [
  {
    index: "name",
    key: "name",
    title: ""
  },
  {
    index: "sellUsd",
    key: "sellUsd",
    title: "USD"
  },
  {
    index: "sellEur",
    key: "sellEur",
    title: "EUR"
  }
];

const baseCurrencyBuy = [
  {
    index: "name",
    key: "name",
    title: ""
  },
  {
    index: "buyUsd",
    key: "buyUsd",
    title: "USD"
  },
  {
    index: "buyEur",
    key: "buyEur",
    title: "EUR"
  }
];

export const baseCurrencyMockRecord = [
  {
    name: "Central bank 1",
    buyEur: "123",
    buyUsd: "234",
    sellEur: "345",
    sellUsd: "456"
  },
  {
    name: "Central bank 2",
    buyEur: "123",
    buyUsd: "234",
    sellEur: "345",
    sellUsd: "456"
  },
  {
    name: "Central bank 2",
    buyEur: "123",
    buyUsd: "234",
    sellEur: "345",
    sellUsd: "456"
  }
];