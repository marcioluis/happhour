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
  happsOwner: MyHappHourModel[] = [];
  @Input()
  happsAntigos: MyHappHourModel[] = [];
  @Input()
  happsConvidado: MyHappHourModel[] = [];

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
    console.log('Hello ListaHappComponent Component');
  }

  formatDate(dataIso: string) {
    return moment(dataIso).format('dddd, DD MMMM');
  }

  userIsConfirmed(happ: MyHappHourModel) {
    return happ.confirmed;
  }

  trackByHapps(index: number, item: MyHappHourModel) {
    return item.id;
  }

  refuseHappHour(happ: MyHappHourModel) {
    happ.refused = true;
    happ.confirmed = false;
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
    happ.confirmed = true;
    happ.refused = false;
    this.happConfirmed.emit(happ);
  }

  checkInHappHour(happ: MyHappHourModel) {
    happ.checkedin = true;
    this.happCheckedIn.emit(happ);
  }
}
