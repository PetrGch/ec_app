import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

import {nullValidator} from "../../../../common/util/valueValidator";
import ExpandCollapseWrapper from "../ExpandCollapseWrapper/ExpandCollapseWrapper";
import {sizeType} from "../../../../common/controlLib/util";
import {Input, InputValidator, Radio} from "../../../../common/controlLib";
import {setBuyStatus} from "../../../../action/company";
import {cashFormatter, cashReformatter} from "../../../../common/util/formatter/formatter";
import {calculateFinalResultValue, calculateSumValue} from "./prepopulateMainCompanyCalculateValue";

import './ecMainCompanyCalculate.less';

export default class EcMainCompanyCalculate extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { company, isBuyStatus } = nextProps;
    const sum = prevState.sum;
    const finalResult = Math.round(parseInt(calculateFinalResultValue(sum, company, isBuyStatus)));

    if (finalResult !== prevState.finalResult) {
      return {finalResult}
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      sum: 1,
      finalResult: ''
    };

    this.changeBuyStatus = this.changeBuyStatus.bind(this);
    this.changeSumAmount = this.changeSumAmount.bind(this);
    this.blurSumAmount = this.blurSumAmount.bind(this);
    this.changeFinalResultAmount = this.changeFinalResultAmount.bind(this);
    this.blurFinalResultAmount = this.blurFinalResultAmount.bind(this);
  }

  changeBuyStatus(event) {
    const { value } = event.target;
    const { dispatch } = this.props;
    if (value === "sell") {
      dispatch(setBuyStatus(false));
    } else if (value === "buy") {
      dispatch(setBuyStatus(true));
    }
  }

  blurSumAmount(event) {
    const { value } = event.target;
    if (value !== '' && !isNaN(value)) {
      const roundedValue = Math.round(parseInt(value));
      this.setState({sum: cashReformatter(roundedValue)});
    } else {
      this.setState({sum: value});
    }
  }

  changeSumAmount(event) {
    const { value } = event.target;
    const { company, isBuyStatus } = this.props;
    const finalResult = Math.round(parseInt(calculateFinalResultValue(value, company, isBuyStatus)));

    this.setState({
      sum: value,
      finalResult
    });
  }

  blurFinalResultAmount(event) {
    const { value } = event.target;
    if (value !== '' && !isNaN(value)) {
      const roundedValue = Math.round(parseInt(value));
      this.setState({finalResult: cashReformatter(roundedValue)});
    } else {
      this.setState({finalResult: value});
    }
  }

  changeFinalResultAmount(event) {
    const { value } = event.target;
    const { company, isBuyStatus } = this.props;
    const sum = Math.round(parseInt(calculateSumValue(value, company, isBuyStatus)));

    this.setState({
      finalResult: value,
      sum
    });
  }

  get finalResultValue() {
    const { finalResult } = this.state;
    return finalResult
  }

  get sumValue() {
    const { sum } = this.state;
    return sum
  }

  get buyPrice() {
    const { company } = this.props;
    return nullValidator(company, 'buyPrice');
  }

  get sellPrice() {
    const { company } = this.props;
    return nullValidator(company, 'sellPrice');
  }

  render() {
    const { isBuyStatus } = this.props;

    return (
      <div className="ecMainCompanyCalculate">
        <div className="ecMainCompanyCalculate__price">
          <span>Buy: {this.buyPrice}</span>
          <span>Sell: {this.sellPrice}</span>
        </div>
        <div className="ecMainCompanyCalculate__calculator ecMainCompanyCalculator">
          <ExpandCollapseWrapper name="Calculator" isExpand>
            <div className="ecMainCompanyCalculator__action">
              <Radio
                value="buy"
                size={sizeType.LG}
                checked={isBuyStatus}
                name={'sellBuy'}
                onChange={this.changeBuyStatus}
              >Buy</Radio>
              <Radio
                value="sell"
                size={sizeType.LG}
                checked={!isBuyStatus}
                name={'sellBuy'}
                onChange={this.changeBuyStatus}
              >Sell</Radio>
            </div>
            <div className="ecMainCompanyCalculator__inputs ecMainCompanyCalculatorInputs">
              <div className="ecMainCompanyCalculatorInputs__amount">
                <span>Amount</span>
                <InputValidator
                  InputComponent={Input}
                  type="text"
                  value={this.sumValue}
                  validationOption={{isNumeric: true}}
                  formatter={cashFormatter}
                  size={sizeType.LG}
                  onChange={this.changeSumAmount}
                  onBlur={this.blurSumAmount}
                />
              </div>
              <span className="ecMainCompanyCalculatorInputs__icon">
                <FaExchangeAlt/>
              </span>
              <div className="ecMainCompanyCalculatorInputs__finalPrice">
                <span>Final price</span>
                <InputValidator
                  InputComponent={Input}
                  type="text"
                  value={this.finalResultValue}
                  validationOption={{isNumeric: true}}
                  formatter={cashFormatter}
                  size={sizeType.LG}
                  onChange={this.changeFinalResultAmount}
                  onBlur={this.blurFinalResultAmount}
                />
              </div>
            </div>
          </ExpandCollapseWrapper>
        </div>
      </div>
    );
  }
}