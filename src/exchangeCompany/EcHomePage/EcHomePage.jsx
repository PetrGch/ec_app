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
    const { loadAllCompanies } = this.props;
    loadAllCompanies();
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
      companies,
      filteredCurrencies,
      currencyAmount,
      isBuyStatus,
      currencyTypes,
      selectedCurrency,
    } = this.props;
    const { selectedRowRecord } = this.state;

    return (
      <div className="ecHomePage">
        <Helmet>
          <title>Compare foreign currency rates | ExCurRate</title>
        </Helmet>

        <div className="ecHomePage__content ecHomePage__content--position-one">
          <EcMainContent
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
            currencyAmount={currencyAmount}
            companies={companies}
            filteredCurrencies={filteredCurrencies}
            currencyTypes={currencyTypes}
            selectedCurrency={selectedCurrency}
            onNameClick={this.onNameClick}
          />
          <EcSideBar
            companies={companies}
            isBuyStatus={isBuyStatus}
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
          />
        </div>
      </div>
    );
  }
}