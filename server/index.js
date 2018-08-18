const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

app.use(express.static(resolveApp('./public/dev')));
app.get('*', (req, res) => {
    return res.sendFile(resolveApp('./public/dev/index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));