import { Component, Input } from '@angular/core';
import { HappHourModel } from "../../model/models";
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
  happsOwner: HappHourModel[] = [];
  @Input()
  happsAntigos: HappHourModel[] = [];
  @Input()
  happsConvidado: HappHourModel[] = [];

  constructor() {
    console.log('Hello ListaHappComponent Component');
  }

  formataData(dataIso: string) {
    return moment(dataIso).format('dddd, DD MMMM');
  }

  trackByHapps(index: number, item: HappHourModel) {
    return item.id;
  }
}
