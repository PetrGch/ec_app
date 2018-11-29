import React from 'react';

import {sizeType} from "../../../../../common/controlLib/util";
import {Dropdown} from "../../../../../common/controlLib";
import {loadDataOfCentralBank} from "../../../../../action/companies";

import './centralBankChartHeader.less';

const rangeTypeList = [
  {
    index: "7",
    value: "Week (7 days)"
  },
  {
    index: "30",
    value: "Month (30 days)"
  },
  {
    index: "all",
    value: "Year (365 days)"
  }
];

const currencyTypeList = [
  {
    index: "eur",
    value: "EUR"
  },
  {
    index: "usd",
    value: "USD"
  }
];

export default class CentralBankChartHeader extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      selectedCurrency: "eur"
    };

    this.selectRange = this.selectRange.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
  }

  selectRange(range) {
    const { index } = range;
    const { dispatch } = this.props;
    const { selectedCurrency } = this.state;

    dispatch(loadDataOfCentralBank(selectedCurrency, index));
  }

  selectCurrency(currency) {
    const { index } = currency;
    const { dispatch, selectedRange } = this.props;

    dispatch(loadDataOfCentralBank(index, selectedRange, () => {
      this.setState({ selectedCurrency: index });
    }));
  }

  get title() {
    const { lng, dataHeader } = this.props;
    return lng === "en" ? dataHeader.title_eng : dataHeader.title_th;
  }

  get subTitle() {
    const { lng, dataHeader } = this.props;
    return lng === "en" ? dataHeader.subtitle_eng : dataHeader.subtitle_th;
  }

  get source() {
    const { lng, dataHeader } = this.props;
    return lng === "en" ? dataHeader.source_of_data_eng : dataHeader.source_of_data_th;
  }

  get currencyName() {
    const { lng, dataHeader } = this.props;
    return lng === "en" ? dataHeader.currency_name_eng : dataHeader.currency_name_th;
  }

  render() {
    const { dataHeader, selectedRange } = this.props;
    const { selectedCurrency } = this.state;

    return (
      <div className="centralBankChartHeader">
        <div className="centralBankChartHeader__title">
          <h2>{this.source}</h2>
          <h3>{this.title}</h3>
          <h3>{this.subTitle}</h3>
          <div className="centralBankChartHeader__detail">
            <span><strong>{dataHeader.currency_id}</strong>{this.currencyName}</span>
          </div>
        </div>
        <div className="centralBankChartHeader__dropdown">
          <Dropdown
            size={sizeType.MD}
            list={rangeTypeList}
            selectedIndex={selectedRange}
            selectItem={this.selectRange}
          />

          <Dropdown
            size={sizeType.MD}
            list={currencyTypeList}
            selectedIndex={selectedCurrency}
            selectItem={this.selectCurrency}
          />
        </div>
      </div>
    );
  }
}