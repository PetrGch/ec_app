import React from 'react';

import {sizeType} from '../../../../../common/controlLib/util';
import {Dropdown, Radio} from '../../../../../common/controlLib';

import './ecCalculatorNavigation.less';
import {setActiveCurrency, setBuyStatus} from "../../../../../action/companies";

export default class EcCalculatorNavigation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.selectedCurrency = this.selectedCurrency.bind(this);
  }

  selectedCurrency(selectedCurrency) {
    const { dispatch } = this.props;
    dispatch(setActiveCurrency(selectedCurrency.value));
  }

  render() {
    const { dispatch, isBuyStatus, currencyTypes, selectedCurrency } = this.props;
    const changeBuyStatus = (event) => {
      if (event.target && event.target.value === "sell") {
        dispatch(setBuyStatus(false));
      } else if (event.target && event.target.value === "buy") {
        dispatch(setBuyStatus(true));
      }
    };

    return (
      <div className="ecCalculatorNavigation">
        <div className="ecCalculatorNavigation__action">
          <Radio
            value="buy"
            size={sizeType.LG}
            checked={isBuyStatus}
            name={'sellBuy'}
            onChange={changeBuyStatus}
          >Buy</Radio>
          <Radio
            value="sell"
            size={sizeType.LG}
            checked={!isBuyStatus}
            name={'sellBuy'}
            onChange={changeBuyStatus}
          >Sell</Radio>
        </div>
        <div className="ecCalculatorNavigation__currency">
          <Dropdown
            size={sizeType.LG}
            list={currencyTypes}
            selectedIndex={selectedCurrency}
            selectItem={this.selectedCurrency}
          />
        </div>
      </div>
    );
  }
}