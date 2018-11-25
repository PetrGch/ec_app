import path from 'path';
import fs from 'fs';
import express from 'express';
import expressRateLimit from "express-rate-limit";

import React from 'react';
import {Helmet} from "react-helmet";
import i18next from "i18next";
import ReactDOMServer from 'react-dom/server';
import App from "../src/app/App";
import {StaticRouter} from "react-router-dom";
import configureStore from "../src/store/configureStore";
import {Provider} from "react-redux";
import i18nextExpress from "i18next-express-middleware";
import {I18nextProvider} from "react-i18next";


const app = express();
const PORT = process.env.PORT || 3000;
const store = configureStore();

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const sourceDirectory = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

// --------- express-rate-limit -----------
const indexHtml = expressRateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: "WTF!!! Stop this shit",
  skipFailedRequests: true,
  // handler: function (req, res, /*next*/) {
  //   res.status(500).send("WTF!!!");
  // },
  onLimitReached: function (req, res, options) {
    saveLog("ddos", `id: ${req.ip} - limit reached`);
  },
  // store: new RedisStore({
  //   // see Configuration
  // }),
});
app.use("/*", indexHtml);
// --------- express-rate-limit -----------

// --------- i18n -------------------------

i18next.use(i18nextExpress.LanguageDetector).init({
  preload: ["en", "th"],
  resources: {
    en: {
      common: require('./translations/en/common')
    },
    th: {
      common: require('./translations/th/common')
    }
  }
});

app.use(
  i18nextExpress.handle(i18next, {
    // ignoreRoutes: ["/foo"],
    removeLngFromUrl: false
  })
);

// --------- i18n -------------------------

function saveLog (nick, command) {
  const file = `${nick}.log`;
  const datetime = '[' + new Date() + '] ';
  const text = datetime + command + '\r\n';
  const dirPath = resolveApp(`./dist/`);
  fs.appendFile(dirPath + '/' + file, text, function (err) {
    if (err) return console.log(err);
    console.log('successfully appended "' + text + '"');
  });
}

app.use("/static", express.static(resolveApp(`./dist/static/`)));

app.get("/service-worker.js", (req, res) => {
  const indexFile = resolveApp(`./dist/service-worker.js`);
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!', err);
    }

    res.type('.js');
    return res.send(data);
  });
});

app.get('*', (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <I18nextProvider i18n={req.i18n}>
          <App/>
        </I18nextProvider>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  const indexFile = resolveApp(`./dist/indexRoot.html`);
  res.send(indexFile);
  // saveLog("logs", indexFile);
  // fs.readFile(indexFile, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Something went wrong:', err);
  //     return res.status(500).send('Oops, better luck next time!', err);
  //   }
  //
  //   return res.send(
  //     data
  //       .replace(
  //         /<title([a-z\s-="]*)?>([a-zA-Z\s|]*)?<\/title>/,
  //         helmet.title.toString()
  //       )
  //       .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  //   );
  // });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
