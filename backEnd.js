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
  host:'10.7.92.243',
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
var data8;
var data9;
var enddata9;
var data10;
var enddata10;

app.post('/office',function(req,res){
    req.on('data',function(data){
      data1=data.toString('utf8');
      enddata1=JSON.parse(data1);
    });
    req.on('end',function(){
           pool.query({
              sql:'select * from  `office` where `Hname`=?',
              values:[enddata1.officeID]},
              function(error,results){
                console.log(results);
                  res.send(results);
              });
    });
});

app.post('/doctorList',function(req,res){
    req.on('data',function(data){
      data2=data.toString('utf8');
      enddata2=JSON.parse(data2);
      console.log(enddata2);
    });
    req.on('end',function(){
      pool.query({
      sql:'select `DoctorID`,`officeID`,`Dname`,`Ddirection`,`Hname`,`officeName`,`Pic`,`goods` from `doctor`,`office` where `DOid`=? and `officeID`=?',
      values:[enddata2.doctorID,enddata2.doctorID]},
      function(error,results){
          console.log(results);
          res.send(results);
      });
    });
});

app.post('/doctor',function(req,res){

    req.on('data',function(data){
      data3=data.toString('utf8');
      enddata3=JSON.parse(data3);
    });
    req.on('end',function(){
      pool.query({sql:'select `DoctorID`,`officeID`,`Dname`,`Ddirection`,`specialty`,`orderNum`,`curreentNum`,`pic` from `doctor`,`office` where `DoctorID`=? and `officeID`=?',
      values:[enddata3.doctorID,enddata3.doctorID]},
      function(error,results){
          res.send(results);
      });
    });  
});

var office_ID,office_name,doc_name,Hname_ID,H_name;
app.post('/reservation_list',function(req,res){
    req.on('data',function(data){
      data4=data.toString('utf8');
      enddata4=JSON.parse(data4);
    });
    req.on('end',function(){
		    pool.query({sql:'select DOid,Dname,Pic from doctOr where DoctorID=?',
		      values:[enddata4.doctorID]},
		      function(error,results){
		        office_ID=results[0].DOid;
		        doc_name=results[0].Dname;
            doc_pic=results[0].Pic;
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
		        res.send([{hID:Hname_ID,officeID:office_ID,doctorID:enddata4.doctorID,hname:H_name,officeName:office_name,docname:doc_name,pic:doc_pic}]);
		    });  
    });
});



app.post('/patient_get',function(req,res){
  req.on('data',function(data){
    data5=data.toString('utf8');
    enddata5=JSON.parse(data5);
  });
  req.on('end',function(){
    pool.query({sql:'select * from patient where user_id=?',values:[enddata5.patientID]},function(error,results){
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
    enddata6=JSON.parse(data6);

  });
  req.on('end',function(){
    pool.query({sql:'select DoctorDate from doctor where DoctorID=?',values:[enddata6.doctorID]},function(error,results){
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
      res.send('success');
    });
  });
});
var ruserid;
var rhosid;
var roffid;
var rdocid;
var rpatid;
var amount;
var rdate;
app.post('/add_reservation',function(req,res){
  req.on('data',function(data){
    data8=qs.parse(data.toString('utf8'));
    console.log(data8);
    ruserid=data8.Ruserid;
    rhosid=data8.Rhospital;
    rdocid=data8.Rdoctor;
    rpatid=data8.Rpatient;
    amount=data8.Ramount;
    rdate=data8.date;
  });
  req.on('end',function(){
    pool.query('insert into reservation set?',{Ruserid:ruserid,Rhospital:rhosid,Rdoctor:rdocid,Rpatient:rpatid,amount:amount,date:rdate},function(error,results){
        if(error) throw error;
        console.log(results.insertId);
    });
  });
});

var num;
var userTel;
var userPWD;
app.post('/add_user',function(req,res){

    req.on('data',function(data){
      data9=qs.parse(data.toString('utf8'));
      userTel=data9.userTel;
      userPWD=data9.passPWD;
      console.log('手机号码：',userTel);
      console.log('用户密码：',userPWD);
    });
     req.on('end',function(){
        pool.query({sql:'select userID from `user` where userTel=?',values:[userTel]},function(error,results,fields){
          var d1=results.toString('UTF8');
           if(d1===''){
             num='1';
            console.log('结果为空');
            pool.query('insert into user set?',{userTel:userTel,userPWD:userPWD},function(error,results){
              if(error) throw error;
              else{
                
                console.log(results.insertId);
                res.end('1');
              }
            });
           } 
           else{
           console.log('已经有这个用户了');
           res.end('2');
           }
        });
     });  
});
var userTel1;
var userPWD1;
app.post('/validate_user',function(req,res){
  req.on('data',function(data){
      data10=qs.parse(data.toString('utf8'));
      userTel1=data10.userTel;
      userPWD1=data10.userPWD;
      console.log('手机号码：',userTel1);
      console.log('用户密码：',userPWD1);
    });
     req.on('end',function(){
        pool.query({sql:'select userID from `user` where userTel=?',values:[userTel1]},function(error,results,fields){
          var d1=results.toString('UTF8');
           if(d1===''){
            console.log('该用户没有注册');
            res.end('0');
           } 
           else{
            pool.query({sql:'select userID from `user` where userTel=? AND userPWD=?',values:[userTel1,userPWD1]},function(error,results){
              var d2=results.toString('utf8');
              if(d2===''){
                console.log('密码不正确');
                res.end('1')
              }
              else{
                console.log('用户名密码匹配');
                res.end('2');
              }
            });
           
           }
        });
     });
});

app.get('/get_faction',function(req,res){
  pool.query('select * from `faction`',function(error,results,fields){
          res.send(results);
            
  });
    

});
app.post('/clique',function(req,res){
  req.on('data',function(data){
    var data11=qs.parse(data.toString('utf8'));
    var Cfactionid = data11.Cfactionid;
    console.log(Cfactionid);
    pool.query({
      sql:'select * from `clique` where Cfactionid=?',
      values:[Cfactionid]
    },function(error,results,fields){
      res.send(results);
    });
  });
});
app.listen(8080);
