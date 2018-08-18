import {ACCESS_TOKEN, API_URL} from './AppConstance';

export const JSON_RES_TYPE = "json";
export const TEXT_RES_TYPE = "text";

export const request = (options, resType = JSON_RES_TYPE) => {
  const headers = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response => {
      if (resType === TEXT_RES_TYPE) {
        return response.text().then(text => {
          if (!response.ok) {
            return Promise.reject(text);
          }
          return text;
        })
      }
      return response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    });
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return request({
    url: API_URL + '/user/me',
    method: 'GET'
  });
}

export function login(loginRequest) {
  return request({
    url: API_URL + '/auth/signin',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}