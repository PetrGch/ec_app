import expressRateLimit from "express-rate-limit";
import {saveLog} from "./logger";

export default expressRateLimit({
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