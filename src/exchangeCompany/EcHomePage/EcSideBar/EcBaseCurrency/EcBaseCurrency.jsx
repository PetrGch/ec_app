import React from 'react';

import Grid from "../../../../common/controlLib/Grid/Grid";
import {baseCurrency} from "./baseCurrencyGridConfig";
import BlockWrapper from "../../../../common/BlockWrapper/BlockWrapper";

import './ecBaseCurrency.less';

export default class EcBaseCurrency extends React.PureComponent {
  get centralBank() {
    const { centralBankEurUsd, translate } = this.props;

    if (centralBankEurUsd && centralBankEurUsd.length === 2
      && !isNaN(centralBankEurUsd[0].buy_price) && !isNaN(centralBankEurUsd[1].buy_price)) {
      try {
        return [{
          operation: translate("companies.buy"),
          [centralBankEurUsd[0].central_bank.currency_id]: (+centralBankEurUsd[0].buy_price).toFixed(2),
          [centralBankEurUsd[1].central_bank.currency_id]: (+centralBankEurUsd[1].buy_price).toFixed(2)
        }, {
          operation: translate("companies.sell"),
          [centralBankEurUsd[0].central_bank.currency_id]: (+centralBankEurUsd[0].sell_price).toFixed(2),
          [centralBankEurUsd[1].central_bank.currency_id]: (+centralBankEurUsd[1].sell_price).toFixed(2)
        }]
      } catch (ex) {
        console.error(ex);
      }
    }

    return null;
  }

  render() {
    const { isLoading, translate } = this.props;
    const centralBank = this.centralBank;

    return centralBank ? (
      <BlockWrapper isLoad={isLoading}>
        <div className="ecBaseCurrency">
          <h3 className="ecBaseCurrency__title">{translate("companies.centralBankTitle")}</h3>
          <Grid
            isHeader
            records={centralBank}
            config={baseCurrency}
          />
        </div>
      </BlockWrapper>
    ) : null;
  }
}