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
    if (company && company.updatedAt) {
      return moment(company.updatedAt).format('LT');
    }

    return '--//--';
  }

  render() {
    const { company, isBuyStatus, dispatch } = this.props;

    return (
      <div className="ecMainCompanyContent">
        <BlockWrapper>
          <div className="ecMainCompanyContent__header">
            <h1>{nullValidator(company, 'name')}</h1>
            <span>Last update: {this.updateDate}</span>
          </div>
          <div className="ecMainCompanyContent__calculator">
            <EcMainCompanyCalculate
              dispatch={dispatch}
              company={company}
              isBuyStatus={isBuyStatus}
            />
          </div>
          <div className="ecMainCompanyContent__map">
            <EcMainCompanyMap
              company={company}
            />
          </div>
          <div className="ecMainCompanyContent__footer">
            <EcMainCompanyDetail
              company={company}
            />
          </div>
        </BlockWrapper>
      </div>
    );
  }
}