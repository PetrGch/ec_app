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
      filteredCurrencies,
      currencyTypes,
      selectedCurrency,
      onNameClick,
      isCompaniesLoading,
      currencyMark,
      sortType,
      filteringNameValue,
      currentPage,
      amountOfPage
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
            currencyMark={currencyMark}
          />
        </BlockWrapper>
        <BlockWrapper isLoad={isCompaniesLoading}>
          <EcCurrencyMainTable
            dispatch={dispatch}
            records={filteredCurrencies}
            currencyAmount={currencyAmount}
            isBuyStatus={isBuyStatus}
            selectedCurrency={selectedCurrency}
            onNameClick={onNameClick}
            currencyMark={currencyMark}
            sortType={sortType}
            filteringNameValue={filteringNameValue}
            currentPage={currentPage}
            amountOfPage={amountOfPage}
          />
        </BlockWrapper>
      </main>
    );
  }
}