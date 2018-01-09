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


app.get('/hospital',function(req,res){
  pool.query('select * from `hospital`',function(error,results,fields){
      console.log('医院信息：',results);
      res.send(results);
  });
  
});

var data1;
var enddata1;
var data2;
var enddata2;
var data3;
var enddata3;
var data4;
var enddata4;

app.post('/office',function(req,res){
    req.on('data',function(data){
      data1=data.toString('utf8');
      enddata1=data1.slice(9);});
    req.on('end',function(){
           pool.query({
              sql:'select * from  `office` where `Hname`=?',
              values:[enddata1]},
              function(error,results){
                  console.log(results);
                  res.send(results);
              });
  
});
});

app.post('/doctorList',function(req,res){
    req.on('data',function(data){
      data2=data.toString('utf8');
      console.log(data2);
      enddata2=data2.slice(9);
      console.log(enddata2);
    });
    req.on('end',function(){
      pool.query({
      sql:'select `DoctorID`,`officeID`,`Dname`,`Ddirection`,`officeName`,`Pic`,`goods` from `doctor`,`office` where `DOid`=? and `officeID`=?',
      values:[enddata2,enddata2]},
      function(error,results){
          console.log(results);
          res.send(results);
      });
      
    });
    
    
});

app.post('/doctor',function(req,res){
    req.on('data',function(data){
      data3=data.toString('utf8');
      console.log(data3);
      enddata3=data3.slice(9);
      console.log(enddata3);
    });
    req.on('end',function(){
      pool.query({sql:'select `DoctorID`,`officeID`,`Dname`,`Ddirection`,`specialty`,`orderNum`,`curreentNum`,`pic` from `doctor`,`office` where `DoctorID`=? and `officeID`=?',
      values:[enddata3,enddata3]},
      function(error,results){
          console.log(results);
          res.send(results);
      });
    });  
});


app.post('/reservation_list',function(req,res){
    req.on('data',function(data){
      data4=data.toString('utf8');
      console.log(data4);
      enddata4=data4.slice(9);
      console.log(enddata4);
    });
    req.on('end',function(){
      pool.query({sql:'select `doctor.Dname`,`hospital.hospitalName`,`office.officeName` ,`hospital.hospitalID` from `doctor`,`office`,`hospital` where `hospitalID` in( select `Hname` from `office` where  `officeID` in(  select `DOid`  from `doctor`  where `DoctorID`=?)  )   AND `officeID` in( select `DOid` from `doctor` where `DoctorID`=?)  AND `DoctorID`=? ',
      values:[enddata4,enddata4]},
      function(error,results){
          console.log(results);
          res.send(results);
      });
    });
});

app.listen(8080);
