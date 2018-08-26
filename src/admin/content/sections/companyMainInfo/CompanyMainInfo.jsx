import React from 'react';
import {Col, Input, Rate, Row} from 'antd';
import {changeCompanyMainInfoValue} from '../../../../action/companyMainInfo';

import './companyMainInfo.less';
import WorkingTime from './workingTime/WorkingTime';
import {nullValidator} from '../../../../common/util/valueValidator';
import ValidatorInput from '../../../../common/controlLib/ValidatorInput/ValidatorInput';

export default class CompanyMainInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleValueOnChange = this.handleValueOnChange.bind(this);
    this.handleOnChangeForRate = this.handleOnChangeForRate.bind(this);
  }

  handleValueOnChange(name, value) {
    const { dispatch, companyId, isNewCompany } = this.props;
    dispatch(changeCompanyMainInfoValue(companyId, name, value, isNewCompany));
  }

  handleOnChangeForRate(value) {
    const NAME = 'rating';
    const { dispatch, companyId, isNewCompany } = this.props;
    dispatch(changeCompanyMainInfoValue(companyId, NAME, value, isNewCompany));
  }

  render() {
    const { company, dispatch, isNewCompany, validateInput } = this.props;

    return (
      <div className="companyMainInfo">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={4}>Name*:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(company, 'name')}
              placeholder="Company name"
              name="name"
              onChange={this.handleValueOnChange}
              validationOption={{isRequired: true, length: 120, validateInput}}
            />
          </Col>
          <Col span={4}>Address:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(company, 'address')}
              placeholder="Address company"
              name="address"
              onChange={this.handleValueOnChange}
              validationOption={{length: 120}}
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={4}>Coordinate X:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(company, 'coordinateX')}
              placeholder="Coordinate X"
              name="coordinateX"
              onChange={this.handleValueOnChange}
              validationOption={{length: 20, isNumeric: true}}
            />
          </Col>
          <Col span={4}>Coordinate Y:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(company, 'coordinateY')}
              placeholder="Coordinate Y"
              name="coordinateY"
              onChange={this.handleValueOnChange}
              validationOption={{length: 20, isNumeric: true}}
            />
          </Col>
        </Row>
        <Row>
          <Rate
            allowHalf
            value={nullValidator(company, 'rating', 0)}
            onChange={this.handleOnChangeForRate} />
        </Row>

        <WorkingTime
          companyId={company.id}
          dispatch={dispatch}
          isNewCompany={isNewCompany}
          workingTime={nullValidator(company, 'workingTime')}
        />
      </div>
    );
  }
}