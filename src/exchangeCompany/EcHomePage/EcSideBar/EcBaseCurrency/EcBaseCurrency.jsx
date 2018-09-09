import React from 'react';

import Grid from "../../../../common/controlLib/Grid/Grid";
import {baseCurrencyGridConfig, baseCurrencyMockRecord} from "./baseCurrencyGridConfig";

export default class EcBaseCurrency extends React.PureComponent {
  render() {
    const { isBuyStatus } = this.props;

    return (
      <div className="ecBaseCurrency">
        <Grid
          isHeader
          records={baseCurrencyMockRecord}
          config={baseCurrencyGridConfig(isBuyStatus)}
        />
      </div>
    );
  }
}