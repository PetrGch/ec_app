import React from 'react';
import {Helmet} from "react-helmet";
import express from 'express';
import path from 'path';
import fs from 'fs';
import request from 'request';

import configureStore from "../../src/store/configureStore";
import {createStoreWithCompanies, createStoreWithCompany} from "../service/storeService";
import {renderReactAppAsString} from "../service/reactAppService";
import {API_URL} from "../../src/common/util/AppConstance";

const router = express.Router({});

const isProdMode = process.env.NODE_ENV === 'production';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
let store = configureStore();

router.get("/service-worker.js", (req, res) => {
  const indexFile = isProdMode ? resolveApp(`./service-worker.js`) : resolveApp(`./dist/service-worker.js`);
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Something went wrong:', err);
    }

    res.type('.js');
    return res.send(data);
  });
});

router.get('/company/*', (req, res) => {
  const branchName = req.params["0"];
  request(`${API_URL}/exCompany/branch/${branchName}`, function (error, response, companiesString) {
    if (!error) {
      store = createStoreWithCompany(companiesString)
    } else {
      return res.status(500).send('Something went wrong:', error);
    }

    const app = renderReactAppAsString(req.url, store, req.i18n);
    const helmet = Helmet.renderStatic();

    const indexFile = isProdMode ? resolveApp(`./indexRoot.html`) : resolveApp(`./dist/indexRoot.html`);
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Something went wrong:', err);
      }

      return res.send(
        data
          .replace(
            /<title([a-z\s-="]*)?>([a-zA-Z\s|]*)?<\/title>/,
            helmet.title.toString()
          )
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  });
});

router.get('*', (req, res) => {
  request('https://api.excurrate.com/excompany', function (error, response, companiesString) {
    if (!error) {
      store = createStoreWithCompanies(companiesString)
    }

    const app = renderReactAppAsString(req.url, store, req.i18n);
    const helmet = Helmet.renderStatic();

    const indexFile = isProdMode ? resolveApp(`./indexRoot.html`) : resolveApp(`./dist/indexRoot.html`);
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Something went wrong:', err);
      }

      return res.send(
        data
          .replace(
            /<title([a-z\s-="]*)?>([a-zA-Z\s|]*)?<\/title>/,
            helmet.title.toString()
          )
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  });
});

export default router;