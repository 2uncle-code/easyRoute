var express = require('express');


var app = express();

var easyRoute= require('./easyRoutes');


 easyRoute.get('/abc','./page@index');
 easyRoute.get('/666/:name/',function(req,res){
	 res.send('hi,666'+req.params.name);
 });
 easyRoute.get('/bbc',[function(req,res,next){
	 console.log(888);
	 next();
 },function(req,res,next){
	 console.log(8888);
	 next();
 }],'./page@index')
 
 easyRoute.bind(app);
 
 
 
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})