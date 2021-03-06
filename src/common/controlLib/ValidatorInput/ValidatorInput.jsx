import React from 'react';

import './validatorInput.less';
import {validationForOnBlur, validatorForOnChange} from './validationRules';

export default class ValidatorInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isError: false
    };

    this.handleValueOnChange = this.handleValueOnChange.bind(this);
    this.handleValueOnBlur = this.handleValueOnBlur.bind(this);
    this.handleValueOnFocus = this.handleValueOnFocus.bind(this);
  }

  handleValueOnFocus(event) {
    const { onFocus } = this.props;

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  }

  handleValueOnChange(event) {
    const { value } = event.target;
    const { onChange, validationOption } = this.props;

    if (typeof onChange === 'function') {
      if (validationOption && validatorForOnChange(value, validationOption)) {
        onChange(event);
      } else if (!validationOption) {
        onChange(event);
      }
    }
  }

  handleValueOnBlur(event) {
    const { value, name } = event.target;
    const { validationOption, onBlur } = this.props;
    const { isError } = this.state;
    const invalidFileds = validationForOnBlur(value, validationOption);

    if (typeof onBlur === 'function') {
      onBlur(event);
      if (validationOption && !isError && invalidFileds.length !== 0) {
        this.setState({isError: true});
        validationOption.validateInput && validationOption.validateInput(name, true);
      } else if (validationOption && isError && invalidFileds.length === 0) {
        this.setState({isError: false});
        validationOption.validateInput && validationOption.validateInput(name, false);
      }
    }
  }

  render() {
    const { InputComponent, value, validationOption, ...rest } = this.props;
    const { isError } = this.state;

    return InputComponent && <div className={`validatorInput validatorInput_isError--${isError}`}>
      <InputComponent
        {...rest}
        value={value}
        onChange={this.handleValueOnChange}
        onBlur={this.handleValueOnBlur}
        onFocus={this.handleValueOnFocus}
      />
    </div>;
  }
}

ValidatorInput.defaultProps = { validationOption: {} };