import React from 'react';

import EcSideBar from "../EcHomePage/EcSideBar/EcSideBar";
import EcMainCompanyContent from "./EcMainCompanyContent/EcMainCompanyContent";
import BlockWrapper from "../../common/BlockWrapper/BlockWrapper";

import './ecCompany.less';

export default class EcCompany extends React.PureComponent {
  componentDidMount() {
    const {
      loadCompany, loadAllCompanies, selectedCurrency, setBranchRout,
      findCompanyByBranchName, companies, match: { params }
    } = this.props;

    if (companies === null || companies.length === 0) {
      loadCompany(params.branch_name);
      loadAllCompanies();
    } else {
      findCompanyByBranchName(params.branch_name, companies, selectedCurrency);
    }
    setBranchRout(params.branch_name);
  }

  render() {
    const {
      company,
      companies,
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
          companies={companies}
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
