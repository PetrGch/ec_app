import React from 'react';
import { Table, Icon } from 'antd';

import {mockData} from "../company/companyColumnConfig";
import {currencyColumnConfig} from "./currencyColumnConfig";
import {getAllCompanies} from "../../../action/admin";

export default class Currency extends React.Component {
  constructor(props) {
    super(props);

    this.columnConfig = currencyColumnConfig(props.dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllCompanies());
  }

  render() {
    const { companies } = this.props;

    return (
      <div className="currencyAdmin">
        <h1><Icon type="table" /> Currency</h1>
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