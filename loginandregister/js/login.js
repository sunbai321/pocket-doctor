   //检查所写内容的格式是否正确
  $(document).ready(function(){
   var fn1=document.getElementById("fn1");
   var aaa=document.getElementById("aaa");
   var fn2=document.getElementById("fn2");
   var bbb=document.getElementById("bbb");
   
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
   


});
