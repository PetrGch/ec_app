import React from 'react';
import {withRouter} from "react-router-dom";
import { translate } from 'react-i18next';

import { FaAngleDoubleDown } from 'react-icons/fa';

import './ecHeader.less';
import {sizeType} from "../../common/controlLib/util";
import {Dropdown} from "../../common/controlLib";
import ReactDOM from "react-dom";

const LANGUAGES = [
  {
    index: "en",
    value: "EN"
  },
  {
    index: "de",
    value: "DE"
  },
  {
    index: "pl",
    value: "PL"
  }
];

class EcHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.scrollToStart = this.scrollToStart.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
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

  selectLanguage(language) {
    const { i18n } = this.props;
    const { index } = language;

    i18n.changeLanguage(index);
  }

  render() {
    const { lng } = this.props;

    return (
      <header className="ecHeader">
        <div className="ecHeader__language">
          <Dropdown
            size={sizeType.MD}
            list={LANGUAGES}
            selectedIndex={lng}
            selectItem={this.selectLanguage}
          />
        </div>
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