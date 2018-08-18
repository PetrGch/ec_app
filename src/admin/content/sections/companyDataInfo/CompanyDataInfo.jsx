import React from 'react';
import {Col, Input, Row} from "antd";

import './companyDataInfo.less';
import {changeCompanyDataInfoValue} from "../../../../action/companyDataInfo";
import {nullValidator} from "../../../../common/util/valueValidator";
import ValidatorInput from "../../../../common/validator/ValidatorInput";

const { TextArea } = Input;

export default class CompanyDataInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueOnChange = this.handleValueOnChange.bind(this);
  }

  handleValueOnChange(name, value) {
    const { dispatch, companyId, isNewCompany } = this.props;
    dispatch(changeCompanyDataInfoValue(companyId, name, value, isNewCompany));
  }

  render() {
    const { exchangeCompanyDetail, validateInput } = this.props;

    return (
      <div className="companyDataInfo">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={4}>Email:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(exchangeCompanyDetail, "email")}
              placeholder="Email"
              name="email"
              validationOption={{length: 50, email: true, validateInput}}
              onChange={this.handleValueOnChange}
            />
          </Col>
          <Col span={4}/>
          <Col span={7}/>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={4}>Phone:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(exchangeCompanyDetail, "phone")}
              placeholder="Phone"
              name="phone"
              validationOption={{length: 20, isNumeric: true}}
              onChange={this.handleValueOnChange}
            />
          </Col>
          <Col span={4}/>
          <Col span={7}/>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={4}>Website:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={Input}
              value={nullValidator(exchangeCompanyDetail, "website")}
              placeholder="Website"
              name="website"
              validationOption={{length: 50}}
              onChange={this.handleValueOnChange}
            />
          </Col>
          <Col span={4}/>
          <Col span={7}/>
        </Row>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={4}>Description:</Col>
          <Col span={7}>
            <ValidatorInput
              InputComponent={TextArea}
              value={nullValidator(exchangeCompanyDetail, "description")}
              rows={6}
              name="description"
              placeholder="Description"
              validationOption={{length: 50}}
              onChange={this.handleValueOnChange}
            />
          </Col>
          <Col span={4}/>
          <Col span={7}/>
        </Row>
      </div>
    );
  }
}