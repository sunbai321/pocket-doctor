var userID=localStorage.getItem('userID');
if(userID){
   $('.shezhi').attr('href','shezhi.html');
   console.log('aaa');
 }
 else{
  $('.shezhi').attr('href','denglu.html');
 }