import React from 'react';

import {ecCurrencyMainTableConfig, ecCurrencyMainTableRecord} from "./ecCurrencyMainTableConfig";
import {Grid} from "../../../../../common/controlLib";

import './ecCurrencyMainTable.less';
import {sizeType} from "../../../../../common/controlLib/util";

export default class EcCurrencyMainTable extends React.PureComponent {
  render() {
    const { isBuyStatus, currencyAmount } = this.props;

    return (
      <div className="ecCurrencyMainTable">
        <Grid
          isHeader
          stripe
          // size={sizeType.LG}
          records={ecCurrencyMainTableRecord}
          config={ecCurrencyMainTableConfig(isBuyStatus, currencyAmount)}
        />
      </div>
    );
  }
}