export const ecCurrencyMainTableConfig = (isBuy, sumAmount) => (
  isBuy ? ecCurrencyMainTableBuyConfig(sumAmount) : ecCurrencyMainTableSumConfig(sumAmount)
);

const ecCurrencyMainTableBuyConfig = (sumAmount) => (
  [
    {
      index: 'name',
      key: 'name',
      title: 'Currency',

    },
    {
      index: 'buyPrice',
      key: 'buyPrice',
      title: 'Buy',

    },
    {
      index: 'buyPriceSum',
      key: 'buyPriceSum',
      renderTitle: () => (`Buy ${sumAmount || 0}`),
      renderCell: (record) => (record.buyPrice && sumAmount ? record.buyPrice * sumAmount : '')

    }
  ]
);

const ecCurrencyMainTableSumConfig = (sumAmount) => (
  [
    {
      index: 'name',
      key: 'name',
      title: 'Currency',

    },
    {
      index: 'sellPrice',
      key: 'sellPrice',
      title: 'Sell',

    },
    {
      index: 'sellPriceSum',
      key: 'sellPriceSum',
      renderTitle: () => (`Sell ${sumAmount}`),
      renderCell: (record) => (record.sellPrice ? record.sellPrice * sumAmount : '')

    }
  ]
);

export const ecCurrencyMainTableRecord = [
  {
    name: "Company 1",
    buyPrice: "123",
    sellPrice: "123",
  },
  {
    name: "Company 2",
    buyPrice: "123",
    sellPrice: "123",
  },
  {
    name: "Company 3",
    buyPrice: "123",
    sellPrice: "123",
  },
  {
    name: "Company 4",
    buyPrice: "123",
    sellPrice: "123",
  }
];
