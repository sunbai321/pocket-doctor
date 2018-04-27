
    $('.click1').click(function(){
      window.location.href='zhuye.html';
    })
    var val1=$("#phonenumber1").val();
    var val2=$("#phonenumber2").val();
    var rge=/(\d{0}w+)|(w{0}\d+)/gi;
    var phonenumber=document.getElementById('phonenumber3');
  	
  	phonenumber.oninput=function(){
  		var telephone=$("#phonenumber3").val();

  		 console.log( telephone.length);
  		if(telephone.length == 11)
  		  $('#value').css('background-color','#31b8c4');
  	}

	phonenumber.onblur=function(){
	    var telephone=$("#phonenumber3").val();
	    var rge1= /[A-Z]/gi;
  
	     if(rge1.test(telephone)){
	      $("#phonenumber3").val('');
	      $("#phonenumber3").attr('placeholder','不能含有字母，请重新填写');
	      $("#value").attr('disabled','disabled');
	    }else if(telephone.length <11){
	      $("#phonenumber3").val('');
	      $("#phonenumber3").attr('placeholder','长度不够11位，请重新填写');
	      $("#value").attr('disabled','disabled');
	    }
	  }


    $("#phonenumber1").blur(function(){
    	var rge2=/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;

      if($("#phonenumber1").val().length>=6 && $("#phonenumber1").val().length<=20 && rge2.test($("#phonenumber1").val())){
          console.log($("#phonenumber1").val(),rge2.test($("#phonenumber1").val()));    
      }
      else{
      	 $("#phonenumber1").val('');
         $("#phonenumber1").attr('placeholder','6-20位字母、数字组合,请重新输入');
      }
    });

    $("#phonenumber2").blur(function(){
       if($("#phonenumber1").val() != $("#phonenumber2").val()){
         $("#phonenumber2").val('');
         $("#phonenumber2").attr('placeholder','密码不一致，请重新输入');
      }
    });

    
    $("#value").click(function(){
      console.log('dianjiel ');
     $.ajax({
	    url:"http://192.168.163.144:8080/add_user",
      type:'post',
      dataType:'json',
      data:{userTel:$("#phonenumber3").val(),passPWD:$("#phonenumber1").val()},
	    success:function(data){
  			
					console.log(data);
          if(data ==2){
            console.log('等于2 ，已经注册过',data);
            $("#phonenumber3").attr('placeholder','该手机号已注册过，请重新填写');
             $("#phonenumber3").val('');
            $("#phonenumber2").val('');
            $("#phonenumber1").val('');
          }
          else{
            $("#value").css("background-color",'rgb(222,61,150)');
            console.log('不等于2，没注册过',data);
            $(location).prop('href', 'denglu.html');
          }
			}
	    

  		});
    });
