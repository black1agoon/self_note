var express = require('express');


var app = express();
// var router = express.Router();
// router.get('/', function (req, res, next) {
//   req.url = '/index.html';
//   next();
// });

// app.use(router);


app.use(express.static('./'));   // 设置静态目录 2个参数，如果path没有设置，泽defaults to "/"


module.exports = app.listen(8080, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:8080')
});
