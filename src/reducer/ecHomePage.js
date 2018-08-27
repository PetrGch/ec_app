import {SET_BUY_STATUS, SET_SUM_AMOUNT} from "../constant/ecHomePage";

const initialState = {
  currencyAmount: 100,
  isBuyStatus: true
};

export default function ecHomePage(state = initialState, action) {
  switch (action.type) {
    case SET_BUY_STATUS:
      return {...state, isBuyStatus: action.isBuyStatus};
    case SET_SUM_AMOUNT:
      return {...state, currencyAmount: action.currencyAmount}
    default:
      return state;
  }
}