import path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from "../src/app/App";
import {StaticRouter} from "react-router-dom";
import configureStore from "../src/store/configureStore";
import {Provider} from "react-redux";

import expressRateLimit from "express-rate-limit";

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

app.use("/static", express.static(resolveApp(`./public/${sourceDirectory}/static/`)));

function saveLog (nick, command) {
  const file = `${nick}.log`;
  const datetime = '[' + new Date() + '] ';
  const text = datetime + command + '\r\n';
  fs.appendFile(file, text, function (err) {
    if (err) return console.log(err);
    console.log('successfully appended "' + text + '"');
  });
}

app.get('*', (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  const indexFile = resolveApp(`./public/${sourceDirectory}/index.html`);
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
