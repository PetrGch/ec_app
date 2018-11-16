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
      hoveredRowRecord: null
    };

    this.onRowHover = this.onRowHover.bind(this);
  }

  onRowHover(record) {
    const { hoveredRowRecord } = this.state;
    if (!hoveredRowRecord || hoveredRowRecord.id !== record.id) {
      this.setState({ hoveredRowRecord: record });
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
    const { hoveredRowRecord } = this.state;

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
            onRowHover={this.onRowHover}
          />
        </BlockWrapper>
        <BlockWrapper>
          <EcMainMap
            records={filteredCurrencies}
            isBuyStatus={isBuyStatus}
            hoveredRowRecord={hoveredRowRecord}
          />
        </BlockWrapper>
      </main>
    );
  }
}