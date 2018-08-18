import React from 'react';
import { Table, Icon } from 'antd';

import {mockData} from "../company/companyColumnConfig";
import {getAllCompanies} from "../../../action/admin";
import {parserColumnConfig} from "./parserColumnConfig";

export default class Parser extends React.Component {
  constructor(props) {
    super(props);

    this.columnConfig = parserColumnConfig(props.dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllCompanies());
  }

  render() {
    const { companies } = this.props;

    return (
      <div className="companyAdmin">
        <h1><Icon type="table" /> Parser</h1>
        <div>
          <Table
            className="companyAdmin__table"
            dataSource={companies}
            columns={this.columnConfig}
            size="small"
          />
        </div>
      </div>
    );
  }
}