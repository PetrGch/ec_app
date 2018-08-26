import {connect} from 'react-redux';
import EditedParserForm from './EditedParserForm';

const mapStateToProps = state => {
  return {
    companies: state.admin.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditedParserForm);