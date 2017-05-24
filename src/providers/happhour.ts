import { Injectable } from '@angular/core';
import { HappHourModel, PlaceModel, UserModel } from '../model/models';
import { Api } from "./api";
import { Database } from "./database";
import * as moment from "moment";
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

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
      storage.executeCommandSql('CREATE TABLE IF NOT EXISTS happhours (id INTEGER PRIMARY KEY ASC, is_active BOOLEAN, json TEXT)')
        .subscribe(rs => console.log('tabela happhours ok'), error => console.error(`Erro ao criar tabela happhour ${JSON.stringify(error)}`));
    });
  }

  createNewHappHour(eventPlace: PlaceModel, eventOwner: UserModel): HappHourModel {
    let evento = new HappHourModel();
    evento.creator = eventOwner;
    evento.data = moment().format();
    evento.isPublic = false;
    evento.place = eventPlace;
    evento.name = `HappHour em ${eventPlace.nome}`;
    evento.isActive = true;
    return evento;
  }

  saveHappHourAll(happhour: HappHourModel) {
    return this.saveHappHourRemote(happhour).flatMap((model) => this.saveHappHourLocal(model));
  }

  saveHappHourLocal(model: HappHourModel) {
    let json = JSON.stringify(model);
    return this.storage.executeCommandSql('INSERT INTO happhours (id, is_active, json) VALUES (?, ?, ?)', [model.id, model.isActive, json]).map(rs => model);
  }

  saveHappHourRemote(model: HappHourModel): Observable<HappHourModel> {
    return this.api.post('happhours', model).map(response => response.json());
  }

  getActiveHappHours(): Observable<HappHourModel[]> {
    return this.storage.executeReadSql("SELECT id, json FROM happhours WHERE is_active = 'true'")
      .map((rs) => {
        if (rs.rows.length) {
          let result: HappHourModel[] = [];
          for (var index = 0; index < rs.rows.length; index++) {
            let element = rs.rows.item(index).json;
            let happ = JSON.parse(element);
            result.push(happ);
          }
          return result;
        }
        return [];
      });
  }
}

