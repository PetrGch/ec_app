import React from 'react';
import { translate } from 'react-i18next';

import EcCalculatorNavigation from './EcCalculatorNavigation/EcCalculatorNavigation';
import EcCalculatorSlider from "./EcCalculatorSlider/EcCalculatorSlider";

import './ecCalculator.less';

const cities = {
  th: "กรุงเทพฯ",
  en: "Bangkok"
};

class EcCalculator extends React.Component {
  render() {
    const {
      dispatch,
      currencyAmount,
      isBuyStatus,
      currencyTypes,
      selectedCurrency,
      lng,
      t
    } = this.props;

    return (
      <div className="ecCalculator">
        <h1 className="ecCalculator__title">
          { t('companies.title', { city: cities[lng] }) }
        </h1>
        <div className="ecCalculator__content">
          <EcCalculatorNavigation
            dispatch={dispatch}
            isBuyStatus={isBuyStatus}
            currencyTypes={currencyTypes}
            selectedCurrency={selectedCurrency}
            translate={t}
          />
          <EcCalculatorSlider
            dispatch={dispatch}
            currencyAmount={currencyAmount}
            translate={t}
          />
        </div>
      </div>
    );
  }
}

export default translate('common')(EcCalculator);