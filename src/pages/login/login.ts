import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Settings } from '../../providers/settings';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private googlePlus: GooglePlus,
    private settings: Settings, private loadCtrl: LoadingController) { }

  resposta = "g googlePlus";

  doGoogleLogin() {
    this.googlePlus.login({
      profiles: 'profile email',
      webClientId: '784220670042-ib1ssv1utfr1c4cvfs67t7n9tgkck2vk.apps.googleusercontent.com',
      offline: true
    })
      .then(res => {
        this.resposta = JSON.stringify(res);
      })
      .catch(err => {
        console.error(err);
        this.resposta = 'error: ' + JSON.stringify(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.settings.load()
    .then(result => console.log(JSON.stringify(this.settings.settings, null, '\t')));    
  }

}
