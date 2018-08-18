import React from 'react';
import {Icon, Row, Col, Button} from 'antd';
import {editCommentaryService} from "./editCommentaryService";
import CommentaryData from "../sections/commentaryData/CommentaryData";

export default class EditedCommentaryForm extends React.Component {
  get editCommentaryService() {
    return editCommentaryService;
  }

  get getCompanyById() {
    const { match: {params}, companies } = this.props;
    return this.editCommentaryService.selectCompanyById(companies, params.id);
  }

  render() {
    const { dispatch, match: {params} } = this.props;
    const company = this.getCompanyById;

    return company
      ? <div>
        <h1><Icon type="profile" /> {`Company ${params.id}`}</h1>
        <div>
          <CommentaryData
            companyId={params.id}
            dispatch={dispatch}
            commentaries={company.comments}
          />
        </div>
      </div>
      : <Alert message="Commentaries don't exist" type="error" />
  }
}
