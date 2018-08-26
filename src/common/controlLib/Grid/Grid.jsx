import React from 'react';

import Row from "./Row/Row";

import './grid.less';
import {setSize, sizeType} from "../util";

export default class Grid extends React.PureComponent {
  get header() {
    const { config, isHeader, size } = this.props;
    return config && Array.isArray(config)
      ? <Row config={config} isHeader={isHeader} size={size}/>
      : null;
  }

  get body() {
    const { records, config, primaryKey, size, stripe } = this.props;
    return records && Array.isArray(records)
      ? records.map((record, index) => (
        <Row
          key={record[primaryKey] || index}
          record={record}
          config={config}
          size={size}
          stripe={stripe}
        />
      ))
      : null;
  }

  render() {
    const { isHeader, size } = this.props;
    return (
      <table className={`ec-grid ${setSize('ec-grid', size)}`}>
        {isHeader && <thead className="ec-grid__head">
          {this.header}
        </thead>}
        <tbody className="ec-grid__body">
          {this.body}
        </tbody>
      </table>
    );
  }
}

Grid.defaultProps = {
  size: sizeType.MD
};