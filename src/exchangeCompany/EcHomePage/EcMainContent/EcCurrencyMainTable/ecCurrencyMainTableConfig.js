import {
  renderBuyTitle, renderCompanyName,
  renderLastUpdateTime, renderPrice,
  renderSellTitle, renderSumPrice, renderTitle
} from "./ecCurrencyMainTableRender";

export const ecCurrencyMainTableConfig = (
  isBuy,
  sumAmount,
  selectedCurrency,
  sortRowsByName = () => {},
  sortRowsByPrice = () => {},
  onNameClick,
  translate
) => (
  isBuy
    ? ecCurrencyMainTableBuyConfig(
      sumAmount, selectedCurrency, sortRowsByName, sortRowsByPrice, onNameClick, translate)
    : ecCurrencyMainTableSumConfig(
      sumAmount, selectedCurrency, sortRowsByName, sortRowsByPrice, onNameClick, translate)
);

const ecCurrencyMainTableBuyConfig = (
  sumAmount,
  selectedCurrency,
  sortRowsByName,
  sortRowsByPrice,
  onNameClick,
  translate
) => (
  [
    {
      index: 'company_name',
      key: 'company_name',
      title: translate("companies.gridBranchName"),
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByName),
      renderCell: (record) => renderCompanyName(record, onNameClick)
    },
    {
      index: 'buy_price',
      key: 'buy_price',
      title: translate("companies.buy"),
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByPrice),
      renderCell: (record) => {
        const price = record.buy_price ? record.buy_price.toFixed(2) : 0;
        const trend = record.buy_trend ? record.buy_trend.toFixed(2) : 0;

        return renderPrice(price, record.currencyMark, trend);
      }
    },
    {
      index: 'buyPriceSum',
      key: 'buyPriceSum',
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderBuyTitle(sumAmount, config, translate),
      renderCell: (record) => renderSumPrice(record.buy_price, sumAmount, record.currencyMark)
    },
    {
      index: 'updated_at',
      key: 'updated_at',
      title: translate("companies.lastUpdate"),
      renderCell: (record, config) => renderLastUpdateTime(record, config.key)
    }
  ]
);

const ecCurrencyMainTableSumConfig = (
  sumAmount,
  selectedCurrency,
  sortRowsByName,
  sortRowsByPrice,
  onNameClick,
  translate
) => (
  [
    {
      index: 'company_name',
      key: 'company_name',
      title: translate("companies.gridBranchName"),
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByName),
      renderCell: (record) => renderCompanyName(record, onNameClick)
    },
    {
      index: 'sell_price',
      key: 'sell_price',
      title: translate("companies.sell"),
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderTitle(record, config, sortRowsByPrice),
      renderCell: (record) => {
        const price = record.sell_price ? record.sell_price.toFixed(2) : 0;
        const trend = record.sell_trend ? record.sell_trend.toFixed(2) : 0;

        return renderPrice(price, record.currencyMark, trend);
      }
    },
    {
      index: 'sellPriceSum',
      key: 'sellPriceSum',
      subTitle: `(${selectedCurrency})`,
      renderTitle: (record, config) => renderSellTitle(sumAmount, config, translate),
      renderCell: (record) => renderSumPrice(record.sell_price, sumAmount, record.currencyMark)
    },
    {
      index: 'updated_at',
      key: 'updated_at',
      title: translate("companies.lastUpdate"),
      renderCell: (record, config) => renderLastUpdateTime(record, config.key)
    }
  ]
);
