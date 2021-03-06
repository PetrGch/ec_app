import React from 'react';
import {Slider} from "antd";

import {InputValidator, Input} from "../../../../../common/controlLib";
import {cashReformatter, numberFormatter} from "../../../../../common/util/formatter/formatter";
import {sizeType} from "../../../../../common/controlLib/util";
import {setSumAmount} from "../../../../../action/companies";

import './ecCalculatorSlider.less';

export default class EcCalculatorSlider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeSliderValueHandler = this.changeSliderValueHandler.bind(this);
    this.changeInputValueHandler = this.changeInputValueHandler.bind(this);
  }

  changeSliderValueHandler(value) {
    const { dispatch } = this.props;
    dispatch(setSumAmount(cashReformatter(value)));
  }

  changeInputValueHandler(event) {
    const { value } = event.target;
    this.changeSliderValueHandler(value);
  }

  render() {
    const { currencyAmount, currencyMark } = this.props;

    return (
      <div className="ecCalculatorSlider">
        <div className="ecCalculatorSlider__input">
          <InputValidator
            InputComponent={Input}
            type="text"
            value={currencyAmount}
            placeholder="1000"
            validationOption={{length: 7, isNumeric: true}}
            formatter={numberFormatter}
            onChange={this.changeInputValueHandler}
            size={sizeType.LG}
          />
          <span>{currencyMark}</span>
        </div>
        <div className="ecCalculatorSlider__slider">
          <Slider
            min={0}
            max={1000}
            step={10}
            onChange={this.changeSliderValueHandler}
            value={currencyAmount}
          />
        </div>
      </div>
    );
  }
}