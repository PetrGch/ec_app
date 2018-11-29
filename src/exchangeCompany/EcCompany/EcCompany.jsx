import React from 'react';
import {Helmet} from "react-helmet";

import EcSideBar from "../EcHomePage/EcSideBar/EcSideBar";
import EcMainCompanyContent from "./EcMainCompanyContent/EcMainCompanyContent";

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
      isCompanyLoading,
      isCompaniesLoading,
      dispatch,
      match: { params }
    } = this.props;

    return (
      <div className="ecCompany">
        <Helmet>
          <title>Foreign currency rates {`in ${params.branch_name}` || ""} | ExCurRate</title>
        </Helmet>

        <EcMainCompanyContent
          dispatch={dispatch}
          company={company}
          isBuyStatus={isBuyStatus}
          currencyTypes={currencyTypes}
          selectedCurrency={selectedCurrency}
          selectedCompanyCurrency={selectedCompanyCurrency}
          filteredCurrency={filteredCurrency}
          isLoad={isCompaniesLoading || isCompanyLoading}
        />

        <EcSideBar
          companies={companies}
          isBuyStatus={isBuyStatus}
          isCompaniesLoading={isCompaniesLoading}
        />
      </div>
    );
  }
}
