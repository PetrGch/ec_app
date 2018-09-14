import React from 'react';

import { FaAngleDoubleDown } from 'react-icons/fa';
import {withRouter} from "react-router-dom";

import './ecHeader.less';

class EcHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.scrollToStart = this.scrollToStart.bind(this);
  }

  scrollToStart() {
    const { contentRef } = this.props;

    if (window && contentRef && contentRef.current) {
      window.scrollTo({
        top: contentRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }

  render() {
    return (
      <header className="ecHeader">
        <div className="ecHeader__logo ecLogo">
          <strong>ExCurRate</strong>
        </div>
        <div className="ecHeader__nextBtn">
          <div className="ecHeaderNextBtn" onClick={this.scrollToStart}>
            <FaAngleDoubleDown/>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(EcHeader);