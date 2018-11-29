import React from 'react';

import BlockWrapper from "../../../common/BlockWrapper/BlockWrapper";
import EcBaseCurrency from "./EcBaseCurrency/EcBaseCurrency";

import './ecSideBar.less';

export default class EcSideBar extends React.PureComponent {
  render() {
    const { isBuyStatus, companies, isCompaniesLoading } = this.props;

    return (
      <aside className="ecSideBar">
        <BlockWrapper isLoad={isCompaniesLoading}>
          <EcBaseCurrency
            isBuyStatus={isBuyStatus}
            companies={companies}
          />
        </BlockWrapper>
      </aside>
    );
  }
}