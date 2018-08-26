import React from 'react';

import {setHeaderRow, setSize, sizeType} from "../../util";

import './cell.less';

export default class Cell extends React.PureComponent {
  get cell() {
    const { record, configItem, isHeader } = this.props;
    const { title, key, renderCell, renderTitle } = configItem;
    if (isHeader) {
      if (renderTitle && typeof renderTitle === "function") {
        return renderTitle(record, configItem);
      }
      return title || "";
    }
    if (renderCell && typeof renderCell === "function") {
      renderCell(record, configItem);
    }

    return (key && record[key]) || "";
  }

  render() {
    const { size, isHeader } = this.props;

    return isHeader ? (
      <th className={`ec-cell ${setHeaderRow('ec-cell', isHeader)} ${setSize('ec-cell', size)}`}>
        {this.cell}
      </th>
    ) : (
      <td className={`ec-cell ${setSize('ec-cell', size)}`}>
        {this.cell}
      </td>
    );
  }
}

Cell.defaultProps = {
  size: sizeType.MD
};