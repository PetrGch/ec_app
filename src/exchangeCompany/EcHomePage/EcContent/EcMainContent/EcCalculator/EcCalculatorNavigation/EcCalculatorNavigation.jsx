import React from 'react';

import {sizeType} from '../../../../../../common/controlLib/util';
import {Dropdown, Radio} from '../../../../../../common/controlLib';

import './ecCalculatorNavigation.less';

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
    return (
      <div className="ecCalculatorNavigation">
        <div className="ecCalculatorNavigation__action">
          <Radio size={sizeType.LG} name={'sellBuy'}>Buy</Radio>
          <Radio size={sizeType.LG} name={'sellBuy'}>Sell</Radio>
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