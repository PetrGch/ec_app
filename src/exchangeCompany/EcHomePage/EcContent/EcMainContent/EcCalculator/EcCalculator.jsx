import React from 'react';

import EcCalculatorNavigation from './EcCalculatorNavigation/EcCalculatorNavigation';
import EcCalculatorSlider from "./EcCalculatorSlider/EcCalculatorSlider";

import './ecCalculator.less';


export default class EcCalculator extends React.PureComponent {
  render() {
    return (
      <div className="ecCalculator">
        <h1 className="ecCalculator__title">
          Currency exchange rate
        </h1>
        <div className="ecCalculator__content">
          <EcCalculatorNavigation/>
          <EcCalculatorSlider/>
        </div>
      </div>
    );
  }
}