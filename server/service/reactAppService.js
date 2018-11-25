import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import {Provider} from "react-redux";

import App from "../../src/app/App";

export function renderReactAppAsString(url, store, i18n) {
  const context = {};
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <I18nextProvider i18n={i18n}>
          <App/>
        </I18nextProvider>
      </StaticRouter>
    </Provider>
  );
}