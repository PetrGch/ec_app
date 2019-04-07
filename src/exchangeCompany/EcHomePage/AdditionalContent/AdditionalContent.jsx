import React from 'react';
import {translate} from "react-i18next";

import BlockWrapper from "../../../common/BlockWrapper/BlockWrapper";
import EcMainMap from "./EcMainMap/EcMainMap";
import CentralBankChart from "./CentralBankChart/CentralBankChart";
import {loadDataOfCentralBank} from "../../../action/companies";
import CurrencyChangeTable from "./CurrencyChangeTable/CurrencyChangeTable";

import './additionalContent.less';

class AdditionalContent extends React.PureComponent {
  componentDidMount() {
    const { dispatch, selectedRange } = this.props;
    dispatch(loadDataOfCentralBank("USD", selectedRange));
  }

  render() {
    const {
      dispatch,
      filteredCurrencies,
      isBuyStatus,
      selectedRowRecord,
      centralBank,
      selectedRange,
      isCentralBankLoading,
      isCompaniesLoading,
      lng,
      t
    } = this.props;

    return (
      <div className="additionalContent">
        <BlockWrapper isLoad={isCompaniesLoading}>
          <EcMainMap
            translate={t}
            records={filteredCurrencies}
            isBuyStatus={isBuyStatus}
            selectedRowRecord={selectedRowRecord}
          />
        </BlockWrapper>
        {
          centralBank && centralBank.central_bank_details && (
            <BlockWrapper isLoad={isCentralBankLoading}>
              <CentralBankChart
                dispatch={dispatch}
                centralBank={centralBank}
                selectedRange={selectedRange}
                lng={lng}
              />
            </BlockWrapper>
          )
        }
        <BlockWrapper isLoad={isCentralBankLoading}>
          <CurrencyChangeTable
            translate={t}
            selectedRange={selectedRange}
            centralBank={centralBank}
          />
        </BlockWrapper>
      </div>
    );
  }
}

export default translate('common')(AdditionalContent)