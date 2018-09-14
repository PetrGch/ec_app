import React from 'react';

import {sizeType} from '../../../../../common/controlLib/util';
import {Dropdown, Radio} from '../../../../../common/controlLib';

import './ecCalculatorNavigation.less';
import {setBuyStatus} from "../../../../../action/companies";

const menu = [
  {
    index: 'EUR',
    value: 'EUR - Dollar USA'
  },
  {
    index: 'USD',
    value: 'USD'
  },
  {
    index: 'GBR',
    value: 'GBR'
  },
  {
    index: 'EUR_1',
    value: 'EUR - Dollar USA'
  },
  {
    index: 'USD_1',
    value: 'USD'
  },
  {
    index: 'GBR_1',
    value: 'GBR'
  }
];

export default class EcCalculatorNavigation extends React.PureComponent {
  render() {
    const { dispatch, isBuyStatus } = this.props;
    const changeBuyStatus = (event) => {
      if (event.target && event.target.value === "sell") {
        dispatch(setBuyStatus(false));
      } else if (event.target && event.target.value === "buy") {
        dispatch(setBuyStatus(true));
      }
    };

    return (
      <div className="ecCalculatorNavigation">
        <div className="ecCalculatorNavigation__action">
          <Radio
            value="buy"
            size={sizeType.LG}
            checked={isBuyStatus}
            name={'sellBuy'}
            onChange={changeBuyStatus}
          >Buy</Radio>
          <Radio
            value="sell"
            size={sizeType.LG}
            checked={!isBuyStatus}
            name={'sellBuy'}
            onChange={changeBuyStatus}
          >Sell</Radio>
        </div>
        <div className="ecCalculatorNavigation__currency">
          <Dropdown
            size={sizeType.LG}
            list={menu}
            selectedIndex={'GBR'}
          />
        </div>
      </div>
    );
  }
}