import React from 'react';
import moment from "moment/moment";
import {translate} from "react-i18next";

import BlockWrapper from "../../../common/BlockWrapper/BlockWrapper";
import {nullValidator} from "../../../common/util/valueValidator";
import EcMainCompanyCalculate from "./EcMainCompanyCalculate/EcMainCompanyCalculate";
import EcMainCompanyMap from "./EcMainCompanyMap/EcMainCompanyMap";
import EcMainCompanyDetail from "./EcMainCompanyDetail/EcMainCompanyDetail";

import './ecMainCompanyContent.less';

class EcMainCompanyContent extends React.PureComponent{
  get updateDate() {
    const { company } = this.props;
    if (company && company.updated_at) {
      return moment(company.updated_at).format('LT');
    }

    return '--//--';
  }

  render() {
    const {
      company,
      isBuyStatus,
      currencyTypes,
      selectedCurrency,
      selectedCompanyCurrency,
      filteredCurrency,
      isLoad,
      dispatch,
      t
    } = this.props;

    return (
      <main className="ecMainCompanyContent">
        <BlockWrapper isLoad={isLoad}>
          <div className="ecMainCompanyContent__header">
            <div>
              <h1>{nullValidator(company, 'company_name')}</h1>
              <h2>{nullValidator(company, 'branch_name')}</h2>
            </div>
            <span>{t("companies.lastUpdate")}: {this.updateDate}</span>
          </div>
          { company ?
            <div>
              <div className="ecMainCompanyContent__calculator">
                <EcMainCompanyCalculate
                  dispatch={dispatch}
                  company={company}
                  isBuyStatus={isBuyStatus}
                  currencyTypes={currencyTypes}
                  selectedCurrency={selectedCurrency}
                  selectedCompanyCurrency={selectedCompanyCurrency}
                  filteredCurrency={filteredCurrency}
                  translate={t}
                />
              </div>
              <div className="ecMainCompanyContent__map">
                <EcMainCompanyMap
                  filteredCurrency={filteredCurrency}
                  company={company}
                  translate={t}
                />
              </div>
              <div className="ecMainCompanyContent__footer">
                <EcMainCompanyDetail
                  filteredCurrency={filteredCurrency}
                  company={company}
                  translate={t}
                />
              </div>
            </div> : null
          }
        </BlockWrapper>
      </main>
    );
  }
}

export default translate('common')(EcMainCompanyContent);
