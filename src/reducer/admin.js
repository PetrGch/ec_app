import {DELETE_COMPANY_BY_ID, GET_ALL_COMPANIES} from '../constant/admin';
import {mockData} from '../admin/content/company/companyColumnConfig';
import {CHANGE_CURRENCY_VALUE, SELECT_UNSELECT_CURRENCY, SET_INITIAL_CURRENCY_STATE} from '../constant/currencyRate';
import {
  changeCompanyDataInfoValue,
  changeCompanyMainInfoValue,
  changeCurrencyValue, changeParserValue, changeWorkingTimeValue, deleteCommentaryById, selectUnselectCurrency,
  setInitialCompanyMainInfoState,
  setInitialCurrencyState, setInitialParserState
} from './dataProcessors';
import {CHANGE_PARSER_VALUE, SET_INITIAL_PARSER_STATE} from '../constant/parser';
import {DELETE_COMMENTARY_BY_ID} from '../constant/commentary';
import {
  CHANGE_COMPANY_MAIN_INFO_VALUE, CHANGE_WORKING_TIME_VALUE,
  SET_INITIAL_COMPANY_MAIN_INFO_STATE
} from '../constant/companyMainInfo';
import {CHANGE_COMPANY_DATA_INFO_VALUE} from '../constant/companyDataInfo';

const initialState = {
  companies: [],
  newCompany: {
    workingTime: {},
    exchangeCompanyDetail: {}
  }
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      action.companies.forEach(company => company.key = company.uniqueId);
      return {...state, companies: action.companies};
    case DELETE_COMPANY_BY_ID:
      const companies = state.companies.filter(company => {
        return company.id !== action.companyId;
      });
      return {...state, companies};
    case CHANGE_CURRENCY_VALUE:
      return {...state, companies: changeCurrencyValue(state.companies, action)};
    case SELECT_UNSELECT_CURRENCY:
      return {...state, companies: selectUnselectCurrency(state.companies, action)};
    case SET_INITIAL_CURRENCY_STATE:
      return {...state, companies: setInitialCurrencyState(state.companies, action)};
    case CHANGE_PARSER_VALUE:
      return {...state, companies: changeParserValue(state.companies, action)};
    case SET_INITIAL_PARSER_STATE:
      return {...state, companies: setInitialParserState(state.companies, action)};
    case DELETE_COMMENTARY_BY_ID:
      return {...state, companies: deleteCommentaryById(state.companies, action)};
    case SET_INITIAL_COMPANY_MAIN_INFO_STATE:
      if (action.isNewCompany) {
        return {...state, newCompany: action.companyMainInfo};
      }
      return {...state, companies: setInitialCompanyMainInfoState(state.companies, action)};
    case CHANGE_COMPANY_MAIN_INFO_VALUE:
      if (action.isNewCompany) {
        const newCompany = {...state.newCompany};
        if (action.value) {
          newCompany[action.fieldName] = action.value;
        } else {
          delete newCompany[action.fieldName];
        }
        return {...state, newCompany};
      }
      return {...state, companies: changeCompanyMainInfoValue(state.companies, action)};
    case CHANGE_WORKING_TIME_VALUE:
      if (action.isNewCompany) {
        const newCompany = {...state.newCompany};
        if (action.value) {
          newCompany.workingTime[action.fieldName] = action.value;
        } else {
          delete newCompany.workingTime[action.fieldName];
        }
        return {...state, newCompany};
      }
      return {...state, companies: changeWorkingTimeValue(state.companies, action)};
    case CHANGE_COMPANY_DATA_INFO_VALUE:
      if (action.isNewCompany) {
        const newCompany = {...state.newCompany};
        if (action.value) {
          newCompany.exchangeCompanyDetail[action.fieldName] = action.value;
        } else {
          delete newCompany.exchangeCompanyDetail[action.fieldName];
        }
        return {...state, newCompany};
      }
      return {...state, companies: changeCompanyDataInfoValue(state.companies, action)};
    default:
      return state;
  }
}
