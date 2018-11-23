const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use("/test/*", function(req, res) {
  console.log(req.params)
  res.send("hi some")
});

app.use("/test", function(req, res) {
  console.log(req.params);
  res.send("hi test")
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
