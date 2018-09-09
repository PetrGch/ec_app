import React from 'react';
import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';

import './ecHomePage.less';

export default class EcHomePage extends React.PureComponent {
  render() {
    const { dispatch, ecHomePage: { currencyAmount, isBuyStatus } } = this.props;

    return (
      <div className="ecHomePage">
        <EcMainContent
          dispatch={dispatch}
          isBuyStatus={isBuyStatus}
          currencyAmount={currencyAmount}
        />
        <EcSideBar
          isBuyStatus={isBuyStatus}
        />
      </div>
    );
  }
}