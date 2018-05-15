import { Component,ViewChild,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { List } from 'ionic-angular';
import { Http,Jsonp, Headers} from '@angular/http';  
import { HelloPage } from '../hello/hello';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
//   @ViewChild(List) list: List;
//   constructor(public http:Http ,public jsonp:Jsonp,public navCtrl: NavController,public alertCtrl: AlertController){  }
//   headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
//   arr=[];
//   username;
//   password;
//   ngOnInit() {
 
//       this.jsonp.get( 'http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSONP_CALLBACK' ).subscribe( data=>{ 

//         this.arr=data['_body'];
//         console.log(this.arr);
//         console.log(data);
//       } );
    
//   }
//  data;
  
//   load(){
       
//     this.http.post('http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+this.username+'&password='+this.password,JSON.stringify({}), {headers:this.headers} ).subscribe( data=>{
//       console.log(data['_body']);
//       this.data=data['_body'];
//       if(this.data == 0){
//         let alert = this.alertCtrl.create({
//           title: 'New Friend!',
//           subTitle: '用户名与密码不符!',
//           buttons: ['OK']
//         });
//         alert.present();
//       }
//       else if(this.data == 2){
//         let alert = this.alertCtrl.create({
//           title: '',
//           subTitle: '用户名不存在!',
//           buttons: ['OK']
//         });
//         alert.present();
//       }
//       else{
       
//           this.navCtrl.push(HelloPage,{'name':'su'});
//           console.log('tiaohzuan');
        
//       }
//    } );

//    console.log(this.password);
//    console.log(this.username);
//   }
//   goSub(){
//     this.navCtrl.push(HelloPage,{'name':'su'});
//     console.log('tiaohzuan');
//   }
//   zhuce(){
//     console.log('注册');
//   }
}
