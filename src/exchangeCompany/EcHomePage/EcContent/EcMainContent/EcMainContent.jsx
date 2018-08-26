import React from 'react';

import BlockWrapper from '../../../../common/BlockWrapper/BlockWrapper';

import './ecMainContent.less';
import EcCalculator from './EcCalculator/EcCalculator';

export default class EcMainContent extends React.PureComponent {
  render() {
    const { isBuyStatus, changeBuyStatus } = this.props;

    return (
      <main className="ecMainContent">
        <BlockWrapper>
          <EcCalculator
            isBuyStatus={isBuyStatus}
            changeBuyStatus={changeBuyStatus}
          />
        </BlockWrapper>
      </main>
    );
  }
}