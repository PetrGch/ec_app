import React from 'react';
import {Alert, Avatar, Card, Icon} from "antd";

import './CommentaryData.less';
import {deleteCommentaryById} from "../../../../action/commentary";

const {Meta} = Card;

function Like({isLiked, isDisliked}) {
  if (isLiked) {
    return (<Icon type="like" />);
  } else if (isDisliked) {
    return (<Icon type="dislike" />);
  }
  return null;
}

export default function CommentaryData({companyId, dispatch, commentaries}) {

  const mapedCommentaries = commentaries && commentaries.map(commentary => {
    const handleDeleteCommentary = () => {
      dispatch(deleteCommentaryById(companyId, commentary.id));
    };

    return (
      <div key={commentary.id} className="commentaryData__item">
        <Card
          style={{ width: 300 }}
          title={commentary.name}
          actions={[<Icon type="delete" onClick={handleDeleteCommentary} />]}
          extra={<Like isLiked={commentary.liked} isDisliked={commentary.dislike}/>}
        >
          <Meta
            title={commentary.title}
            description={commentary.text}
          />
        </Card>
      </div>
    );
  });

  return (
    <div className="commentaryData">
      {
        commentaries.length !== 0
          ? mapedCommentaries
          : <Alert message="There are no commentaries" type="info" />
      }
    </div>
  );
}