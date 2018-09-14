import {LOAD_ALL_COMPANIES, SET_BUY_STATUS, SET_SUM_AMOUNT} from "../constant/ecHomePage";

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true,
  companies: null
};

export default function companies(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_COMPANIES:
      return {...state, companies: action.companies};
    case SET_BUY_STATUS:
      return {...state, isBuyStatus: action.isBuyStatus};
    case SET_SUM_AMOUNT:
      return {...state, currencyAmount: action.currencyAmount};
    default:
      return state;
  }
}