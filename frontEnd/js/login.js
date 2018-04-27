
  $(".close").click(function(){
    window.location.href='zhuye.html';
  });

  $("#zhuce").click(function(){
   window.location.href='register.html';
  });


  $(".load").click(function(){
  	$.ajax({
      url:"http://192.168.163.144:8080/validate_user",
      dataType:'json',
      type:'post',
      data:{userTel:$(".name").val(),userPWD:$('.password').val()},
      success:function(data){
        console.log(data);
        //0 用户名不存在 1  密码不正确 2  密码用户名匹配
        if(data == 0){
          $(".name").val('');
          $('.password').val('');
          $(".name").attr('placeholder','用户名不存在');
        }
        else if(data==1){
            $('.password').val('');
            $(".password").attr('placeholder','用户密码不符');
        }
        else{
            localStorage.setItem('username',$(".name").val());
            console.log(localStorage.getItem('username'));
           window.location.href='index.html';
       }
      }
    });
  });
