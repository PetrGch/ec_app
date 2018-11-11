import React from 'react';

import EcSideBar from "../EcHomePage/EcSideBar/EcSideBar";
import EcMainCompanyContent from "./EcMainCompanyContent/EcMainCompanyContent";
import BlockWrapper from "../../common/BlockWrapper/BlockWrapper";

import './ecCompany.less';

export default class EcCompany extends React.PureComponent {
  componentDidMount() {
    const { loadCompany, selectedCurrency, findCompanyByBranchName, companies, match: { params } } = this.props;
    if (companies === null) {
      loadCompany(params.name);
    } else {
      findCompanyByBranchName(params.name, companies, selectedCurrency);
    }
  }

  render() {
    const {
      company,
      isBuyStatus,
      selectedCurrency,
      selectedCompanyCurrency,
      currencyTypes,
      filteredCurrency,
      dispatch
    } = this.props;

    return company ? (
      <div className="ecCompany">
        <EcMainCompanyContent
          dispatch={dispatch}
          company={company}
          isBuyStatus={isBuyStatus}
          currencyTypes={currencyTypes}
          selectedCurrency={selectedCurrency}
          selectedCompanyCurrency={selectedCompanyCurrency}
          filteredCurrency={filteredCurrency}
        />
        <EcSideBar
          isBuyStatus={isBuyStatus}
        />
      </div>
    ) : (
      <BlockWrapper>
        <div className="ecCompany__noCompany">Sorry! No company have been found</div>
      </BlockWrapper>
    );
  }
}
