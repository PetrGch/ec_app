import {
  KnowMore,
  renderBuyPrice,
  renderBuyTitle, renderCompanyName, renderKnowMore,
  renderLastUpdateTime,
  renderSellPrice,
  renderSellTitle
} from "./ecCurrencyMainTableRender";

export const ecCurrencyMainTableConfig = (isBuy, sumAmount, knowMore = () => {}) => (
  isBuy
    ? ecCurrencyMainTableBuyConfig(sumAmount, knowMore)
    : ecCurrencyMainTableSumConfig(sumAmount, knowMore)
);

const ecCurrencyMainTableBuyConfig = (sumAmount, knowMore) => (
  [
    {
      index: 'name',
      key: 'name',
      title: 'Currency',
      renderCell: renderCompanyName
    },
    {
      index: 'buyPrice',
      key: 'buyPrice',
      title: 'Buy'
    },
    {
      index: 'buyPriceSum',
      key: 'buyPriceSum',
      renderTitle: () => renderBuyTitle(sumAmount),
      renderCell: (record) => renderBuyPrice(record.buyPrice, sumAmount)
    },
    {
      index: 'updatedAt',
      key: 'updatedAt',
      title: 'Last update',
      renderCell: (record, config) => renderLastUpdateTime(record, config.key)
    },
    {
      index: 'knowMore',
      title: 'Info',
      renderCell: (record) => renderKnowMore(record.id, record.name, knowMore)
    }
  ]
);

const ecCurrencyMainTableSumConfig = (sumAmount, knowMore) => (
  [
    {
      index: 'name',
      key: 'name',
      title: 'Currency'
    },
    {
      index: 'sellPrice',
      key: 'sellPrice',
      title: 'Sell'
    },
    {
      index: 'sellPriceSum',
      key: 'sellPriceSum',
      renderTitle: () => renderSellTitle(sumAmount),
      renderCell: (record) => renderSellPrice(record.sellPrice, sumAmount)
    },
    {
      index: 'updatedAt',
      key: 'updatedAt',
      title: 'Last update',
      renderCell: (record, config) => renderLastUpdateTime(record, config.key)
    },
    {
      index: 'knowMore',
      title: 'Info',
      renderCell: (record) => renderKnowMore(record.id, record.name, knowMore)
    }
  ]
);

export const ecCurrencyMainTableRecord = [
  {
    id: 1,
    name: "Company 1",
    address: "some address",
    buyPrice: "123",
    sellPrice: "123",
    updatedAt: "2018-07-08T14:55:28Z"
  },
  {
    id: 2,
    name: "Company 2",
    buyPrice: "123",
    sellPrice: "123",
    updatedAt: "2018-07-08T14:55:28Z"
  },
  {
    id: 3,
    name: "Company 3",
    buyPrice: "123",
    sellPrice: "123",
    updatedAt: "2018-07-08T14:55:28Z"
  },
  {
    id: 4,
    name: "Company 4",
    buyPrice: "123",
    sellPrice: "123",
    updatedAt: "2018-07-08T14:55:28Z"
  }
];

