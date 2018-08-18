import React from 'react';
import {currencyType} from "../currencyType";

import './CurrencyFlag.less';

export default function CurrencyFlag({currencyRate, handleFlagOnClick}) {
  const currenciesByType = currencyType.map((currency, index) => {
    const isCurrencyExist = currencyRate.some(c => {
      return c.currencyType === currency.currencyType;
    });
    const flagOnClick = () => {handleFlagOnClick({
      currencyType: currency.currencyType,
      currencyName: currency.currencyName
    });};

    return (
      <div
        key={index}
        className={`currencyHeaderFlag__item currencyHeaderFlag__item_active--${isCurrencyExist}`}
        onClick={flagOnClick}
      >
        <img
          src={currency.flagImg}
          alt={currency.currencyName}
        />
      </div>
    );
  });

  return (
    <div className="currencyHeaderFlag">
      {currenciesByType}
    </div>
  );
}
