import React from 'react';

import EcSideBar from "../EcHomePage/EcSideBar/EcSideBar";
import EcMainCompanyContent from "./EcMainCompanyContent/EcMainCompanyContent";

import './ecCompany.less';

export default class EcCompany extends React.PureComponent {
  componentDidMount() {
    const { loadCompany, findCompanyByName, companies, match: { params } } = this.props;
    if (companies === null) {
      loadCompany(params.name);
    } else {
      findCompanyByName(params.name, companies);
    }
  }

  render() {
    const { company, isBuyStatus, dispatch } = this.props;
    return (
      <div className="ecCompany">
        <EcMainCompanyContent
          dispatch={dispatch}
          company={company}
          isBuyStatus={isBuyStatus}
        />
        <EcSideBar
          isBuyStatus={isBuyStatus}
        />
      </div>
    );
  }
}
