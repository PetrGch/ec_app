import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export function saveLog (nick, command) {
  const file = `${nick}.log`;
  const datetime = '[' + new Date() + '] ';
  const text = datetime + command + '\r\n';
  const dirPath = resolveApp(`./`);
  fs.appendFile(dirPath + '/' + file, text, function (err) {
    if (err) return console.log(err);
    console.log('successfully appended "' + text + '"');
  });
}