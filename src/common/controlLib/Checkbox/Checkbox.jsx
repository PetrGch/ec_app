import React from 'react';

import {generateUniqueId} from '../../util/autoGenerator';
import {setSize, sizeType} from '../util';

import './checkbox.less';

import spinner from '../../util/spinner.svg';

export default class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isDisable: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { onChange } = this.props;
    const result = onChange(event);

    if (result && result.then) {
      this.setState({isLoading: true});
      result.then(() => {
        this.setState({isLoading: false});
      }, () => {
        this.setState({isDisable: true, isLoading: false})
      })
    }
  }

  get uid() {
    return generateUniqueId();
  }

  render() {
    const { name, children, className, size, checked, value } = this.props;
    const { isLoading, isDisable } = this.state;
    const uid = this.uid;

    return (
      <div className={`ec-checkbox ${setSize('ec-checkbox', size)} ${className}`}>
        {isLoading
          ? <img className="ec-checkbox__img" src={spinner} alt="spinner"/>
          : <input
          id={uid}
          type="checkbox"
          value={value}
          name={name}
          checked={checked}
          className='ec-checkbox__input'
          disabled={isDisable}
          onChange={this.onChangeHandler}
        />}
        <label className="ec-checkbox__label" htmlFor={uid}>
          {children}
        </label>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  className: '',
  size: sizeType.MD
};