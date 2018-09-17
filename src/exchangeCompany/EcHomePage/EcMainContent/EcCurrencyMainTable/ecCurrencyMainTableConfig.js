import {
  KnowMore,
  renderBuyPrice,
  renderBuyTitle, renderCompanyName, renderKnowMore,
  renderLastUpdateTime,
  renderSellPrice,
  renderSellTitle, renderTitle
} from "./ecCurrencyMainTableRender";

export const ecCurrencyMainTableConfig = (
  isBuy, sumAmount, knowMore = () => {}, sortRowsByName = () => {}, sortRowsByPrice = () => {}
  ) => (
  isBuy
    ? ecCurrencyMainTableBuyConfig(sumAmount, knowMore, sortRowsByName, sortRowsByPrice)
    : ecCurrencyMainTableSumConfig(sumAmount, knowMore, sortRowsByName, sortRowsByPrice)
);

const ecCurrencyMainTableBuyConfig = (sumAmount, knowMore, sortRowsByName, sortRowsByPrice) => (
  [
    {
      index: 'name',
      key: 'name',
      title: 'Currency',
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByName),
      renderCell: renderCompanyName
    },
    {
      index: 'buyPrice',
      key: 'buyPrice',
      title: 'Buy',
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByPrice)
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

const ecCurrencyMainTableSumConfig = (sumAmount, knowMore, sortRowsByName, sortRowsByPrice) => (
  [
    {
      index: 'name',
      key: 'name',
      title: 'Currency',
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByName),
    },
    {
      index: 'sellPrice',
      key: 'sellPrice',
      title: 'Sell',
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByPrice)
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
    buyPrice: "2.02",
    sellPrice: "4.02",
    updatedAt: "2018-07-08T14:55:28Z",
    rating: 2.5,
    coordinateX: null,
    coordinateY: null
  },
  {
    id: 2,
    name: "Company 2",
    buyPrice: "12",
    sellPrice: "12",
    updatedAt: "2018-07-08T14:55:28Z",
    rating: 2,
    coordinateX: "50.093652",
    coordinateY: "19.985859"
  },
  {
    id: 3,
    name: "Company 3",
    buyPrice: "11",
    sellPrice: "1200",
    updatedAt: "2018-07-08T14:55:28Z",
    rating: 3,
    address: "somewhere there",
    coordinateX: "50.094031",
    coordinateY: "19.983692",
    phone: "234234234",
    website: "somesomesomesomesomesome.com",
    workingTime: {
      "mnFrom": "22:00",
      "tuFrom": "22:00",
      "weFrom": "22:00",
      "thFrom": "22:00",
      "frFrom": "22:00",
      "stFrom": "22:00",
      "snFrom": null,
      "mnTo": "22:15",
      "tuTo": "22:15",
      "weTo": "22:15",
      "thTo": "22:15",
      "frTo": "22:15",
      "stTo": "22:30",
      "snTo": "22:30"
    }
  },
  {
    id: 4,
    name: "Company 4",
    buyPrice: "1232",
    sellPrice: "12.32",
    updatedAt: "2018-07-08T14:55:28Z",
    rating: 1.5
  }
];
