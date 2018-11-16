import React from 'react';

import Cell from "../Cell/Cell";

import './row.less';
import {setHeaderRow, setSize, setStripe, sizeType} from "../../util";

export default class Row extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    const { record, onMouseOver } = this.props;
    if (typeof onMouseOver === "function") {
      onMouseOver(record)
    }
  }

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
        onMouseOver={this.onMouseOver}
      >
        {this.row}
      </tr>
    );
  }
}

Row.defaultProps = {
  size: sizeType.MD
};