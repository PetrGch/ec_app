import React from 'react';
import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';

import './ecContent.less';

export default class EcContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isBuyStatus: true
    };

    this.changeBuyStatus = this.changeBuyStatus.bind(this);
  }

  changeBuyStatus(event) {
    if (event.target && event.target.value === "sell") {
      this.setState({isBuyStatus: false});
    } else if (event.target && event.target.value === "buy") {
      this.setState({isBuyStatus: true});
    }
  }

  render() {
    const { isBuyStatus } = this.state;

    return (
      <content className="ecContent">
        <EcMainContent
          isBuyStatus={isBuyStatus}
          changeBuyStatus={this.changeBuyStatus}
        />
        <EcSideBar
          isBuyStatus={isBuyStatus}
        />
      </content>
    );
  }
}