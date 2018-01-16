var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;  // 当前环境变量下的port,没有的话取config.build下的port

var app = express();
var router = express.Router();
router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);


var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);
app.use(express.static('./dist'));   // 设置静态目录 2个参数，如果path没有设置，泽defaults to "/"



module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
