import React from 'react';

import BlockWrapper from '../../../../common/BlockWrapper/BlockWrapper';
import EcCalculator from './EcCalculator/EcCalculator';
import EcCurrencyMainTable from "./EcCurrencyMainTable/EcCurrencyMainTable";
import {ecCurrencyMainTableRecord} from "./EcCurrencyMainTable/ecCurrencyMainTableConfig";

import './ecMainContent.less';

export default class EcMainContent extends React.PureComponent {
  render() {
    const { dispatch, currencyAmount, isBuyStatus } = this.props;

    return (
      <main className="ecMainContent">
        <BlockWrapper>
          <EcCalculator
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
            currencyAmount={currencyAmount}
          />
        </BlockWrapper>
        <BlockWrapper>
          <EcCurrencyMainTable
            records={ecCurrencyMainTableRecord}
            currencyAmount={currencyAmount}
            isBuyStatus={isBuyStatus}
          />
        </BlockWrapper>
      </main>
    );
  }
}