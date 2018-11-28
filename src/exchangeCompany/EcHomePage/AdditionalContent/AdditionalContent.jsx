import React from 'react';

import BlockWrapper from "../../../common/BlockWrapper/BlockWrapper";
import EcMainMap from "./EcMainMap/EcMainMap";

import './additionalContent.less';
import CentralBankChart from "./CentralBankChart/CentralBankChart";

export default class AdditionalContent extends React.PureComponent {
  render() {
    const {
      dispatch,
      filteredCurrencies,
      isBuyStatus,
      selectedRowRecord
    } = this.props;

    return (
      <div className="additionalContent">
        <BlockWrapper>
          <EcMainMap
            records={filteredCurrencies}
            isBuyStatus={isBuyStatus}
            selectedRowRecord={selectedRowRecord}
          />
        </BlockWrapper>
        <BlockWrapper>
          <CentralBankChart
            dispatch={dispatch}
          />
        </BlockWrapper>
      </div>
    );
  }
}