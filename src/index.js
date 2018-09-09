import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './app/App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from "./router/ScrollToTop";

import './index.less';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
