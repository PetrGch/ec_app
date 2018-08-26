import React from 'react';
import {Icon, Button, Row, Col} from 'antd';

import CurrencyFlag from './currencyFlag/CurrencyFlag';
import CurrencyContent from './currencyContent/CurrencyContent';

import './currencyRate.less';
import {
  changeCurrencyValue, selectUnselectCurrency, setInitialCurrencyState
} from '../../../../action/currencyRate';

export default class CurrencyRate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleFlagOnClick = this.handleFlagOnClick.bind(this);
    this.handleValueOnChange = this.handleValueOnChange.bind(this);
  }

  handleFlagOnClick(currency) {
    const { dispatch, companyId } = this.props;

    dispatch(selectUnselectCurrency(companyId, currency));
  }

  handleValueOnChange(currencyType, fieldName, value) {
    const { dispatch, companyId } = this.props;
    dispatch(changeCurrencyValue(companyId, currencyType, fieldName, value));
  }

  render() {
    const { currencyRate } = this.props;

    return (
      <div>
        <div className="currencyRate__title">
          <h2>Currency</h2>
        </div>
        <div className="currencyRate__form currencyForm">
          <div className="currencyForm__header">
            <CurrencyFlag
              handleFlagOnClick={this.handleFlagOnClick}
              currencyRate={currencyRate}
            />
          </div>
          <div className="currencyForm__content">
            <CurrencyContent
              currencyRate={currencyRate}
              handleValueOnChange={this.handleValueOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}