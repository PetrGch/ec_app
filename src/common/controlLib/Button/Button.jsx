import React from 'react';

import {setSize, sizeType} from '../util';

import './button.less';

export default class Button extends React.PureComponent {
  render() {
    const { children, className, size, onClick, isActive } = this.props;
    return (
      <button
        className={`ec-button ${setSize('ec-button', size)} ${className} ec-button--isActive-${isActive}`}
        onClick={onClick}
      >
        <span>{children}</span>
      </button>
    );
  }
}

Button.defaultProps = {
  className: '',
  size: sizeType.MD
};
