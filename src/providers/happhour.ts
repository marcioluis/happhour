import { Injectable } from '@angular/core';
import { HappHourModel, PlaceModel, UserModel } from '../model/models';
import { Api } from "./api";
import { Database } from "./database";
import * as moment from "moment";
import * as _ from 'lodash';
import * as EJSON from 'ejson';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


/*
  Generated class for the HapphourProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HapphourProvider {

  constructor(private storage: Database, private api: Api) {
    console.log('Hello HapphourProvider Provider');
    _.defer(() => {
      storage.executeSql('CREATE TABLE IF NOT EXISTS happhours (id PRIMARY KEY, json TEXT)');
    });
  }

  private NAME = 'HappHour em: ';

  createNewHappHour(eventPlace: PlaceModel, eventOwner: UserModel) {
    let evento = new HappHourModel();
    evento.creator = eventOwner;
    evento.data = moment().format();
    evento.isPublic = false;
    evento.place = eventPlace;
    evento.name = `${this.NAME} ${eventPlace.nome}`;
    evento.isActive = true;

    return evento;
  }

  saveEvent(happhour: HappHourModel): Observable<HappHourModel> {
    let seq = this.api.post('happhours', happhour).map(response => response.json()).share();

    seq.subscribe((model: HappHourModel) => {
      let json = JSON.stringify(model);
      this.storage.executeSql('INSERT INTO happhours (id, json) VALUES (?, ?)', [model.id, json]);
    });

    return seq;
  }
}
