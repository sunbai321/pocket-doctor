var mysql = require('mysql');
var express=require('express');
var app = express();
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-Requested-With');
    res.header('Access-control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By','3.2.1');
    res.header('Content-Type','application/json;charset=urf-8');
    next();

});

var pool =mysql.createPool({
  host:'10.7.82.243',
    user:'root',
    password:'',
    port:'3306',
    database:'mysql01'
});



var data1;
var enddata1;
var data2;
var enddata2;

app.post('/user',function(req,res){
	
    req.on('data',function(data){
      data1=data.toString('utf8');
      enddata1=data1.slice(9);
    });
      req.on('data',function(data){
      data2=data.toString('utf8');
      console.log(data2);
      enddata2=data2.slice(9);
      console.log(enddata2);
    });
    pool.query({
      sql:'insert into user(userTel,userPWD)',
      values:[enddata1,enddata2],
      function(error,results){
          console.log(results);
          res.send(results);
      });
  
});


app.listen(8080);
