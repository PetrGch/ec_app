import path from 'path';
import fs from 'fs';
import express from 'express';
import i18nextExpress from "i18next-express-middleware";
import compression from "compression";

import expressRateLimit from "./midleWare/expressRateLimit";
import router from "./router/router";
import i18nextLanguageDetector from "./midleWare/i18NextLanguageDetector";

const app = express();
const PORT = process.env.PORT || 3000;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const isProdMode = process.env.NODE_ENV === 'production';

// --------- express-rate-limit -----------
app.use("*", expressRateLimit);
// --------- express-rate-limit -----------

// --------- i18n -------------------------
app.use(i18nextExpress.handle(i18nextLanguageDetector,
  {
    // ignoreRoutes: ["/foo"],
    removeLngFromUrl: false
  })
);
// --------- i18n -------------------------

app.use(compression());
app.use("/static", express.static(isProdMode ? resolveApp(`./static/`) : resolveApp(`./dist/static/`)));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
