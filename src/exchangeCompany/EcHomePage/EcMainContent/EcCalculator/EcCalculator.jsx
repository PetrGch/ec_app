import React from 'react';
import { translate } from 'react-i18next';

import EcCalculatorNavigation from './EcCalculatorNavigation/EcCalculatorNavigation';
import EcCalculatorSlider from "./EcCalculatorSlider/EcCalculatorSlider";

import './ecCalculator.less';


class EcCalculator extends React.Component {
  render() {
    const { dispatch, currencyAmount, isBuyStatus, t } = this.props;

    return (
      <div className="ecCalculator">
        <h1 className="ecCalculator__title">
          { t('excurrate.title', { city: "London" }) }
        </h1>
        <div className="ecCalculator__content">
          <EcCalculatorNavigation
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
          />
          <EcCalculatorSlider
            dispatch={dispatch}
            currencyAmount={currencyAmount}
          />
        </div>
      </div>
    );
  }
}

export default translate('common')(EcCalculator);