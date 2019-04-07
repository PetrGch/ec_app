import React from 'react';
import {Helmet} from "react-helmet";

import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';
import AdditionalContent from "./AdditionalContent/AdditionalContent";

import './ecHomePage.less';

export default class EcHomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowRecord: null
    };

    this.mapRef = React.createRef();

    this.onNameClick = this.onNameClick.bind(this);
  }

  componentDidMount() {
    const { loadAllCompaniesByCurrencyType, loadAllCurrencyTypes, loadCentralBankEurUsdData } = this.props;
    loadAllCompaniesByCurrencyType("EUR");
    loadCentralBankEurUsdData();
    loadAllCurrencyTypes();
  }

  onNameClick(record) {
    const { selectedRowRecord } = this.state;
    if (!selectedRowRecord || selectedRowRecord.id !== record.id) {
      this.setState({ selectedRowRecord: record });
      if (window && this.mapRef && this.mapRef.current) {
        window.scrollTo({
          top: this.mapRef.current.offsetTop,
          behavior: "smooth"
        });
      }
    }
  }

  render() {
    const {
      dispatch,
      filteredCurrencies,
      currencyAmount,
      isBuyStatus,
      currencyTypes,
      selectedCurrency,
      centralBank,
      selectedRange,
      currencyMark,
      sortType,
      filteringNameValue,
      currentPage,
      amountOfPage,
      centralBankEurUsd,

      isCompaniesLoading,
      isCentralBankLoading,
      isCentralBankEurUsdLoading
    } = this.props;
    const { selectedRowRecord } = this.state;

    return (
      <div className="ecHomePage">
        <Helmet>
          <title>Compare foreign currency rates in Bangkok | ExCurRate</title>
        </Helmet>

        <div className="ecHomePage__content ecHomePage__content--position-one">
          <EcMainContent
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
            currencyAmount={currencyAmount}
            filteredCurrencies={filteredCurrencies}
            currencyTypes={currencyTypes}
            selectedCurrency={selectedCurrency}
            isCompaniesLoading={isCompaniesLoading}
            currencyMark={currencyMark}
            sortType={sortType}
            filteringNameValue={filteringNameValue}
            currentPage={currentPage}
            amountOfPage={amountOfPage}
            onNameClick={this.onNameClick}
          />
          <EcSideBar
            centralBankEurUsd={centralBankEurUsd}
            isBuyStatus={isBuyStatus}
            isLoading={isCentralBankEurUsdLoading}
          />
        </div>

        <div
          ref={this.mapRef}
          className="ecHomePage__content ecHomePage__content--position-two"
        >
          <AdditionalContent
            dispatch={dispatch}
            filteredCurrencies={filteredCurrencies}
            isBuyStatus={isBuyStatus}
            selectedRowRecord={selectedRowRecord}
            centralBank={centralBank}
            selectedRange={selectedRange}
            isCentralBankLoading={isCentralBankLoading}
            isCompaniesLoading={isCompaniesLoading}
          />
        </div>
      </div>
    );
  }
}