import {SET_BRANCH_ROUT} from "../constant/rout";

const initialState = {
  homeRout: '/',
  branchRout: null
};

export default function rout(state = initialState, action) {
  switch (action.type) {
    case SET_BRANCH_ROUT:
      return {...state, branchRout: action.branchRout};
    default:
      return state;
  }
}