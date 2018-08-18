import React from 'react';
import { Table, Icon, Button } from 'antd';

import {companyColumnConfig} from "./companyColumnConfig";

import './company.less';
import {getAllCompanies} from "../../../action/admin";

class Company extends React.Component {
  constructor(props) {
    super(props);

    this.columnConfig = companyColumnConfig(props.dispatch);

    this.addNewCompany = this.addNewCompany.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllCompanies());
  }

  addNewCompany() {
    const { history } = this.props;
    history.push('/admin/newcompany');
  }

  render() {
    const { companies } = this.props;

    return (
      <div className="companyAdmin">
        <h1><Icon type="table" /> Exchange Companies</h1>
        <Button
          className="companyAdmin__newCompany"
          size="small"
          onClick={this.addNewCompany}
        >
          Add new company
        </Button>
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

export default Company;