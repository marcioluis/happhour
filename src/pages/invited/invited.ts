import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Refresher, Events, LoadingController } from 'ionic-angular';
import { HapphourProvider } from "../../providers/happhour";
import { UserProvider } from "../../providers/user";
import { MyHappHourModel } from "../../model/happhour-model";
import { Geolocation } from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: 'page-invited',
  templateUrl: 'invited.html'
})
export class InvitedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private happHourProvider: HapphourProvider,
    private userProvider: UserProvider, private events: Events, private geo: Geolocation, private loadCtrl: LoadingController) {
  }

  activeHapps: MyHappHourModel[] = [];
  inactiveHapps: MyHappHourModel[] = [];

  ionViewDidEnter() {
    this.selectActiveAndCountNewHapps();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitedPage');
    this.userProvider.loadUser();
  }

  selectActiveAndCountNewHapps() {
    this.happHourProvider.getActiveHappHours().subscribe(model => {
      this.activeHapps = model;
    },
      error => {
        console.error(`erro ao selecionar eventos ativos: ${JSON.stringify(error)}`);
      },
      () => this.countNewHapps());
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
    let count = 0;
    if (this.activeHapps.length)
      count = this.activeHapps.map(item => +item.isNew || 0).reduce((total, current) => total + current);

    this.events.publish('invited:count', count);
  }

  goToDetails(happ: MyHappHourModel) {
    happ.isNew = false;
    this.happHourProvider.saveHappHourLocal(happ).subscribe((model) =>
      this.navCtrl.push('HapphourDetailPage', { 'happhour': model }),
      error => { },
      () => this.countNewHapps());
  }

  refuseInvite(happ: MyHappHourModel) {
    happ.isNew = false;
    let loader = this.presentLoader();
    this.happHourProvider.refuseInvitation(happ).subscribe(
      model => happ = model,
      error => console.error(JSON.stringify(error)),
      () => loader.dismiss());
  }

  confirmInvite(happ: MyHappHourModel) {
    happ.isNew = false;
    let loader = this.presentLoader();
    this.happHourProvider.confirmInvitation(happ).subscribe(
      model => happ = model,
      error => console.error(JSON.stringify(error)),
      () => loader.dismiss());
  }

  async checkIn(happ: MyHappHourModel) {
    try {
      happ.isNew = false;
      let loader = this.presentLoader();
      let position = await this.geo.getCurrentPosition({ enableHighAccuracy: true });
      this.happHourProvider.checkinHappHour(happ, position.coords).subscribe(
        model => happ = model,
        error => console.error(JSON.stringify(error)),
        () => loader.dismiss());
    } catch (error) {
      console.error(JSON.stringify(error))
    }
  }

  cancelHappHour(happ: MyHappHourModel) {
    happ.isNew = false;
    let loader = this.presentLoader();
    this.happHourProvider.cancelHappHour(happ).subscribe(
      model => happ = model,
      error => console.error(JSON.stringify(error)),
      () => {
        this.selectActiveAndCountNewHapps();
        loader.dismiss();
      });
  }

  private presentError(error) {
    // let alert = this.alertCtrl.create({
    //   title: error.name,
    //   subTitle: error.message || JSON.stringify(error, null, '\t'),
    //   buttons: ['OK']
    // });
    // alert.present();
  }

  private presentLoader(message: string = 'Aguarde...') {
    let loader = this.loadCtrl.create({
      content: 'Aguarde...'
    });
    loader.present();
    return loader;
  }

}
