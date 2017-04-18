import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  tapEatDrink(event) {
    this.navCtrl.push(NearbyPage);
  }

  tapCreateNew() {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
