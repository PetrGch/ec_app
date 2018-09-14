import {
  FIND_COMPANY_BY_NAME,
  LOAD_COMPANY_BY_NAME,
  SET_BUY_STATUS,
  SET_BUY_STATUS_FOR_COMPANY,
  SET_SUM_AMOUNT
} from "../constant/ecHomePage";

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true,
  company: null
};

export default function company(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMPANY_BY_NAME:
    case FIND_COMPANY_BY_NAME:
      return {...state, company: action.company};
    case SET_BUY_STATUS_FOR_COMPANY:
      return {...state, isBuyStatus: action.isBuyStatus};
    case SET_SUM_AMOUNT:
      return {...state, currencyAmount: action.currencyAmount};
    default:
      return state;
  }
}