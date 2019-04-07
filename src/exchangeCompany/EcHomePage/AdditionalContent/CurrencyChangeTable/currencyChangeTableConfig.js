import React from "react";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function renderPrice(value) {
  if (value < 0) {
    return (<span className="currencyChangeTable__price currencyChangeTable__price--trend-down">
      {value}
      <FaArrowDown/>
    </span>);
  } else if (value > 0) {
    return (<span className="currencyChangeTable__price currencyChangeTable__price--trend-up">
      {value}
      <FaArrowUp/>
    </span>);
  }

  return <span className="currencyChangeTable__price currencyChangeTable__price--trend-none">-</span>
}

export function currencyChangeTableConfig(translate) {
  return [
    {
      index: "period",
      key: "period",
      title: translate("companies.currencyChangesPeriod")
    },
    {
      index: "buyPriceChange",
      key: "buyPriceChange",
      title: translate("companies.currencyChangesBuyPrice"),
      renderCell: (record, config) => renderPrice(record[config.key])
    },
    {
      index: "sellPriceChange",
      key: "sellPriceChange",
      title: translate("companies.currencyChangesSellPrice"),
      renderCell: (record, config) => renderPrice(record[config.key])
    }
  ]
}
