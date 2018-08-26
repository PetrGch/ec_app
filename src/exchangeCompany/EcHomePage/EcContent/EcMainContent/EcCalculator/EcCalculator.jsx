import React from 'react';

import EcCalculatorNavigation from './EcCalculatorNavigation/EcCalculatorNavigation';
import EcCalculatorSlider from "./EcCalculatorSlider/EcCalculatorSlider";

import './ecCalculator.less';


export default class EcCalculator extends React.PureComponent {
  render() {
    const { isBuyStatus, changeBuyStatus } = this.props;

    return (
      <div className="ecCalculator">
        <h1 className="ecCalculator__title">
          Currency exchange rate
        </h1>
        <div className="ecCalculator__content">
          <EcCalculatorNavigation
            isBuyStatus={isBuyStatus}
            changeBuyStatus={changeBuyStatus}
          />
          <EcCalculatorSlider/>
        </div>
      </div>
    );
  }
}