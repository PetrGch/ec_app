import {notification} from "antd/lib/index";
import {ACCESS_TOKEN, API_URL} from "../../../common/util/AppConstance";
import {request} from "../../../common/util/APIUtil";

export const editCompanyService = {
  selectCompanyById: function(companies, id) {
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
  updateCompanyInfo: function(companyId, companyData) {
    request({
      url: `${API_URL}/company/${companyId}`,
      method: 'PUT',
      body: JSON.stringify(companyData)
    }).then(response => {
      notification.success({
        message: 'EC',
        description: 'Company data was updated successfully!'
      });
    }).catch(error => {
      notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
};
