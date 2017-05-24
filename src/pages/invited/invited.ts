import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HapphourProvider } from "../../providers/happhour";
import { UserProvider } from "../../providers/user";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private happHourProvider: HapphourProvider,
    private userProvider: UserProvider) {
  }

  ownerHapps: HappHourModel[];
  invitedHapps: HappHourModel[];
  inactiveHapps: HappHourModel[];

  ionViewDidEnter() {
    this.happHourProvider.getActiveHappHours().subscribe(model => {
      let userId = this.userProvider.user.id;
      this.ownerHapps = model.filter((item) => item.creator.id === userId);
      this.invitedHapps = model.filter((item) => {
        let notCreator = item.creator.id !== userId;
        let invited = item.invited ? item.invited.some(inv => inv.id === userId) : false;
        return notCreator && invited;
      });
    },
      error => {
        console.error(`erro ao selecionar eventos ativos: ${JSON.stringify(error)}`);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitedPage');
    this.userProvider.loadUser();
  }

}
