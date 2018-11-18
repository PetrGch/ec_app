import {connect} from "react-redux";

import EcHeader from "./EcHeader";
import {setBranchRout} from "../../action/rout";

const mapStateToProps = (state, props) => {
  return {
    homeRout: state.rout.homeRout,
    branchRout: state.rout.branchRout
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBranchRout(branchRout) {
      dispatch(setBranchRout(branchRout))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcHeader);