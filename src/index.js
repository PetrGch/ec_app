import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import App from './app/App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from "./router/ScrollToTop";
import i18n from "./common/i18next/i18next";

import './index.less';

const store = configureStore();

ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <I18nextProvider i18n={i18n}>
          <App/>
        </I18nextProvider>
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
