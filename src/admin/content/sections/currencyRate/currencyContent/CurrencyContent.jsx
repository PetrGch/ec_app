import React from 'react';
import { Input, Row, Col } from 'antd';
import {nullValidator} from "../../../../../common/util/valueValidator";
import ValidatorInput from "../../../../../common/validator/ValidatorInput";

export default function CurrencyContent({currencyRate, handleValueOnChange}) {
  const mapedCurrency = currencyRate.map((currency, index) => {
    const handleOnChange = (name, value) => {
      handleValueOnChange(currency.currencyType, name, value)
    };

    return (
      <Row key={nullValidator(currency, "currencyType", index)}>
        <Col span={8}>
          <Input
            defaultValue={nullValidator(currency, "currencyName")}
            disabled={true}
          />
        </Col>
        <Col span={3}>
          <Input
            defaultValue={nullValidator(currency, "currencyType")}
            disabled={true}
          />
        </Col>
        <Col span={4}>
          <ValidatorInput
            InputComponent={Input}
            value={nullValidator(currency, "buyPrice")}
            placeholder="Buy price"
            name="buyPrice"
            validationOption={{length: 7, isNumeric: true}}
            onChange={handleOnChange}
          />
        </Col>
        <Col span={4}>
          <ValidatorInput
            InputComponent={Input}
            value={nullValidator(currency, "sellPrice")}
            placeholder="Sell price"
            name="sellPrice"
            validationOption={{length: 7, isNumeric: true}}
            onChange={handleOnChange}
          />
        </Col>
      </Row>
    );
  });

  return (
    <div>
      {mapedCurrency}
    </div>
  );
}