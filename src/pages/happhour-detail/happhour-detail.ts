import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHappHourModel } from "../../model/happhour-model";
import * as moment from "moment";


/**
 * Generated class for the HapphourDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-happhour-detail',
  templateUrl: 'happhour-detail.html',
})
export class HapphourDetailPage {

  happhour: MyHappHourModel = this.navParams.get('happhour');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HapphourDetailPage');
  }

  checkInHappHour() { }
  confirmHappHour() { }

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

}
