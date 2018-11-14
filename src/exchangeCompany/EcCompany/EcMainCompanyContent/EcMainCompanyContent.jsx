import React from 'react';
import moment from "moment/moment";

import BlockWrapper from "../../../common/BlockWrapper/BlockWrapper";
import {nullValidator} from "../../../common/util/valueValidator";
import EcMainCompanyCalculate from "./EcMainCompanyCalculate/EcMainCompanyCalculate";
import EcMainCompanyMap from "./EcMainCompanyMap/EcMainCompanyMap";
import EcMainCompanyDetail from "./EcMainCompanyDetail/EcMainCompanyDetail";

import './ecMainCompanyContent.less';

export default class EcMainCompanyContent extends React.PureComponent{
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
      dispatch
    } = this.props;

    return (
      <div className="ecMainCompanyContent">
        <BlockWrapper>
          <div className="ecMainCompanyContent__header">
            <div>
              <h1>{nullValidator(company, 'company_name')}</h1>
              <h2>{nullValidator(company, 'branch_name')}</h2>
            </div>
            <span>Last update: {this.updateDate}</span>
          </div>
          <div className="ecMainCompanyContent__calculator">
            <EcMainCompanyCalculate
              dispatch={dispatch}
              company={company}
              isBuyStatus={isBuyStatus}
              currencyTypes={currencyTypes}
              selectedCurrency={selectedCurrency}
              selectedCompanyCurrency={selectedCompanyCurrency}
              filteredCurrency={filteredCurrency}
            />
          </div>
          <div className="ecMainCompanyContent__map">
            <EcMainCompanyMap
              filteredCurrency={filteredCurrency}
              company={company}
            />
          </div>
          <div className="ecMainCompanyContent__footer">
            <EcMainCompanyDetail
              filteredCurrency={filteredCurrency}
              company={company}
            />
          </div>
        </BlockWrapper>
      </div>
    );
  }
}