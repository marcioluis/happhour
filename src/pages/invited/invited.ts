import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Refresher, Events } from 'ionic-angular';
import { HapphourProvider } from "../../providers/happhour";
import { UserProvider } from "../../providers/user";
import { HappHourModel, MyHappHourModel } from "../../model/happhour-model";

@IonicPage()
@Component({
  selector: 'page-invited',
  templateUrl: 'invited.html'
})
export class InvitedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private happHourProvider: HapphourProvider,
    private userProvider: UserProvider, private events: Events) {
  }

  activeHapps: MyHappHourModel[] = [];
  inactiveHapps: MyHappHourModel[] = [];

  ionViewDidEnter() {
    this.happHourProvider.getActiveHappHours().subscribe(model => {
      this.activeHapps = model;
    },
      error => {
        console.error(`erro ao selecionar eventos ativos: ${JSON.stringify(error)}`);
      },
      () => this.countNewHapps());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitedPage');
    this.userProvider.loadUser();
  }

  doRefresh(refresher: Refresher) {
    //FIXME: hardcode de contagem de eventos novos
    setTimeout(() => {
      this.countNewHapps();
      refresher.complete();
    }, 2550);
  }

  sync() {
    //TODO: deve sincronizar com o servidor recebendo e enviando os happhours desse usuario
  }

  /**
   * Publica um evento 'invited:count' com a quantidade de eventos novos
   * @param count quantidade de eventos novos
   */
  countNewHapps() {
    let count = this.activeHapps.map(item => +item.isNew || 0).reduce((total, current) => total + current);
    this.events.publish('invited:count', count);
  }

  refuseInvite(happ: MyHappHourModel) {
    console.log(JSON.stringify(happ));
  }

  goToDetails(happ: MyHappHourModel) {
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
