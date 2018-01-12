//检查所写内容的格式是否正确
  $(document).ready(function(){
   var fn1=document.getElementById("fn1");
   var aaa=document.getElementById("aaa");
   var fn2=document.getElementById("fn2");
   var bbb=document.getElementById("bbb");
   var fn3=document.getElementById("fn3");
   var ccc=document.getElementById("ccc");
   fn1.onblur=function(){
     if(fn1.value==''){
      aaa.innerHTML="手机号不能为空！"
     }
    else{
    	 if(fn1.value.length!=11){     
            aaa.innerHTML="手机号必须为11位";    
         } 
         else{
         	 aaa.innerHTML='';
         }
    }
  }

 
   fn2.onblur=function(){
     if(fn2.value.length<6){     
      bbb.innerHTML="密码不得少于6位！";    
     } 
      else{
      	bbb.innerHTML='';
      }
   }
   fn3.onblur=function(){
    if(fn3.value!=fn2.value){
      ccc.innerHTML="密码不一致！";
    }
    else{
       ccc.innerHTML='';
    }
 }

});

//和后台进行交互，检查内容的正确性
 $('#btn').click(function(){
   	     var aa=$("#fn1").val();
       	 var bb=$("#fn2").val();
		$.ajax({
		 	type:'post',
		 	url:'http://192.168.91.144:8080/add_user',
		     data:{userTel:aa,userPWD:bb},
		
	 	    success:function(data){
	 	    	console.log(data);
	
	    	    

	    	      
	       },
	    	 
	
	      error:function(){
            alert("error");
           }
	 	

		});
    });


        	             
  