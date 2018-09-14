import React from 'react';

import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';

import './ecHomePage.less';

export default class EcHomePage extends React.PureComponent {
  componentDidMount() {
    const { loadAllCompanies } = this.props;
    loadAllCompanies();
  }

  render() {
    const { dispatch, companies, currencyAmount, isBuyStatus } = this.props;

    return (
      <div className="ecHomePage">
        <EcMainContent
          dispatch={dispatch}
          isBuyStatus={isBuyStatus}
          currencyAmount={currencyAmount}
          companies={companies}
        />
        <EcSideBar
          isBuyStatus={isBuyStatus}
        />
      </div>
    );
  }
}