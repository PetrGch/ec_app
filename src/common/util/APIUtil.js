import React from "react";
import ReactDOM from "react-dom";

import spinner from "./spinner-white.svg";

export const JSON_RES_TYPE = 'json';
export const TEXT_RES_TYPE = 'text';

function fetchSpinner(newFetch) {
  fetchSpinner.listOfFetches.push(newFetch);

  if (document && fetchSpinner.listOfFetches.length !== 0) {
    ReactDOM.render(
      <div className="fetchModalWindow">
        <span
          className="fetchModalWindow__spinner"
          style={{backgroundImage: `url("${spinner}")`}}
        />
      </div>,
      document.getElementById('modal-root')
    );

    Promise.all(fetchSpinner.listOfFetches).then(() => {
      ReactDOM.render(
        null,
        document.getElementById("modal-root")
      );
    }, ex => {
      console.error(ex);
    });
  }
}
fetchSpinner.listOfFetches = [];

export const request = (options, resType = JSON_RES_TYPE) => {
  const headers = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
  });

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  const fetchRef = fetch(options.url, options)
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
  fetchSpinner(fetchRef);

  return fetchRef;
};
