import React from 'react';

import {setSize, sizeType} from "../util";

import './input.less';

export default class Input extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.changeInputValueHandler = this.changeInputValueHandler.bind(this);
  }

  changeInputValueHandler(event) {
    const { onChange } = this.props;

    if (typeof onChange === "function") {
      onChange(event);
    }

    this.setState({ value: event.target.value });

  }

  render() {
    const { value, type, disabled, name, formatter, placeholder, size } = this.props;
    return (
      <label className="ec-input">
        <input
          className={`ec-input__input ${setSize('ec-input__input', size)}`}
          type={type}
          value={formatter ? formatter(value) : value}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={this.changeInputValueHandler}
        />
      </label>
    );
  }
}

Input.defaultProps = {
  name: '',
  disabled: false,
  type: 'text',
  value: '',
  className: '',
  size: sizeType.MD
};
