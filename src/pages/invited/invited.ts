import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Refresher } from 'ionic-angular';
import { HapphourProvider } from "../../providers/happhour";
import { UserProvider } from "../../providers/user";
import { HappHourModel, MyHappHourModel } from "../../model/happhour-model";


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

  activeHapps: MyHappHourModel[] = [];
  inactiveHapps: MyHappHourModel[] = [];

  ionViewDidEnter() {
    this.happHourProvider.getActiveHappHours().subscribe(model => {
      let userId = this.userProvider.user.id;
      //happs que eu criei
      let owners = model.filter((item) => item.creator.id === userId);
      owners.forEach(happ => {
        happ.isOwner = true;
        happ.me = userId;
      });
      //happs que fui convidado
      let invited = model.filter((item) => {
        let notCreator = item.creator.id !== userId;
        let invited = item.invited ? item.invited.some(inv => inv.id === userId) : false;
        return notCreator && invited;
      });
      invited.forEach(happ => {
        happ.me = userId;
        happ.isGuest = true;
      });
      this.activeHapps = owners.concat(invited);
    },
      error => {
        console.error(`erro ao selecionar eventos ativos: ${JSON.stringify(error)}`);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitedPage');
    this.userProvider.loadUser();
  }

  doRefresh(refresher: Refresher) {
    refresher.complete();
  }

  refuseInvite(happ: MyHappHourModel) {
    console.log(JSON.stringify(happ));
  }

  goToDetails(happ: MyHappHourModel) {
    console.log('go details');
    this.navCtrl.push('HapphourDetailPage', { 'happhour': happ });
  }

  confirmInvite(happ: MyHappHourModel) {
    console.log(JSON.stringify(happ));
  }

  checkIn(happ: MyHappHourModel) {
    console.log(JSON.stringify(happ));
  }

  cancelHappHour(happ: MyHappHourModel) {
    console.log(JSON.stringify(happ));
  }

}
