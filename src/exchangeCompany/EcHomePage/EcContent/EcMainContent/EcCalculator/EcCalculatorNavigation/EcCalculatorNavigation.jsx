import React from 'react';
import {Menu} from "antd";

import {sizeType} from "../../../../../../common/controlLib/util";
import {Button, Dropdown, Radio} from "../../../../../../common/controlLib";

import './ecCalculatorNavigation.less';

const menu = (
  <ul>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
    <li>hi there</li>
  </ul>
);

export default class EcCalculatorNavigation extends React.PureComponent {
  render() {
    return (
      <div className="ecCalculatorNavigation">
        <div className="ecCalculatorNavigation__action">
          <Radio size={sizeType.LG} name={"sellBuy"}>Buy</Radio>
          <Radio size={sizeType.LG} name={"sellBuy"}>Sell</Radio>
        </div>
        <div className="ecCalculatorNavigation__currency">
          <Dropdown size={sizeType.LG} list={menu}>
            Currency type
          </Dropdown>
        </div>
      </div>
    );
  }
}