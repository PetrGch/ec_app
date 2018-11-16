import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

import {nullValidator} from "../../../../common/util/valueValidator";
import ExpandCollapseWrapper from "../ExpandCollapseWrapper/ExpandCollapseWrapper";
import {sizeType} from "../../../../common/controlLib/util";
import {Dropdown, Input, InputValidator, Radio} from "../../../../common/controlLib";
import {setActiveCompanyCurrency, setBuyStatus} from "../../../../action/company";
import {cashFormatter, cashReformatter} from "../../../../common/util/formatter/formatter";
import {calculateFinalResultValue, calculateSumValue} from "./prepopulateMainCompanyCalculateValue";

import './ecMainCompanyCalculate.less';

export default class EcMainCompanyCalculate extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { filteredCurrency, isBuyStatus, selectedCurrency, selectedCompanyCurrency,  } = nextProps;
    const sum = prevState.sum;
    const finalResult = calculateFinalResultValue(sum, filteredCurrency, isBuyStatus);

    if ((prevState.finalResult === '' && finalResult !== 0 && finalResult !== prevState.finalResult)
      || selectedCompanyCurrency !== prevState.selectedCurrency || isBuyStatus !== prevState.isBuyStatus) {
      return {
        finalResult,
        isBuyStatus,
        selectedCurrency: selectedCompanyCurrency || selectedCurrency
      }
    }

    return {...prevState};
  }

  constructor(props) {
    super(props);

    this.state = {
      sum: 1,
      finalResult: "",
      isBuyStatus: props.isBuyStatus,
      selectedCurrency: props.selectedCompanyCurrency || props.selectedCurrency
    };

    this.changeBuyStatus = this.changeBuyStatus.bind(this);
    this.changeSumAmount = this.changeSumAmount.bind(this);
    this.blurSumAmount = this.blurSumAmount.bind(this);
    this.changeFinalResultAmount = this.changeFinalResultAmount.bind(this);
    this.blurFinalResultAmount = this.blurFinalResultAmount.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.setValueOnFocus = this.setValueOnFocus.bind(this);
  }

  setValueOnFocus(event) {
    const { value, name } = event.target;
    if (value === "0" || value === "0.00") {
      if (name === "sum") {
        this.setState({ sum: "" })
      }
      if (name === "finalResult") {
        this.setState({ finalResult: "" })
      }
    }
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
    if (value !== "" && !isNaN(value)) {
      const roundedValue = Math.round(parseInt(value));
      this.setState({sum: cashReformatter(roundedValue)});
    } else {
      this.setState({sum: 0});
    }
  }

  changeSumAmount(event) {
    const { value } = event.target;
    const { filteredCurrency } = this.props;
    const { isBuyStatus } = this.state;
    const finalResult = calculateFinalResultValue(value, filteredCurrency, isBuyStatus).toFixed(2);

    this.setState({
      sum: value,
      finalResult
    });
  }

  blurFinalResultAmount(event) {
    const { value } = event.target;
    if (value !== "" && !isNaN(value)) {
      const roundedValue = Math.round(parseInt(value));
      this.setState({finalResult: cashReformatter(roundedValue)});
    } else {
      this.setState({finalResult: 0});
    }
  }

  changeFinalResultAmount(event) {
    const { value } = event.target;
    const { filteredCurrency } = this.props;
    const { isBuyStatus } = this.state;
    const sum = parseInt(calculateSumValue(value, filteredCurrency, isBuyStatus));

    this.setState({
      finalResult: value,
      sum
    });
  }

  selectCurrency(selectedCurrency) {
    const { dispatch } = this.props;
    dispatch(setActiveCompanyCurrency(selectedCurrency.value));
  }

  get finalResultValue() {
    const { finalResult } = this.state;

    return finalResult
  }

  get sumValue() {
    const { sum } = this.state;
    return sum;
  }

  get buyPrice() {
    const { filteredCurrency } = this.props;
    const value = nullValidator(filteredCurrency, 'buy_price');
    if (value) {
      return value.toFixed(2)
    }
    return value;
  }

  get sellPrice() {
    const { filteredCurrency } = this.props;
    const value = nullValidator(filteredCurrency, 'sell_price');
    if (value) {
      return value.toFixed(2)
    }
    return value;
  }

  render() {
    const { currencyTypes, translate } = this.props;
    const { selectedCurrency, isBuyStatus } = this.state;

    return (
      <div className="ecMainCompanyCalculate">
        <div className="ecMainCompanyCalculate__price">
          <span>{translate("companies.buy")}: {this.buyPrice}</span>
          <span>{translate("companies.sell")}: {this.sellPrice}</span>
        </div>
        <div className="ecMainCompanyCalculate__calculator ecMainCompanyCalculator">
          <ExpandCollapseWrapper name="Calculator" isExpand>
            <div className="ecMainCompanyCalculator__action">
              <Radio
                value="buy"
                size={sizeType.LG}
                checked={isBuyStatus}
                name='sellBuy'
                onChange={this.changeBuyStatus}
              >{translate("companies.buy")}</Radio>
              <Radio
                value="sell"
                size={sizeType.LG}
                checked={!isBuyStatus}
                name='sellBuy'
                onChange={this.changeBuyStatus}
              >{translate("companies.sell")}</Radio>
            </div>
            <div className="ecMainCompanyCalculator__currency">
              <Dropdown
                size={sizeType.LG}
                list={currencyTypes}
                selectedIndex={selectedCurrency}
                selectItem={this.selectCurrency}
              />
            </div>
            <div className="ecMainCompanyCalculator__inputs ecMainCompanyCalculatorInputs">
              <div className="ecMainCompanyCalculatorInputs__amount">
                <span>{translate("company.amount")} ({selectedCurrency})</span>
                <InputValidator
                  InputComponent={Input}
                  type="text"
                  name="sum"
                  value={this.sumValue}
                  validationOption={{isNumeric: true}}
                  size={sizeType.LG}
                  onChange={this.changeSumAmount}
                  onBlur={this.blurSumAmount}
                  onFocus={this.setValueOnFocus}
                />
              </div>
              <span className="ecMainCompanyCalculatorInputs__icon">
                <FaExchangeAlt/>
              </span>
              <div className="ecMainCompanyCalculatorInputs__finalPrice">
                <span>{translate("company.finalPrice")} ({selectedCurrency})</span>
                <InputValidator
                  InputComponent={Input}
                  type="text"
                  name="finalResult"
                  value={this.finalResultValue}
                  validationOption={{}}
                  formatter={cashFormatter}
                  size={sizeType.LG}
                  onChange={this.changeFinalResultAmount}
                  onBlur={this.blurFinalResultAmount}
                  onFocus={this.setValueOnFocus}
                />
              </div>
            </div>
          </ExpandCollapseWrapper>
        </div>
      </div>
    );
  }
}