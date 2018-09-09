/* eslint-disable */
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';
/* eslint-enable */

import {deleteCompanyById} from '../../../../action/admin';

import './actions.less';

const ButtonGroup = Button.Group;

function Actions({history, record, dispatch}) {

  function editCompany() {
    history.push(`/admin/company/${record.id}`);
  }

  function deleteCompany() {
    dispatch(deleteCompanyById(record.id));
  }

  return (
    <ButtonGroup className="actionsCompanyTable">
      <Button
        className="actionsCompanyTable__edit"
        type="primary"
        size="small"
        icon="edit"
        onClick={editCompany}
      />
      <Button
        className="actionsCompanyTable__delete"
        type="primary"
        size="small"
        icon="delete"
        onClick={deleteCompany}
      />
    </ButtonGroup>
  );
}

export default withRouter(Actions);