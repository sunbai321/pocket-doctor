import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { Http,Jsonp, Headers} from '@angular/http';  
import { ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-hospital',
  templateUrl: 'hospital.html',
})
export class HospitalPage {

  constructor(public viewCtrl: ViewController,public modalCtrl:ModalController,public http:Http ,public jsonp:Jsonp,public navCtrl: NavController, public navParams: NavParams) {
  }
  headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
  arr=[];
  officeName;
  ngOnInit(){
    let office =this.navParams.get('officeID');
    this.http.post('http://192.168.230.144:8080/doctorList',JSON.stringify({doctorID:office}),{headers:this.headers}).subscribe(
      data=>{
        console.log(JSON.parse(data['_body']));
        this.arr=JSON.parse(data['_body']);
        this.officeName=this.arr[0].officeName;
      }
    )
  }
  back(){
    this.viewCtrl.dismiss();
  }
  
}
