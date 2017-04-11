import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NearbyPage } from "../pages";

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) { }

  tapEatDrink(event) {
    // let alert = this.alertCtrl.create({
    //   title: 'Card tapped',
    //   subTitle: 'Fazer algo agora',
    //   buttons: ['OK']
    // });    
    // alert.present();
    this.navCtrl.push(NearbyPage);
  }

  tapCinema() {
    this.navCtrl.push(NearbyPage);
  }

  tapTourism() {
    this.navCtrl.push(NearbyPage);
  }

  tapCreateNew() {
    this.navCtrl.push(NearbyPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
