import React from 'react';
import {withRouter} from "react-router-dom";
import { translate } from 'react-i18next';

import { FaAngleDoubleDown } from 'react-icons/fa';

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
    const { i18n } = this.props;

    return (
      <header className="ecHeader">
        <button onClick={() => i18n.changeLanguage('de')}>de</button>
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
        <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
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

export default withRouter(translate('common')(EcHeader));