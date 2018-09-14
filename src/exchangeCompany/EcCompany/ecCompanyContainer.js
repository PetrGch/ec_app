import {connect} from 'react-redux';

import EcCompany from "./EcCompany";
import {findCompanyByName, loadCompanyByName} from "../../action/company";

const mapStateToProps = state => {
  return {
    company: state.company.company,
    companies: state.companies.companies,
    isBuyStatus: state.company.isBuyStatus,
    currencyAmount: state.company.currencyAmount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadCompany(name) {
      dispatch(loadCompanyByName(name))
    },
    findCompanyByName(name, companies) {
      dispatch(findCompanyByName(name, companies));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcCompany);