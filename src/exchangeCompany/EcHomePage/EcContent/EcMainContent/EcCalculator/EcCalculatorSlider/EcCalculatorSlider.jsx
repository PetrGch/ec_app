import React from 'react';

import {Slider} from "antd";
import {InputValidator, Input} from "../../../../../../common/controlLib";
import {cashFormatter, cashReformatter} from "../../../../../../common/util/formatter/formatter";
import {sizeType} from "../../../../../../common/controlLib/util";

import './ecCalculatorSlider.less';

export default class EcCalculatorSlider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: 1
    };

    this.changeSliderValueHandler = this.changeSliderValueHandler.bind(this);
    this.changeInputValueHandler = this.changeInputValueHandler.bind(this);
  }

  changeSliderValueHandler(value) {
    this.setState({sliderValue: cashReformatter(value)});
  }

  changeInputValueHandler(name, value) {
    this.changeSliderValueHandler(value);
  }

  render() {
    const { sliderValue } = this.state;

    return (
      <div className="ecCalculatorSlider">
        <div className="ecCalculatorSlider__input">
          <InputValidator
            InputComponent={Input}
            type="text"
            value={sliderValue}
            placeholder="1000"
            validationOption={{length: 7, isNumeric: true}}
            formatter={cashFormatter}
            onChange={this.changeInputValueHandler}
            size={sizeType.LG}
          />
        </div>
        <div className="ecCalculatorSlider__slider">
          <Slider
            min={0}
            max={1000}
            step={10}
            onChange={this.changeSliderValueHandler}
            value={sliderValue}
          />
        </div>
      </div>
    );
  }
}