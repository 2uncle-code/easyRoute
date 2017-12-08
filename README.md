# express-easy-router
more easy and flexible router for node express

## quick start
```
var express = require('express');
var app = express();

var easyRoute= require('./index');
easyRoute.get('/abc','./page@index');
easyRoute.bind(app);
```
## examples


### Router with controller's file path and action
```
 easyRoute.get('/abc','./page@index');
```
### Router as old fashiioned way,require the controller and action
```
  var page=require('./page');
 easyRoute.get('/page',page.about);
```
### Router with parameters
```
 easyRoute.get('/666/:name/',function(req,res){
	 res.send('hi,666'+req.params.name);
 });
```

 ### Router with middleware 
```
 easyRoute.get('/contact',function(req,res,next){
	 console.log('contact me')
	 next();
 },page.contact);
 ```
 ### Router with middleware group
```
 easyRoute.get('/bbc',[function(req,res,next){
	 console.log(888);
	 next();
 },function(req,res,next){
	 console.log(8888);
	 next();
 }],'./page@index');
 ```

 ### Route group with app level middleware
```
 easyRoute.group(function(req,res,next){
		console.log('hi!');
		next();
		});	
```		
### Route group with mount path and middleware 

```
easyRoute.group('/8888',function(req,res){
	 res.send('hi,there!');
 })
```
### Route group with mount path and routers 
```
 easyRoute.group('/888',function(){
	 easyRoute.get('/abc','./page@index');
	 easyRoute.get('/a',function(req,res){
		 res.send('you got it!');
	 });
 })
```
### Route group with mount path,middleware and router
```
 easyRoute.group('/admin',function(req,res,next){
	 console.log('who r u?');
	 next();
 },function(){
	 easyRoute.get('/user',function(req,res){
		 res.send("I'm a user!");
	 })
 })
```
 
  
