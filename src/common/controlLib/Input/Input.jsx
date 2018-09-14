import React from 'react';

import {setSize, sizeType} from "../util";

import './input.less';

export default class Input extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false
    };

    this.changeInputValueHandler = this.changeInputValueHandler.bind(this);
    this.focusInputValueHandler = this.focusInputValueHandler.bind(this);
    this.blurInputValueHandler = this.blurInputValueHandler.bind(this);
  }

  changeInputValueHandler(event) {
    const { onChange } = this.props;

    if (typeof onChange === "function") {
      onChange(event);
    }
  }

  focusInputValueHandler(event) {
    const { onFocus } = this.props;
    if (onFocus && typeof onFocus === "function") {
      onFocus(event);
    }

    this.setState({isFocus: true});
  }

  blurInputValueHandler(event) {
    const { onBlur } = this.props;
    if (onBlur && typeof onBlur === "function") {
      onBlur(event);
    }

    this.setState({isFocus: false});
  }

  get value() {
    const { formatter, value } = this.props;
    const { isFocus } = this.state;
    return formatter && !isFocus ? formatter(value) : value
  }

  render() {
    const { type, disabled, name, placeholder, size } = this.props;
    return (
      <label className="ec-input">
        <input
          className={`ec-input__input ${setSize('ec-input__input', size)}`}
          type={type}
          value={this.value}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={this.changeInputValueHandler}
          onFocus={this.focusInputValueHandler}
          onBlur={this.blurInputValueHandler}
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
