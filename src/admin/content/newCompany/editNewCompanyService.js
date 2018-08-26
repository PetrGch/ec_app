import {notification} from 'antd/lib/index';
import {API_URL} from '../../../common/util/AppConstance';
import {request} from '../../../common/util/APIUtil';

export const editNewCompanyService = {
  createNewCompany: function(newCompany) {
    request({
      url: `${API_URL}/company`,
      method: 'POST',
      body: JSON.stringify(newCompany)
    }).then(response => {
      notification.success({
        message: 'EC',
        description: 'New company created successfully!'
      });
    }).catch(error => {
      notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
};
