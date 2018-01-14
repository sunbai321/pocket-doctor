var mySwiper = new Swiper('.swiper-container',{
	autoplay : 2000,

});
   
    $(function(){
          console.log(localStorage['user']);
      if(localStorage['user']){
        $(location).prop('href', 'index.html');
      }
    })

    var i=6;
    var timer=setInterval(function(){
    	 $('.timer').html(i);
       i--;
    },1000);

    setTimeout(function(){
    	clearInterval(timer);
    },6000);

    setTimeout(function(){
    	mySwiper.stopAutoplay();
      $("#btn").css('display','block');
    },6000);
    
    $('#btn').click(function(){
      localStorage.setItem('user','suyuanyuan');
      $(location).prop('href', 'zhuce.html');
    });


