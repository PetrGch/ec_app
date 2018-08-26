import React from 'react';

import BlockWrapper from '../../../../common/BlockWrapper/BlockWrapper';

import './ecMainContent.less';
import EcCalculator from './EcCalculator/EcCalculator';

export default class EcMainContent extends React.PureComponent {
  render() {
    return (
      <main className="ecMainContent">
        <BlockWrapper>
          <EcCalculator/>
        </BlockWrapper>
      </main>
    );
  }
}