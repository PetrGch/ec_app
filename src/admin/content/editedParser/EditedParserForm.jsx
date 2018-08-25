import React from 'react';
import {Icon, Row, Col, Button, Alert, notification} from 'antd';

import ParserData from "../sections/parserData/ParserData";
import {setInitialParserState} from "../../../action/parser";
import {editParserService} from "./editCurrencyService";

import './editedParserForm.less';

export default class EditedParserForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isUpdateButtonDisable: true,
      initialParserData: null,
      parseSuccessResult: null,
      parseFailResult: null
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleInitialStateClick = this.handleInitialStateClick.bind(this);
    this.handleResultCheck = this.handleResultCheck.bind(this);
  }

  componentDidMount() {
    const company = this.getCompanyById;
    this.setState({initialParserData: JSON.stringify(company.exchangeCompanyParseData)})
  }

  componentWillUnmount() {
    const { dispatch, match: {params} } = this.props;
    const { initialParserData } = this.state;
    dispatch(setInitialParserState(params.id, initialParserData));
  }

  static getDerivedStateFromProps(props, state) {
    const { match: {params}, companies } = props;
    const company = editParserService.selectCompanyById(companies, params.id);
    if (company.exchangeCompanyParseData &&
      JSON.stringify(company.exchangeCompanyParseData) !== state.initialParserData) {
      return {isUpdateButtonDisable: false}
    } else {
      return {isUpdateButtonDisable: true}
    }
  }

  handleUpdateButtonClick() {
    const { match: {params} } = this.props;
    const company = this.getCompanyById;
    this.editParserService.updateParserData(params.id, company.exchangeCompanyParseData);
  }

  handleInitialStateClick() {
    const { dispatch, match: {params} } = this.props;
    const { initialParserData } = this.state;
    dispatch(setInitialParserState(params.id, initialParserData));
  }

  handleResultCheck() {
    const { match: {params} } = this.props;
    this.editParserService.checkParseResult(params.id)
      .then(response => {
        this.setState({parseSuccessResult: response});
        notification.success({
          message: 'EC',
          description: 'Parsing process run successfully!'
        });
      })
      .catch(error => {
        this.setState({parseFailResult: error.message});
        notification.error({
          message: 'EC',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      });
  }

  get editParserService() {
    return editParserService;
  }

  get getCompanyById() {
    const { match: {params}, companies } = this.props;
    return this.editParserService.selectCompanyById(companies, params.id);
  }

  render() {
    const { dispatch, match: {params} } = this.props;
    const { isUpdateButtonDisable, parseSuccessResult, parseFailResult } = this.state;
    const company = this.getCompanyById;

    return company
      ? <div className="editedParserForm">
        <h1><Icon type="profile" /> {`Company ${params.id}`}</h1>
        <div>
          <div>
            <ParserData
              companyId={params.id}
              dispatch={dispatch}
              parserData={company.exchangeCompanyParseData}
            />
          </div>
          {
            (parseSuccessResult || parseFailResult) &&
            <div className="editedParserForm__parsedResult">
              <span><strong>Parsed result:</strong></span>
              {parseSuccessResult && <Alert message={parseSuccessResult} type="success"/>}
              {parseFailResult && <Alert message={parseFailResult} type="error"/>}
            </div>
          }
          <Row className="editedParserForm__actions">
            <Col span={5}>
              <Button
                disabled={isUpdateButtonDisable}
                onClick={this.handleUpdateButtonClick}
              >

                Update parser data
              </Button>
            </Col>
            <Col span={4}>
              <Button
                disabled={isUpdateButtonDisable}
                onClick={this.handleInitialStateClick}
              >
                Initial state
              </Button>
            </Col>
            <Col span={4}>
              <Button
                disabled={!isUpdateButtonDisable}
                onClick={this.handleResultCheck}
              >
                Check result
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      : <Alert message="Parser information doesn't exist" type="error" />
  }
}
