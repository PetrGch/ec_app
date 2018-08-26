import React from 'react';

import Cell from "../Cell/Cell";

import './row.less';
import {setHeaderRow, setSize, setStripe, sizeType} from "../../util";

export default class Row extends React.PureComponent {
  get row() {
    const { record, config, isHeader, size } = this.props;
    return config.map((configItem, index) => (
      <Cell
        key={configItem.index || index}
        record={record}
        isHeader={isHeader}
        configItem={configItem}
        size={size}
      />
    ));
  }

  render() {
    const { size, stripe, isHeader } = this.props;

    return (
      <tr
        className={`ec-row ${setHeaderRow('ec-row', isHeader)} ${setSize('ec-row', size)} ${setStripe('ec-row', stripe)}`}
      >
        {this.row}
      </tr>
    );
  }
}

Row.defaultProps = {
  size: sizeType.MD
};