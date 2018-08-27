import React from 'react';

import BlockWrapper from '../../../../common/BlockWrapper/BlockWrapper';

import './ecMainContent.less';
import EcCalculator from './EcCalculator/EcCalculator';
import EcCurrencyMainTable from "./EcCurrencyMainTable/EcCurrencyMainTable";

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
            currencyAmount={currencyAmount}
            isBuyStatus={isBuyStatus}
          />
        </BlockWrapper>
      </main>
    );
  }
}