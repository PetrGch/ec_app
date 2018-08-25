import React from 'react';
import {Input, Row, Col, Checkbox} from "antd";
import {changeParserValue} from "../../../../action/parser";

import './ParserData.less';
import moment from "moment/moment";
import ValidatorInput from "../../../../common/validator/ValidatorInput";

function nullValidator(field, subField, defaultValue = "") {
  if (field && field[subField]) {
    return field[subField];
  }
  return defaultValue;
}

export default class ParserData extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleValueOnChange = this.handleValueOnChange.bind(this);
  }

  handleValueOnChange(name, value) {
    const { dispatch, companyId } = this.props;
    dispatch(changeParserValue(companyId, name, value || checked));
  }

  render() {
    const { parserData } = this.props;

    return (
      <div className="parserData">
        <div className="parserData__title">
          <h2>Parser</h2>
        </div>
        <div className="parserData__form parserDataForm">
          <Row type="flex" justify="space-between" align="middle">
            <Col span={4}>Url*:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "url")}
                placeholder="URL"
                name="url"
                validationOption={{length: 120}}
                onChange={this.handleValueOnChange}
              />
            </Col>
            <Col span={4}>Parameters:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "parameters")}
                placeholder="Parameters"
                name="parameters"
                validationOption={{length: 120}}
                onChange={this.handleValueOnChange}
              />
            </Col>
          </Row>
          <Row type="flex" justify="space-between" align="middle">
            <Col span={4}>Row selector:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "rowSelector")}
                placeholder="Row selector"
                name="rowSelector"
                validationOption={{length: 60}}
                onChange={this.handleValueOnChange}
              />
            </Col>
            <Col span={4}/>
            <Col span={7}/>
          </Row>
          <Row type="flex" justify="space-between" align="middle">
            <Col span={4}>Currency amount:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "currencyAmountSelector")}
                placeholder="Currency amount"
                name="currencyAmountSelector"
                validationOption={{length: 60}}
                onChange={this.handleValueOnChange}
              />
            </Col>
            <Col span={4}>Currency type:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "currencyTypeSelector")}
                placeholder="Currency type"
                name="currencyTypeSelector"
                validationOption={{length: 60}}
                onChange={this.handleValueOnChange}
              />
            </Col>
          </Row>
          <Row type="flex" justify="space-between" align="middle">
            <Col span={4}>Buy selector:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "buySelector")}
                placeholder="Buy selector"
                name="buySelector"
                validationOption={{length: 60}}
                onChange={this.handleValueOnChange}
              />
            </Col>
            <Col span={4}>Sell selector:</Col>
            <Col span={7}>
              <ValidatorInput
                InputComponent={Input}
                value={nullValidator(parserData, "sellSelector")}
                placeholder="Sell selector"
                name="sellSelector"
                validationOption={{length: 60}}
                onChange={this.handleValueOnChange}
              />
            </Col>
          </Row>
          <Checkbox
            name="active"
            onChange={this.handleValueOnChange}
            checked={nullValidator(parserData, "active", false)}
          >Active</Checkbox>
        </div>
      </div>
    );
  }
}