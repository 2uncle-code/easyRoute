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
 }],'./page@index');
/*easyRoute.group('/888',function(req,res){
	 res.send('hi,there!');
 })*/
 easyRoute.group('/888',function(){
	 easyRoute.get('/abc','./page@index');
	 easyRoute.get('/a',function(req,res){
		 res.send('you got it!');
	 });
 })
 
 easyRoute.bind(app);
 
 
 /*var router = express.Router();
 router.get('/events', function(req, res, next) {
  res.send('666')
});
 app.use('/b',function(req,res,next){
	 console.log(666)
	 next();
 },router)*/
 /*
 */
 
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})