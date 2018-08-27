import React from 'react';

import EcCalculatorNavigation from './EcCalculatorNavigation/EcCalculatorNavigation';
import EcCalculatorSlider from "./EcCalculatorSlider/EcCalculatorSlider";

import './ecCalculator.less';


export default class EcCalculator extends React.PureComponent {
  render() {
    const { dispatch, currencyAmount, isBuyStatus } = this.props;

    return (
      <div className="ecCalculator">
        <h1 className="ecCalculator__title">
          Currency exchange rate
        </h1>
        <div className="ecCalculator__content">
          <EcCalculatorNavigation
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
          />
          <EcCalculatorSlider
            dispatch={dispatch}
            currencyAmount={currencyAmount}
          />
        </div>
      </div>
    );
  }
}