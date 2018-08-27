import React from 'react';
import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';

import './ecContent.less';

export default class EcContent extends React.PureComponent {
  render() {
    const { dispatch, ecHomePage: { currencyAmount, isBuyStatus } } = this.props;

    return (
      <content className="ecContent">
        <EcMainContent
          dispatch={dispatch}
          isBuyStatus={isBuyStatus}
          currencyAmount={currencyAmount}
        />
        <EcSideBar
          isBuyStatus={isBuyStatus}
        />
      </content>
    );
  }
}