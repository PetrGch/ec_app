import {SET_BRANCH_ROUT} from "../constant/rout";

export function setBranchRout(branchRout) {
  return {
    branchRout,
    type: SET_BRANCH_ROUT
  }
}
