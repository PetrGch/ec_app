import React from 'react';

import EcCalculatorNavigation from "./EcCalculatorNavigation/EcCalculatorNavigation";

import './ecCalculator.less';


export default class EcCalculator extends React.PureComponent {
  render() {
    return (
      <div className="ecCalculator">
        <EcCalculatorNavigation/>
      </div>
    );
  }
}