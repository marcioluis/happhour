import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private googlePlus: GooglePlus) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.googlePlus.login()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

}
