import React from 'react';
import {Helmet} from "react-helmet";

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
        <Helmet>
          <title>Compare foreign currency rates | ExCurRate</title>
        </Helmet>

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