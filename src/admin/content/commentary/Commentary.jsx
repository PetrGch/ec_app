import React from 'react';
import { Table, Icon } from 'antd';

import {commentaryColumnConfig} from "./commentaryColumnConfig";
import {getAllCompanies} from "../../../action/admin";

export default class Commentary extends React.PureComponent {
  constructor(props) {
    super(props);

    this.columnConfig = commentaryColumnConfig(props.dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllCompanies());
  }

  render() {
    const { companies } = this.props;

    return (
      <div className="companyAdmin">
        <h1><Icon type="table" /> Commentaries</h1>
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