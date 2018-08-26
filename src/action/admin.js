import {DELETE_COMPANY_BY_ID, GET_ALL_COMPANIES} from '../constant/admin';
import {request} from '../common/util/APIUtil';
import {API_URL} from '../common/util/AppConstance';

export function deleteCompanyById(companyId) {
  return (dispatch) => {
    request({
      url: `${API_URL}/company/${companyId}`,
      method: 'DELETE'
    }).then(() => {
      dispatch({
        type: DELETE_COMPANY_BY_ID,
        companyId: companyId
      });
    });
  };
}

export function getAllCompanies() {
  return (dispatch) => {
    request({
      url: `${API_URL}/company`,
      method: 'GET'
    }).then((companies) => {
      dispatch({
        type: GET_ALL_COMPANIES,
        companies
      });
    });
  };
}