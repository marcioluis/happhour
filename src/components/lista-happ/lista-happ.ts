import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MyHappHourModel } from "../../model/happhour-model";
import * as moment from "moment";

/**
 * Generated class for the ListaHappComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lista-happ',
  templateUrl: 'lista-happ.html'
})
export class ListaHappComponent {

  @Input()
  happsActives: MyHappHourModel[];
  @Input()
  happsInactives: MyHappHourModel[];

  _happsOwner: MyHappHourModel[];
  _happsGuest: MyHappHourModel[];

  @Output()
  happConfirmed = new EventEmitter<MyHappHourModel>();
  @Output()
  happRefused = new EventEmitter<MyHappHourModel>();
  @Output()
  happDetailed = new EventEmitter<MyHappHourModel>();
  @Output()
  happCheckedIn = new EventEmitter<MyHappHourModel>();
  @Output()
  happCanceled = new EventEmitter<MyHappHourModel>();

  constructor() {
  }

  get ownerHapps() {
    return this._happsOwner = this.happsActives.filter(item => item.isOwner);
  }

  get guestHapps() {
    return this._happsGuest = this.happsActives.filter(item => item.isGuest);
  }

  getPlaceLogo(happ: MyHappHourModel) {
    return happ.place.logoUrl;
  }

  getName(happ: MyHappHourModel) {
    return happ.name;
  }

  getHappDate(happ: MyHappHourModel) {
    let dataIso = happ.date;
    return moment(dataIso).format('dddd, DD MMMM');
  }

  userIsConfirmed(happ: MyHappHourModel) {
    return happ.isConfirmed;
  }

  trackByHapps(index: number, item: MyHappHourModel) {
    return item.id;
  }

  refuseHappHour(happ: MyHappHourModel) {
    happ.isRefused = true;
    happ.isConfirmed = false;
    this.happRefused.emit(happ);
  }

  cancelHappHour(happ: MyHappHourModel) {
    happ.isActive = false;
    this.happCanceled.emit(happ);
  }

  detailHappHour(happ: MyHappHourModel) {
    this.happDetailed.emit(happ);
  }

  confirmHappHour(happ: MyHappHourModel) {
    happ.isConfirmed = true;
    happ.isRefused = false;
    this.happConfirmed.emit(happ);
  }

  checkInHappHour(happ: MyHappHourModel) {
    happ.isCheckedin = true;
    this.happCheckedIn.emit(happ);
  }
}
