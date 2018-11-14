import React from 'react';

import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';

import './ecHomePage.less';

export default class EcHomePage extends React.PureComponent {
  componentDidMount() {
    const { loadAllCompanies } = this.props;
    loadAllCompanies();
  }

  render() {
    const {
      dispatch,
      companies,
      filteredCurrencies,
      currencyAmount,
      isBuyStatus,
      currencyTypes,
      selectedCurrency,
    } = this.props;

    return (
      <div className="ecHomePage">
        <EcMainContent
          dispatch={dispatch}
          isBuyStatus={isBuyStatus}
          currencyAmount={currencyAmount}
          companies={companies}
          filteredCurrencies={filteredCurrencies}
          currencyTypes={currencyTypes}
          selectedCurrency={selectedCurrency}
        />
        <EcSideBar
          companies={companies}
          isBuyStatus={isBuyStatus}
        />
      </div>
    );
  }
}