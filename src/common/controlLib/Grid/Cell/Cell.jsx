import React from 'react';

import {setHeaderRow, setSize, sizeType} from "../../util";

import './cell.less';

function renderHeader(record, configItem) {
  const { title, renderTitle } = configItem;

  if (renderTitle && typeof renderTitle === "function") {
    return renderTitle(record, configItem);
  }
  return title || "";
}

function renderBody(record, configItem) {
  const { renderCell, key } = configItem;

  if (renderCell && typeof renderCell === "function") {
    return renderCell(record, configItem);
  }

  return (key && record[key]) || "";
}

export default class Cell extends React.PureComponent {
  get cell() {
    const { record, configItem, isHeader } = this.props;
    if (isHeader) {
      return renderHeader(record, configItem);
    }

    return renderBody(record, configItem);
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