import React from 'react';
import CompanyMainInfo from "../companyMainInfo/CompanyMainInfo";
import {Button} from "antd";
import {setInitialCompanyMainInfoState} from "../../../../action/companyMainInfo";
import {editNewCompanyService} from "../../newCompany/editNewCompanyService";

import './newCompanyData.less';
import CompanyDataInfo from "../companyDataInfo/CompanyDataInfo";

export default class NewCompanyData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdateButtonDisable: true,
      initialCompanyMainInfo: {}
    };

    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
  }

  componentDidMount() {
    const { newCompany } = this.props;
    this.setState({initialCompanyMainInfo: JSON.stringify(newCompany)})
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const { initialCompanyMainInfo } = this.state;
    dispatch(setInitialCompanyMainInfoState(null, initialCompanyMainInfo, true));
  }

  static getDerivedStateFromProps(props, state) {
    const { newCompany } = props;
    if (JSON.stringify(newCompany) !== state.initialCompanyMainInfo) {
      return {isUpdateButtonDisable: false};
    }
    return {isUpdateButtonDisable: true};
  }

  get editNewCompanyService() {
    return editNewCompanyService;
  }

  handleCreateButtonClick() {
    const { newCompany } = this.props;
    this.editNewCompanyService.createNewCompany(newCompany);
  }

  render() {
    const { isUpdateButtonDisable } = this.state;
    const { newCompany, dispatch } = this.props;

    return (
      <div className="newCompanyData">
        <CompanyMainInfo
          company={newCompany}
          isNewCompany
          dispatch={dispatch}
        />
        <CompanyDataInfo
          exchangeCompanyDetail={newCompany.exchangeCompanyDetail}
          isNewCompany
          dispatch={dispatch}
        />

        <div className="newCompanyData__actions">
          <Button
            type="primary"
            disabled={isUpdateButtonDisable}
            onClick={this.handleCreateButtonClick}
          >
            Create new company
          </Button>
        </div>
      </div>
    );
  }
}