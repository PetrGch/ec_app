import {notification} from "antd/lib/index";
import {API_URL} from "../../../common/util/AppConstance";
import {request} from "../../../common/util/APIUtil";

export const editCommentaryService = {
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
  updateCommentaryData: function(companyId, currencyRate) {
    request({
      url: `${API_URL}/currency/${companyId}`,
      method: 'PUT',
      body: JSON.stringify(currencyRate)
    }).then(response => {
      notification.success({
        message: 'EC',
        description: 'Currency data was updated successfully!'
      });
    }).catch(error => {
      notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  },
};
