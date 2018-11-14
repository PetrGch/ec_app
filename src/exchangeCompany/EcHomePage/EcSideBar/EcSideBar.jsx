import React from 'react';

import BlockWrapper from "../../../common/BlockWrapper/BlockWrapper";

import './ecSideBar.less';
import EcBaseCurrency from "./EcBaseCurrency/EcBaseCurrency";

export default class EcSideBar extends React.PureComponent {
  render() {
    const { isBuyStatus, companies } = this.props;

    return (
      <aside className="ecSideBar">
        <BlockWrapper>
          <EcBaseCurrency
            isBuyStatus={isBuyStatus}
            companies={companies}
          />
        </BlockWrapper>
      </aside>
    );
  }
}