
  $(".close").click(function(){
    window.location.href='zhuye.html';
  });

  $("#zhuce").click(function(){
   window.location.href='zhuce.html';
  });


  $(".load").click(function(){
  	$.ajax({
      url:"http://datainfo.duapp.com/shopdata/userinfo.php",
      data:{status:"login",userID:$(".name").val(),password:$('.password').val()},
      success:function(data){
        if(data == 0){
          $(".name").val('');
           $('.password').val('');
          $(".name").attr('placeholder','用户名不存在');
        }
        else if(data==2){
            $('.password').val('');
            $(".password").attr('placeholder','用户密码不符');
        }
        else{
            localStorage.setItem('username',$(".name").val());
            console.log(localStorage.getItem('username'));
           window.location.href='zhuye.html';
        }
      }
    });
  });
