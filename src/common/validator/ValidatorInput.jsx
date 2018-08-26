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
  }

  handleValueOnChange(event) {
    const { name, value } = event.target;
    const { onChange, validationOption } = this.props;

    if (typeof onChange === 'function') {
      if (validationOption && validatorForOnChange(value, validationOption)) {
        onChange(name, value);
      } else if (!validationOption) {
        onChange(name, value);
      }
    }
  }

  handleValueOnBlur(event) {
    const { value, name } = event.target;
    const { validationOption } = this.props;
    const { isError } = this.state;
    const invalidFileds = validationForOnBlur(value, validationOption);

    if (validationOption && !isError && invalidFileds.length !== 0) {
      this.setState({isError: true});
      validationOption.validateInput(name, true);
    } else if (validationOption && isError && invalidFileds.length === 0) {
      this.setState({isError: false});
      validationOption.validateInput(name, false);
    }
  }

  render() {
    const { InputComponent, value, placeholder, name, rows } = this.props;
    const { isError } = this.state;

    return InputComponent && <div className={`validatorInput validatorInput_isError--${isError}`}>
      <InputComponent
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={this.handleValueOnChange}
        onBlur={this.handleValueOnBlur}
        rows={rows}
      />
    </div>;
  }
}

ValidatorInput.defaultProps = { validationOption: {} };