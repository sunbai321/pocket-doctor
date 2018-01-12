 if(!localStorage.getItem("username")){
	
	window.location.href="registerandlogin.html";
}

    var username=localStorage.getItem('username');
     $.ajax({
     	
		url:'http://datainfo.duapp.com/shopdata/getCar.php',
		dataType:'jsonp',
		data:{userID:username},
	    success:function(data){
	    	console.log(data);
	   
	        	for(var i=0;i<data.length;i++){
	    		 $(".content").html($(".content").html()+`<div class="first">
	    		     
                              <img class="tu" src=`+data[i].goodsListImg+` />
		    	               </div>
		    	               <div class="second">
	    	                       <p class="p2">`+data[i].goodsName+`</p>
	    	                       <p class="p3">`+'￥'+data[i].price+`</p>
	    	   
		        	               <p class="p3">数量：<input type="button" data-inline="true" value=`+data[i].number+`  class="num"> </p>
                              
		        	               <p class="p3">小计：<input type="text" data-inline="true" value=`+data[i].number*data[i].price+`  class="xiaoji">
		        	              </p>
	                               <input type="button" value="删除" class="del" goodID=`+data[i].goodsID+` />
                                    		m
                            
		    	   </div>` ) 
		    

	        	}
//	  删除商品
	        	 	
	           $('.del').click(function(){
			var goodsId=this.getAttribute('goodID');
			var username=localStorage.getItem('username');
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:{userID:username,goodsID:goodsId,number:0},
				success:function(data){
					console.log(data);
				   window.location="shoppingcart.html";
//      	 		alert('删除购物车商品成功!');
				}
			})
		
		})
	    
//	 价格总计
	    	var sum=0;
	    	
	    		 for(var i=0;i<data.length;i++){
	    		 	
	    		 	sum+=data[i].number*data[i].price;
	    		
	    		 }
	    		  $(".summ").html($(".summ").html()+`<div>
	    		       <p>总计：<input type="button" data-inline="true" value=`+sum+`  />
		        	            
		        	   </p>
		        	   
	    		  </div>`)
 
	    }

     })

	    
 
	    
	
 

	
	

	
	
	
	
	
	
	
	
	 
	    	
