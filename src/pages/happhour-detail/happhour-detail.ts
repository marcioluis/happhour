import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHappHourModel } from "../../model/happhour-model";
import * as moment from "moment";
import { Geolocation } from "@ionic-native/geolocation";
import { HapphourProvider } from "../../providers/happhour";
import { InfoPresenter } from "../../providers/info-presenter";


@IonicPage()
@Component({
  selector: 'page-happhour-detail',
  templateUrl: 'happhour-detail.html',
})
export class HapphourDetailPage {

  happhour: MyHappHourModel = this.navParams.get('happhour');

  constructor(private happHourProvider: HapphourProvider, public navCtrl: NavController, public navParams: NavParams,
    private infoPresenter: InfoPresenter, private geo: Geolocation) {
  }

  ionViewDidLoad() {
  }

  async checkInHappHour() {
    //var loader = this.presentLoader();
    try {
      let happ = this.happhour;
      let position = await this.geo.getCurrentPosition({ enableHighAccuracy: true });
      this.happHourProvider.checkinHappHour(happ, position.coords).subscribe(
        model => happ = model,
        error => console.error(JSON.stringify(error)));
    } catch (error) {
      console.error(JSON.stringify(error))
    } finally {
      //loader.dismiss();
    }
  }

  confirmInvite() {
    // let loader = this.presentLoader();
    let happ = this.happhour;
    this.happHourProvider.confirmInvitation(happ).subscribe(
      model => happ = model,
      error => console.error(JSON.stringify(error)));
  }

  get placeLogo() {
    return this.happhour.place.logoUrl;
  }
  get placeName() {
    return this.happhour.place.nome;
  }
  get placeSubName() {
    return this.happhour.place.subNome;
  }
  get happHourDate() {
    let dataIso = this.happhour.date;
    return moment(dataIso).format('dddd, DD MMMM YYYY');
  }
  get isPontuavel() {
    return this.happhour.place.isPontuavel;
  }
  get isReservavel() {
    return this.happhour.place.isReservavel;
  }
  get isOnDemand() {
    return this.happhour.place.isHappyOnDemand;
  }
  get telefones() {
    return this.happhour.place.telefones;
  }
  get address() {
    return this.happhour.place.endereco;
  }
  get owner(): string {
    return this.happhour.creator.displayName;
  }
  get totalConvidados(): number {
    return this.happhour.invited ? this.happhour.invited.length : 0;
  }
  get totalConfirmados(): number {
    if (this.happhour.invited) {
      return this.happhour.invited.map(model => +model.isConfirmed || 0).reduce((total, value) => total + value);
    }
    else {
      return 0;
    }
  }
  get isConfirmed() {
    return this.happhour.isConfirmed;
  }

  get userHasCheckedIn() {
    return this.happhour.isCheckedin;
  }

  showConfirmation() {
    this.infoPresenter.showConfirmation();
  }

}
