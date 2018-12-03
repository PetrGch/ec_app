import React from 'react';

import {sizeType} from '../../../../../common/controlLib/util';
import {Dropdown, Radio} from '../../../../../common/controlLib';
import {setActiveCurrency, setBuyStatus} from "../../../../../action/companies";

import './ecCalculatorNavigation.less';

export default class EcCalculatorNavigation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.selectedCurrency = this.selectedCurrency.bind(this);
  }

  selectedCurrency(selectedCurrency) {
    const { dispatch } = this.props;
    dispatch(setActiveCurrency(selectedCurrency.index));
  }

  get currencyList() {
    const { currencyTypes } = this.props;
    return currencyTypes ? currencyTypes.map((currency) => ({
        index: currency.index,
        value: (
          <div className="ecCalculatorNavigation__currencyItem">
            <span className={`currency-flag currency-flag-${currency.index.toLowerCase()}`}/>
            <span>{currency.value}</span>
          </div>
        )
      })
    ) : [];
  }

  render() {
    const { dispatch, isBuyStatus, selectedCurrency, translate } = this.props;
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
          >{translate('companies.buy')}</Radio>
          <Radio
            value="sell"
            size={sizeType.LG}
            checked={!isBuyStatus}
            name={'sellBuy'}
            onChange={changeBuyStatus}
          >{translate('companies.sell')}</Radio>
        </div>
        <div className="ecCalculatorNavigation__currency">
          <Dropdown
            size={sizeType.LG}
            list={this.currencyList}
            selectedIndex={selectedCurrency}
            selectItem={this.selectedCurrency}
          />
        </div>
      </div>
    );
  }
}