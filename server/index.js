import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from "../src/app/App";
import {StaticRouter} from "react-router-dom";
import configureStore from "../src/store/configureStore";
import {Provider} from "react-redux";

const app = express();
const PORT = process.env.PORT || 3000;
const store = configureStore();

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const sourceDirectory = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

app.use(express.static(`http://excurrate.com:8082/public/${sourceDirectory}`));

app.get('/*', (req, res) => {
    console.log(sourceDirectory);
    const context = {};
    const app = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    const indexFile = `http://excurrate.com:8082/public/${sourceDirectory}/index.html`;
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