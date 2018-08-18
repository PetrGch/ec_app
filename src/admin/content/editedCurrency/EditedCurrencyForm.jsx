import React from 'react';
import {Icon, Row, Col, Button, Alert} from 'antd';

import {editCurrencyService} from "./editCurrencyService";
import CurrencyRate from "../sections/currencyRate/CurrencyRate";
import {setInitialCurrencyState} from "../../../action/currencyRate";

export default class EditedCurrencyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdateButtonDisable: true,
      initialCurrencyData: []
    };

    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleInitialStateClick = this.handleInitialStateClick.bind(this);
  }

  componentDidMount() {
    const company = this.getCompanyById;
    this.setState({initialCurrencyData: JSON.stringify(company.currencyRates)})
  }

  componentWillUnmount() {
    const { dispatch, match: {params} } = this.props;
    const { initialCurrencyData } = this.state;
    dispatch(setInitialCurrencyState(params.id, initialCurrencyData));
  }

  static getDerivedStateFromProps(props, state) {
    const { match: {params}, companies } = props;
    const company = editCurrencyService.selectCompanyById(companies, params.id);
    if (JSON.stringify(company.currencyRates) !== state.initialCurrencyData) {
      return {isUpdateButtonDisable: false}
    } else {
      return {isUpdateButtonDisable: true}
    }
  }

  handleUpdateButtonClick() {
    const { match: {params} } = this.props;
    const company = this.getCompanyById;
    this.editCurrencyService.updateCurrencyRate(params.id, company.currencyRates);
  }

  handleInitialStateClick() {
    const { dispatch, match: {params} } = this.props;
    const { initialCurrencyData } = this.state;
    dispatch(setInitialCurrencyState(params.id, initialCurrencyData));
  }

  get editCurrencyService() {
    return editCurrencyService;
  }

  get getCompanyById() {
    const { match: {params}, companies } = this.props;
    return this.editCurrencyService.selectCompanyById(companies, params.id);
  }

  render() {
    const { dispatch, match: {params} } = this.props;
    const { isUpdateButtonDisable } = this.state;
    const company = this.getCompanyById;

    return company
      ? <div>
        <h1><Icon type="profile" /> {`Company ${params.id}`}</h1>
        <div>
          <CurrencyRate
            companyId={params.id}
            dispatch={dispatch}
            currencyRate={company.currencyRates}
          />
          <Row className="currencyForm__actions">
            <Col span={5}>
              <Button
                disabled={isUpdateButtonDisable}
                onClick={this.handleUpdateButtonClick}
              >
                Update currency rate
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
          </Row>
        </div>
      </div>
      : <Alert message="Currency information doesn't exist" type="error" />
  }
}
