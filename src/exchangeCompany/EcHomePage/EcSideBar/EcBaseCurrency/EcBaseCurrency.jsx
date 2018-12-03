import React from 'react';

import Grid from "../../../../common/controlLib/Grid/Grid";
import {baseCurrency} from "./baseCurrencyGridConfig";

import './ecBaseCurrency.less';
import {filterByCurrency} from "../../../../reducer/util";

export default class EcBaseCurrency extends React.PureComponent {
  get usdCurrency() {
    const { companies } = this.props;
    let usd = null;

    filterByCurrency(companies, "USD", 1).some(filteredCompanies => {
      if (filteredCompanies.is_central_bank) {
        usd = filteredCompanies;
        return true;
      }
      return false;
    });
    return usd;
  }

  get eurCurrency() {
    const { companies } = this.props;
    let eur = null;
    filterByCurrency(companies, "EUR", 1).some(filteredCompanies => {
      if (filteredCompanies.is_central_bank) {
        eur = filteredCompanies;
        return true;
      }
      return false;
    });
    return eur;
  }

  get centralBank() {
    const usd = this.usdCurrency;
    const eur = this.eurCurrency;

    if (usd && eur) {
      return [{
        company_name: "Buy",
        usd: usd.buy_price.toFixed(2),
        eur: eur.buy_price.toFixed(2)
      }, {
        company_name: "Sell",
        usd: usd.sell_price.toFixed(2),
        eur: eur.sell_price.toFixed(2)
      }]
    }
    return null;
  }

  render() {
    const centralBank = this.centralBank;
    const usd = this.usdCurrency;

    return centralBank ? (
      <div className="ecBaseCurrency">
        <h3 className="ecBaseCurrency__title">{usd.company_name}</h3>
        <Grid
          isHeader
          records={centralBank}
          config={baseCurrency}
        />
      </div>
    ) : null;
  }
}