var fs = require('fs');
var obj;
fs.readFile('dados.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});