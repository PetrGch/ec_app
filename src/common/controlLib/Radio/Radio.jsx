import React from 'react';
import {generateUniqueId} from '../../util/autoGenerator';

import './radio.less';
import {setSize, sizeType} from '../util';

export default class Radio extends React.PureComponent {
  get uid() {
    return generateUniqueId();
  }

  render() {
    const { name, children, className, size, checked, value, onChange } = this.props;
    const uid = this.uid;

    return (
      <div className={`ec-radio ${setSize('ec-radio', size)} ${className}`}>
        <input
          id={uid}
          type="radio"
          value={value}
          name={name}
          checked={checked}
          className='ec-radio__input'
          onChange={onChange}
        />
        <label htmlFor={uid}>
          {children}
        </label>
      </div>
    );
  }
}

Radio.defaultProps = {
  className: '',
  size: sizeType.MD
};