var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;  // 当前环境变量下的port,没有的话取config.build下的port

var app = express();

app.get('/aaa', function(req, res) {
  res.send('hello world');
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
