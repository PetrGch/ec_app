import React from 'react';

import BlockWrapper from '../../../common/BlockWrapper/BlockWrapper';
import EcCalculator from './EcCalculator/EcCalculator';
import EcCurrencyMainTable from "./EcCurrencyMainTable/EcCurrencyMainTable";

import './ecMainContent.less';

export default class EcMainContent extends React.PureComponent {
  render() {
    const {
      dispatch,
      currencyAmount,
      isBuyStatus,
      companies,
      filteredCurrencies,
      currencyTypes,
      selectedCurrency,
      onNameClick,
      isCompaniesLoading
    } = this.props;

    return (
      <main className="ecMainContent">
        <BlockWrapper isLoad={isCompaniesLoading}>
          <EcCalculator
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
            currencyAmount={currencyAmount}
            currencyTypes={currencyTypes}
            selectedCurrency={selectedCurrency}
          />
        </BlockWrapper>
        <BlockWrapper isLoad={isCompaniesLoading}>
          <EcCurrencyMainTable
            records={companies}
            filteredCurrencies={filteredCurrencies}
            currencyAmount={currencyAmount}
            isBuyStatus={isBuyStatus}
            selectedCurrency={selectedCurrency}
            onNameClick={onNameClick}
          />
        </BlockWrapper>
      </main>
    );
  }
}