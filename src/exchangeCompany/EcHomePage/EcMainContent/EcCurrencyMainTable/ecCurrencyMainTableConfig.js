import {
  KnowMore,
  renderBuyPrice,
  renderBuyTitle, renderCompanyName, renderKnowMore,
  renderLastUpdateTime,
  renderSellPrice,
  renderSellTitle, renderTitle
} from "./ecCurrencyMainTableRender";

export const ecCurrencyMainTableConfig = (
  isBuy,
  sumAmount,
  selectedCurrency,
  knowMore = () => {},
  sortRowsByName = () => {},
  sortRowsByPrice = () => {},
  translate
) => (
  isBuy
    ? ecCurrencyMainTableBuyConfig(sumAmount, knowMore, selectedCurrency, sortRowsByName, sortRowsByPrice, translate)
    : ecCurrencyMainTableSumConfig(sumAmount, knowMore, selectedCurrency, sortRowsByName, sortRowsByPrice, translate)
);

const ecCurrencyMainTableBuyConfig = (
  sumAmount,
  knowMore,
  selectedCurrency,
  sortRowsByName,
  sortRowsByPrice,
  translate
) => (
  [
    {
      index: 'company_name',
      key: 'company_name',
      title: translate("companies.gridBranchName"),
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByName),
      renderCell: renderCompanyName
    },
    {
      index: 'buy_price',
      key: 'buy_price',
      title: translate("companies.buy"),
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByPrice),
      renderCell: (record) => record.buy_price ? record.buy_price.toFixed(2) : record.buy_price
    },
    {
      index: 'buyPriceSum',
      key: 'buyPriceSum',
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderBuyTitle(sumAmount, config, translate),
      renderCell: (record) => renderBuyPrice(record.buy_price, sumAmount)
    },
    {
      index: 'updated_at',
      key: 'updated_at',
      title: translate("companies.lastUpdate"),
      renderCell: (record, config) => renderLastUpdateTime(record, config.key)
    },
    {
      index: 'knowMore',
      title: translate("companies.info"),
      renderCell: (record) => renderKnowMore(record.id, record.branch_name, knowMore, translate)
    }
  ]
);

const ecCurrencyMainTableSumConfig = (
  sumAmount,
  knowMore,
  selectedCurrency,
  sortRowsByName,
  sortRowsByPrice,
  translate
) => (
  [
    {
      index: 'company_name',
      key: 'company_name',
      title: translate("companies.gridBranchName"),
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByName),
      renderCell: renderCompanyName
    },
    {
      index: 'sell_price',
      key: 'sell_price',
      title: translate("companies.sell"),
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByPrice),
      renderCell: (record) => record.sell_price ? record.sell_price.toFixed(2) : record.sell_price
    },
    {
      index: 'sellPriceSum',
      key: 'sellPriceSum',
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderSellTitle(sumAmount, config, translate),
      renderCell: (record) => renderSellPrice(record.sell_price, sumAmount)
    },
    {
      index: 'updated_at',
      key: 'updated_at',
      title: translate("companies.lastUpdate"),
      renderCell: (record, config) => renderLastUpdateTime(record, config.key)
    },
    {
      index: 'knowMore',
      title: translate("companies.info"),
      renderCell: (record) => renderKnowMore(record.id, record.branch_name, knowMore, translate)
    }
  ]
);
