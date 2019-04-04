import React from 'react';

import EcBaseCurrency from "./EcBaseCurrency/EcBaseCurrency";

import './ecSideBar.less';

export default class EcSideBar extends React.PureComponent {
  render() {
    const {isBuyStatus, companies, isCompaniesLoading} = this.props;

    return (
      <aside className="ecSideBar">
        <EcBaseCurrency
          isBuyStatus={isBuyStatus}
          companies={companies}
          isLoading={isCompaniesLoading}
        />
      </aside>
    );
  }
}