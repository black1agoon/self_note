
 var http = require('http');
 
var fs = require('fs');//引入文件读取模块
 
var documentRoot = './';//需要访问的文件的存放目录
 
var server= http.createServer(function(req,res){
 
  var url = req.url; 
  //客户端输入的url，例如如果输入localhost:9999/index.html
  //那么这里的url == /index.html
 
  var file = documentRoot + url;
  console.log(url);//node/www/index.html 
   
  /*
    file为文件路径
    function为回调函数,
    function的err为读取错误返回的信息，返回空就没有错误
    function的data为读取成功返回的文本内容
  */
  fs.readFile( file , function(err,data){
    if(err){
      res.writeHeader(404,{
        'content-type' : 'text/html;charset="utf-8"'
      });
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      res.end();
    }else{
      res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"'
      });
      res.write(data);//将index.html显示在客户端
      res.end();
    }
 
  });
 
}).listen(9999);
 
console.log('服务器开启成功...');
 