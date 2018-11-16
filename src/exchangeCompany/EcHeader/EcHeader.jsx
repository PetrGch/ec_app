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
    index: "th",
    value: "TH"
  }
];

class EcHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.scrollToStart = this.scrollToStart.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
    this.navigateToHomePage = this.navigateToHomePage.bind(this);
  }

  componentDidMount() {
    const { i18n, lng } = this.props;

    if (lng === "dev") {
      i18n.changeLanguage("en");
    }
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

  navigateToHomePage() {
    const { history, homeRout, setBranchRout } = this.props;
    setBranchRout(null);
    history.push(homeRout);
  }

  selectLanguage(language) {
    const { i18n } = this.props;
    const { index } = language;

    i18n.changeLanguage(index);
  }

  get breadcrumb() {
    const { branchRout } = this.props;

    if (branchRout) {
      return (
        <div className="ecHeader__breadCrumb">
          <span
            className="ecHeader__breadCrumb--rout"
            onClick={this.navigateToHomePage}
          >
            Home
          </span> | <span className="ecHeader__breadCrumb--active">
            {branchRout}
          </span>
        </div>
      )
    }
    return null;
  }

  render() {
    const { lng } = this.props;
    console.log(lng)
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
        {this.breadcrumb}
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