import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HapphourProvider } from "../../providers/happhour";
import { HappHourModel } from "../../model/models";

/*
  Generated class for the Invited page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-invited',
  templateUrl: 'invited.html'
})
export class InvitedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private happHourProvider: HapphourProvider) { }

  activeHapps: HappHourModel[];
  inactiveHapps: HappHourModel[];

  ionViewDidEnter() {
    this.activeHapps = [];
    this.happHourProvider.getActiveHappHours().subscribe(model => {
      this.activeHapps.push(model);
    },
      error => {
        console.error(`erro ao selecionar eventos ativos: ${JSON.stringify(error)}`);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitedPage');
  }

}
