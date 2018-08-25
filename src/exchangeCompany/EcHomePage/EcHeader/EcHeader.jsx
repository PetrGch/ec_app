import React from 'react';

import { FaAngleDoubleDown } from 'react-icons/fa';

import './ecHeader.less';

export default class EcHeader extends React.PureComponent {
  render() {
    return (
      <header className="ecHeader">
        <div className="ecHeader__logo ecLogo">
          <strong>ExCurRate</strong>
        </div>
        <div className="ecHeader__nextBtn">
          <div className="ecNextBtn">
            <FaAngleDoubleDown/>
          </div>
        </div>
      </header>
    );
  }
}