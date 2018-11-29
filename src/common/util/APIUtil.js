export const JSON_RES_TYPE = 'json';
export const TEXT_RES_TYPE = 'text';

export const request = (options, resType = JSON_RES_TYPE) => {
  const headers = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
  });

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
        });
      }
      return response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    }, ex => console.log(ex)).catch(ex => console.error(ex));
};
