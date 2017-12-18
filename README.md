# express-easy-router
Group express routes,Create express routes By file path,Import express controllers and models,make your routes more easy and flexible.



1. Group express routes and middlewares with mount path,



1. Create routes By file path like in laravel,


1. Import express controllers and models,



1. Deeply extended with express orignal router,Which means what you can do in express router,You can do with express-easy-router.

Made with a lot of love and tissue papers!  :)

If you want to be involved,Or file some issues.Find me at:

https://github.com/vtista/easyRoute
## Quick Start




1. **npm install express-easy-router**


1. create **index.js**  

        var express = require('express');
	    var app = express();
	    var easyRoute= require('express-easy-router');
	    easyRoute.get('/abc',function(req,res){
	    	res.send('Welcome,express-easy-router!');
	    });
	    easyRoute.bind(app);
	    
	    var server = app.listen(8081, function () {
	     
	      var host = server.address().address
	      var port = server.address().port
	     
	      console.log(" http://%s:%s", host, port)
	     
	    })

1. **node index.js**
   
	Now open the browser,Navigate to http://localhost:8081/abc .
	
	You shall see the welcome message !

## Examples


### Router with controller's file path and action

 `easyRoute.get('/abc','./page@index');`

### Router as old fashioned way,require the controller and action

      var page=require('./page');
     easyRoute.get('/page',page.about);

### Router with parameters

     easyRoute.get('/666/:name/',function(req,res){
    	 res.send('hi,666'+req.params.name);
     });


### Router with middleware 

     easyRoute.get('/contact',function(req,res,next){
    	 console.log('contact me')
    	 next();
     },page.contact);
 
### Router with middleware group

     easyRoute.get('/bbc',[function(req,res,next){
    	 console.log(888);
    	 next();
     },function(req,res,next){
    	 console.log(8888);
    	 next();
     }],'./page@index');
 

### Route group with app level middleware

     easyRoute.group(function(req,res,next){
    		console.log('hi!');
    		next();
    		});	
    		
### Route group with mount path and middleware 


    easyRoute.group('/8888',function(req,res){
    	 res.send('hi,there!');
     })

### Route group with mount path and routers 

     easyRoute.group('/888',function(){
    	 easyRoute.get('/abc','./page@index');
    	 easyRoute.get('/a',function(req,res){
    		 res.send('you got it!');
    	 });
     })
    
### Route group with mount path,middleware and router

     easyRoute.group('/admin',function(req,res,next){
    	 console.log('who r u?');
    	 next();
     },function(){
    	 easyRoute.get('/user',function(req,res){
    		 res.send("I'm a user!");
    	 })
     })
    
##
For more info or try to dig deeper, 

You could find some more examples in examples.js located at package's root dir.

Happy coding! 

:) 
  
