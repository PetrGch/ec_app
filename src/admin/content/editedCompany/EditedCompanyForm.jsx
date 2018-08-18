import React from 'react';
import {Alert, Button, Col, Icon, Row} from 'antd';

import {editCompanyService} from "./editCompanyService";
import CompanyMainInfo from "../sections/companyMainInfo/CompanyMainInfo";
import CompanyDataInfo from "../sections/companyDataInfo/CompanyDataInfo";

import './editedCompanyForm.less';
import {setInitialCompanyMainInfoState} from "../../../action/companyMainInfo";
import {nullValidator} from "../../../common/util/valueValidator";

export default class EditedCompanyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdateButtonDisable: true,
      initialCompanyInfo: [],
      invalidFields: []
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleInitialStateClick = this.handleInitialStateClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    const company = this.getCompanyById;
    this.setState({initialCompanyInfo: JSON.stringify(company)})
  }

  componentWillUnmount() {
    const { dispatch, match: {params} } = this.props;
    const { initialCompanyInfo } = this.state;
    dispatch(setInitialCompanyMainInfoState(params.id, initialCompanyInfo));
  }

  static getDerivedStateFromProps(props, state) {
    const { match: {params}, companies } = props;
    const company = editCompanyService.selectCompanyById(companies, params.id);
    if (JSON.stringify(company) !== state.initialCompanyInfo) {
      return {isUpdateButtonDisable: false}
    } else {
      return {isUpdateButtonDisable: true}
    }
  }

  handleUpdateButtonClick() {
    const { match: {params} } = this.props;
    const company = this.getCompanyById;
    this.editCompanyService.updateCompanyInfo(params.id, company);
  }

  handleInitialStateClick() {
    const { dispatch, match: {params} } = this.props;
    const { initialCompanyInfo } = this.state;
    dispatch(setInitialCompanyMainInfoState(params.id, initialCompanyInfo));
  }

  validateInput(fieldName, isNotValid) {
    const { invalidFields } = this.state;
    if (isNotValid && invalidFields.indexOf(fieldName) === -1) {
      this.setState({invalidFields: [...invalidFields, fieldName]})
    } else if (!isNotValid && invalidFields.indexOf(fieldName) !== -1) {
      const newInvalidFields = invalidFields.filter(r => r !== fieldName);
      this.setState({invalidFields: newInvalidFields});
    }
  }

  get editCompanyService() {
    return editCompanyService;
  }

  get getCompanyById() {
    const { match: {params}, companies } = this.props;

    return this.editCompanyService.selectCompanyById(companies, params.id);
  }

  render() {
    const { match: {params}, dispatch } = this.props;
    const { isUpdateButtonDisable, invalidFields } = this.state;
    const company = this.getCompanyById;
    const isInvalid = invalidFields.length !== 0;

    return company ?
      <div className="editedCompanyForm">
        <h1><Icon type="profile" /> {`Company ${company.name}`}</h1>
        <div>
          <CompanyMainInfo
            companyId={params.id}
            company={company}
            dispatch={dispatch}
            validateInput={this.validateInput}
          />
          <CompanyDataInfo
            companyId={params.id}
            exchangeCompanyDetail={nullValidator(company, "exchangeCompanyDetail")}
            dispatch={dispatch}
            validateInput={this.validateInput}
          />

          <Row className="editedCompanyForm__actions">
            <Col span={6}>
              <Button
                disabled={isUpdateButtonDisable || isInvalid}
                onClick={this.handleUpdateButtonClick}
              >
                Update company information
              </Button>
            </Col>
            <Col span={4}>
              <Button
                disabled={isUpdateButtonDisable || isInvalid}
                onClick={this.handleInitialStateClick}
              >
                Initial state
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      : <Alert message="This company doesn't exist" type="error" />
  }
}
