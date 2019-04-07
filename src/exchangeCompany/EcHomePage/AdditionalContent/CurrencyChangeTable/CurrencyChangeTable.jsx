import React from "react";
import moment from "moment";

import Grid from "../../../../common/controlLib/Grid/Grid";
import {currencyChangeTableConfig} from "./currencyChangeTableConfig";

import "./currencyChangeTable.less";

function calculatePriceDifferences(currentPrice, previousPrice) {
  return (previousPrice - currentPrice).toFixed(5);
}

export default class CurrencyChangeTable extends React.PureComponent {
  get centralBankRecords() {
    const { centralBank } = this.props;

    if (centralBank && centralBank.central_bank_details) {
      return centralBank.central_bank_details.map((price, index) => {
        const buyPriceChange = index !== 0
          ? calculatePriceDifferences(price.buy_price, centralBank.central_bank_details[index - 1].buy_price) : "-";
        const sellPriceChange = index !== 0
          ? calculatePriceDifferences(price.sell_price, centralBank.central_bank_details[index - 1].sell_price) : "-";

        return {
          buyPriceChange,
          sellPriceChange,
          period: moment(price.period).format('L')
        }
      })
    }

    return null;
  }
  render() {
    const { selectedRange, centralBank, translate } = this.props;
    const centralBankRecords = this.centralBankRecords;

    return centralBankRecords && (
      <div className="currencyChangeTable">
        <div className="currencyChangeTable__header">
          <h2>{translate('companies.currencyChangesTitle')}</h2>
          <h3>
            {translate('companies.currencyChangesSubTitle', {
              currencyType: centralBank.currency_id,
              period: selectedRange
            })}
          </h3>
        </div>

        <div className="currencyChangeTable__table">
          <Grid
            isHeader
            stripe
            records={centralBankRecords}
            config={currencyChangeTableConfig(translate)}
          />
        </div>
      </div>
    );
  }
}