import React from 'react';
import {Icon} from 'antd';
import NewCompanyData from '../sections/newCompanyData/NewCompanyData';

export default class NewCompany extends React.PureComponent {
  render() {
    const { dispatch, newCompany } = this.props;

    return (
      <div>
        <h1><Icon type="table" /> Currency</h1>
        <NewCompanyData
          dispatch={dispatch}
          newCompany={newCompany}
        />
      </div>
    );
  }
}