import {DELETE_COMMENTARY_BY_ID} from "../constant/commentary";
import {notification} from "antd/lib/index";
import {request} from "../common/util/APIUtil";
import {API_URL} from "../common/util/AppConstance";

export function deleteCommentaryById(companyId, commentaryId) {
  return (dispatch) => {
    request({
      url: `${API_URL}/commentary/${commentaryId}`,
      method: 'DELETE'
    }).then(response => {
      dispatch({
        type: DELETE_COMMENTARY_BY_ID,
        commentaryId: commentaryId,
        companyId
      });
      notification.success({
        message: 'EC',
        description: 'Commentary was deleted successfully!'
      });
    }).catch(error => {
      notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
}
