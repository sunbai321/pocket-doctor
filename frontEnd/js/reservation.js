var docid = location.hash.slice(1);
var reservation_userid=4;
var reservation_hosid;
var reservation_offid;
var reservation_docid;
var reservation_patid;
var amount=20;
var reservation_date;

//完成页面渲染
$.ajax({
	type:'post',
	url:'http://192.168.163.144:8080/reservation_list',
	dataType:'JSON',
	data:{doctorID:docid},
	success:function(data){
		reservation_hosid=data[0];
		reservation_offid=data[1];
		reservation_docid=data[2];
		$('.yiyuan1').html(data[3]);
		localStorage.setItem('hospitalName',data[3]);
		$('.name').html(data[5]+data[3]+data[4]);
		console.log(data);
	}
});

//更改就诊人弹框渲染信息
$.ajax({
		type:"post",
		url:'http://192.168.163.144:8080/patient_get',
		dataType:"JSON",
		data:{patientID:1},
		success:function(data){
			//
			for(var i=0;i<data.length;i++){
				$('.btnbtn').html($('.btnbtn').html()+`
					<button class='special_btn'>`+data[i].patientName+`</button>
				`);
				//console.log(data);
			}
			var btn_spe=$('.special_btn');
			for(var k=0;k<btn_spe.length;k++){
				(function(k){
					$(btn_spe[k]).click(function(){	
						reservation_patid=data[k].patientID;
						localStorage.setItem('patient_name',data[k].patientName);
						$(".patient_name").html(data[k].patientName);
						$('.sfz').html(data[k].IDcard);
						$(".sjh").html(data[k].patientTel);
						$('.special2').css('display','none');
					})
				})(k)
			}
		}
});

//点击更改，更改就诊人弹窗出现
$(".genggai").click(function(){
	$('.special2').css('display','block');
});


//点击取消，更改就诊人弹框消失
$('.quxiao2').click(function(){
	$('.special2').css('display','none');
});

//选择就诊时间弹框显示
$(".time1").click(function(){
	$(".special").css('display','block');
});


//完成就诊时间的获取
$.ajax({
	type:'post',
	url:'http://192.168.163.144:8080/reservation_date',
	dataType:'JSON',
	data:{doctorID:docid},
	success:function(data){

		$(".li1").html($('.li1').html()+data[0].date1);
		$(".li2").html($('.li2').html()+data[0].date2);
		$(".li3").html($('.li3').html()+data[0].date3);
		$(".li4").html($('.li4').html()+data[0].date4);
		var dateRadio=$('.date');
		dateRadio[0].value=data[0].date1;
		dateRadio[1].value=data[0].date2;
		dateRadio[2].value=data[0].date3;
		dateRadio[3].value=data[0].date4;

		//console.log(data);

		$(".srue").click(function(){
			for(var i=0;i<dateRadio.length;i++){
				(function(i){
					if(dateRadio[i].checked){
						$(".srue").attr('disabled',false);
						//存储预约日期
						reservation_date=$(dateRadio[i]).val();
						localStorage.setItem('rdate',reservation_date);
						console.log(reservation_date);
						$(".time1").html($(dateRadio[i]).val());
						$(".special").css('display','none');
					}
					else{
						$(".special").css('display','none');
						$(".srue").attr('disabled','disabled');
					}
				})(i)
			}
		});

		for(var j=0;j<dateRadio.length;j++){
				(function(j){
					$(dateRadio[j]).click(function(){
						if(dateRadio[j].checked){
							$(".srue").attr('disabled',false);
						}	
					})
				})(j)
			}

		$(".cancle").click(function(){
			for(var j=0;j<dateRadio.length;j++){
				(function(j){
					dateRadio.prop('checked',false);	
					$(".special").css('display','none');
				})(j)
			}
		});

	}
});


//显示添加就诊人弹框
$('.tianjia').click(function(){
	$('.special1').css('display','block');
});


//验证就诊人姓名
$('.pname').blur(function(){
	var rge=/[0-9]+/gi;
	var val1=$('.pname').val();
	if(rge.test(val1) || val1.length>20 || val1.length<1){
		$('.pname').val('');
		$('.pname').attr('placeholder','格式不对，请重新输入');
	}
});

//验证就诊人身份证号
$(".idcard").blur(function(){
	var rge2=/[a-z]{2,}/gi;
	var rge3=/[\u4E00-\u9FA5]+/g;
	var val2=$('.idcard').val();
	if(val2.length != 18){
		$(this).val('');
		$(this).attr('placeholder','身份证长度为18位，请重新输入');
	}
	else if(rge2.test(val2) ||rge3.test(val2)){
		$(this).val('');
		$(this).attr('placeholder','身份证格式错误，请重新输入');
		
	}
});

//验证就诊人年龄
$(".age").blur(function(){
	var rge4=/[a-z\u4E00-\u9FA5a-z]/gi;
	var val3=$(this).val();
	if(rge4.test(val3) || val3.length>3 || val3.length<1){
		$(this).val('');
		$(this).attr('placeholder','年龄格式错误，请重新输入');
	}
});

//验证手机号
$('.tel').blur(function(){
	var telephone=$(this).val();
	var rge1= /[A-Z]/gi;
	if(rge1.test(telephone)){
	      $(this).val('');
	      $(this).attr('placeholder','不能含有字母，请重新填写');

	    }else if(telephone.length <11){
	      $(this).val('');
	      $(this).attr('placeholder','长度不够11位，请重新填写');
	    }
});


//添加就诊人信息，发ajax

$(".tian").click(function(){
	console.log('发送成功');
	$.ajax({
		type:"post",
		url:'http://192.168.163.144:8080/add_patient',
		dataType:"JSON",
		data:{userid:1,name:$('.pname').val(),card:$('.idcard').val(),page:$('.age').val(),ptel:$('.tel').val()},
		success:function(data){
		}
	});
	$('.special1').css('display','none');
	$('.pname').val('');
	$('.idcard').val('');
	$('.age').val('');
	$('.tel').val('');
});


//点击取消，添加就诊人弹框消失
$('.quxiao1').click(function(){
	$('.special1').css('display','none');
});

//在更改就诊人弹框中选择添加就诊人
$(".btn1").click(function(){
	$('.special1').css('display','block');
	$('.special2').css('display','none');
	$(".tian").click(function(){
	console.log('发送成功,在更改');
	$.ajax({
		type:"post",
		url:'http://192.168.163.144:8080/add_patient',
		dataType:"JSON",
		data:{userid:2,name:$('.pname').val(),card:$('.idcard').val(),page:$('.age').val(),ptel:$('.tel').val()},
		success:function(data){	
		}
	});
	$('.special1').css('display','none');
	$('.pname').val('');
	$('.idcard').val('');
	$('.age').val('');
	$('.tel').val('');
});
});

//提交预约信息到后台，成功后实现页面跳转；
$('.tijiao').click(function(){
	console.log('dianjile ');
	var checkbox2=$('.checkbox1');
	if(checkbox2[0].checked){
		$('.tijiao').css('background-color','pink');
		$.ajax({
			type:"post",
			url:'http://192.168.163.144:8080/add_reservation',
			dataType:'json',
			data:{Ruserid:reservation_userid,Rhospital:reservation_hosid,Rdoctor:reservation_docid,Rpatient:reservation_patid,Ramount:amount,date:reservation_date},
			success:function(data){

			}

		});//ajax结束
		$(location).prop('href','reservation_success.html');
	}
})