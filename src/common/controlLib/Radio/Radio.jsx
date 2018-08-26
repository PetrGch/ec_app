import React from 'react';
import {generateUniqueId} from '../../util/autoGenerator';

import './radio.less';
import {setSize, sizeType} from '../util';

export default class Radio extends React.PureComponent {
  get uid() {
    return generateUniqueId();
  }

  render() {
    const { name, children, className, size } = this.props;
    const uid = this.uid;

    return (
      <div className={`ec-radio ${setSize('ec-radio', size)} ${className}`}>
        <input className='ec-radio__input' type="radio" id={uid} name={name}/>
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