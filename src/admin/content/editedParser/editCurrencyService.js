import {notification} from "antd/lib/index";
import {API_URL} from "../../../common/util/AppConstance";
import {request, TEXT_RES_TYPE} from "../../../common/util/APIUtil";

export const editParserService = {
  selectCompanyById: function selectCompanyById(companies, id) {
    let foundCompany = null;
    companies.some(company => {
      if (company.id.toString() === id) {
        foundCompany = company;
        return true;
      }
      return false;
    });
    return foundCompany;
  },
  updateParserData: function(companyId, initialParserData) {
    request({
      url: `${API_URL}/parser?companyId=${companyId}`,
      method: 'PUT',
      body: JSON.stringify(initialParserData)
    }).then(response => {
      notification.success({
        message: 'EC',
        description: 'Parser data was updated successfully!'
      });
    }).catch(error => {
      notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  },
  checkParseResult: function(companyId) {
    return request({
      url: `${API_URL}/parser/checkParser?companyId=${companyId}`,
      method: 'GET'
    }, TEXT_RES_TYPE);
  }
};
