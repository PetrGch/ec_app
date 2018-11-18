import React from 'react';

import BlockWrapper from '../../../common/BlockWrapper/BlockWrapper';
import EcCalculator from './EcCalculator/EcCalculator';
import EcCurrencyMainTable from "./EcCurrencyMainTable/EcCurrencyMainTable";
import EcMainMap from "./EcMainMap/EcMainMap";

import './ecMainContent.less';


export default class EcMainContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowRecord: null
    };

    this.mapRef = React.createRef();

    this.onNameClick = this.onNameClick.bind(this);
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
      currencyAmount,
      isBuyStatus,
      companies,
      filteredCurrencies,
      currencyTypes,
      selectedCurrency
    } = this.props;
    const { selectedRowRecord } = this.state;

    return (
      <main className="ecMainContent">
        <BlockWrapper>
          <EcCalculator
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
            currencyAmount={currencyAmount}
            currencyTypes={currencyTypes}
            selectedCurrency={selectedCurrency}
          />
        </BlockWrapper>
        <BlockWrapper>
          <EcCurrencyMainTable
            records={companies}
            filteredCurrencies={filteredCurrencies}
            currencyAmount={currencyAmount}
            isBuyStatus={isBuyStatus}
            selectedCurrency={selectedCurrency}
            onNameClick={this.onNameClick}
          />
        </BlockWrapper>
        <BlockWrapper>
          <div
            ref={this.mapRef}
          >
            <EcMainMap
              records={filteredCurrencies}
              isBuyStatus={isBuyStatus}
              selectedRowRecord={selectedRowRecord}
            />
          </div>
        </BlockWrapper>
      </main>
    );
  }
}