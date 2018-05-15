import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { Http,Jsonp, Headers} from '@angular/http';  
import { ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  constructor(public viewCtrl: ViewController,public modalCtrl:ModalController,public http:Http ,public jsonp:Jsonp,public navCtrl: NavController, public navParams: NavParams) {
  }
doctorID;
arr=[];
headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
ngOnInit(){
  this.doctorID =this.navParams.get('doctorID');
   
  this.http.post('http://192.168.230.144:8080/reservation_list',JSON.stringify({doctorID:this.doctorID}), {headers:this.headers}).subscribe(
    data=>{
      this.arr=JSON.parse(data['_body']);
     console.log(this.arr);

    }
  );
}
back(){
  this.viewCtrl.dismiss();
}

}
