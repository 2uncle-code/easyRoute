import express from 'express';
import router from '.';

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