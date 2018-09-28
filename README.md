# express-easy-router
More easy and flexible router for node express.



1. Group express routes and middlewares with mount path,


Made with a lot of love and tissue papers!  :)

Find me at:

https://github.com/vtista/easyRoute
## Quick Start




1. **npm install express-easy-router**


1. create **index.js**  

        import express from 'express';
		import router from 'express-easy-router';

		let app = express(); 
		router.get('/hi',(req,res)=>{
		res.send('hi');
		})

		router.group('/user',(req,res,next)=>{
		console.log('this is it!');
		next();
		},()=>{
		router.get('/name',(req,res)=>{
			res.send('mark');
		});
		router.get('/age',(req,res)=>{
			res.send('18');
		})
		});
		router.bind(app);
		let server = app.listen(8088, function () {
		
		let host = server.address().address
		let port = server.address().port
		
		console.log(" http://%s:%s", host, port)
		
		})
	     
	     
	    

1. **node index.js**

	
	You shall see the  message now!



Happy coding! 

:) 
  
