var mysql = require('mysql');
var express=require('express');
var qs = require('querystring');
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
    database:'mysql01',
    multipleStatements:true
});


app.get('/hospital',function(req,res){
  pool.query('select * from `hospital`',function(error,results,fields){
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
var data5;
var enddata5;
var data6;
var enddata6;
var data7;
var enddata7;

app.post('/office',function(req,res){
    req.on('data',function(data){
      data1=data.toString('utf8');
      enddata1=data1.slice(9);});
    req.on('end',function(){
           pool.query({
              sql:'select * from  `office` where `Hname`=?',
              values:[enddata1]},
              function(error,results){
                  res.send(results);
              });
    });
});

app.post('/doctorList',function(req,res){
    req.on('data',function(data){
      data2=data.toString('utf8');
      enddata2=data2.slice(9);
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
      enddata3=data3.slice(9);
    });
    req.on('end',function(){
      pool.query({sql:'select `DoctorID`,`officeID`,`Dname`,`Ddirection`,`specialty`,`orderNum`,`curreentNum`,`pic` from `doctor`,`office` where `DoctorID`=? and `officeID`=?',
      values:[enddata3,enddata3]},
      function(error,results){
          res.send(results);
      });
    });  
});

var office_ID,office_name,doc_name,Hname_ID,H_name;
app.post('/reservation_list',function(req,res){
    req.on('data',function(data){
      data4=data.toString('utf8');
      enddata4=data4.slice(9);
    });
    req.on('end',function(){
        pool.query({sql:'select DOid,Dname from doctOr where DoctorID=?',
          values:[enddata4]},
          function(error,results){
            office_ID=results[0].DOid;
            doc_name=results[0].Dname;
            //console.log('科室ID：',office_ID,'医生id:',enddata4,'医生的名字：',doc_name);
           
            pool.query({sql:'select Hname,officeName from office where officeID=?',
              values:[office_ID]},
              function(error,results){
                Hname_ID=results[0].Hname; 
                office_name=results[0].officeName;
                //console.log('医院ID：',Hname_ID,'科室名字：',office_name);
                
                pool.query({sql:'select hospitalName from hospital where hospitalID=?',
                  values:[Hname_ID]},
                  function(error,results){
                    H_name=results[0].hospitalName;
                    //console.log('医院名称:',H_name);
                  });    
              });         
            res.send([Hname_ID,office_ID,enddata4,H_name,office_name,doc_name]);
        });  
    });
});



app.post('/patient_get',function(req,res){
  req.on('data',function(data){
    data5=data.toString('utf8');
    enddata5=data5.slice(10);
    console.log(enddata5);
  });
  req.on('end',function(){
    pool.query({sql:'select * from patient where user_id=?',values:[enddata5]},function(error,results){
      console.log(results);
      res.send(results);
    });
  });
});

var date01;
var date02;
app.post('/reservation_date',function(req,res){
  req.on('data',function(data){
     data6=data.toString('utf8');
    enddata6=data6.slice(9);
    console.log(enddata6);
  });
  req.on('end',function(){
    pool.query({sql:'select DoctorDate from doctor where DoctorID=?',values:[enddata6]},function(error,results){
      date01=results[0].DoctorDate;
      console.log('预约日期ID:',results);
       pool.query({sql:'select date1,date2,date3,date4 from date where doctorDate_id=?',values:[date01]},function(error,results){
        console.log('预约日期:',results);
        res.send(results);
      });
    });
  });
});

var name,card,page,ptel;
app.post('/add_patient',function(req,res){
  req.on('data',function(data){
    data7=qs.parse(data.toString('UTF8'));
    console.log('=========');
    console.log(data7);
     userid=data7.userid;
     name=data7.name;
     card=data7.card;
     page=data7.page;
     ptel=data7.ptel;

  });
  req.on('end',function(){
    pool.query('insert into patient set?',{user_id:userid,patientName:name,IDcard:card,patientAge:page,patientTel:ptel},function(error,results){
      if(error) throw error;
      console.log(results.insertId);
      res.send('插入成功');
    });
  });
});
app.listen(8080);
