import { Injectable } from '@angular/core';
import { HappHourModel, PlaceModel, UserModel } from '../model/models';
import { Api } from "./api";
import { Database } from "./database";
import * as moment from "moment";
import * as _ from 'lodash';
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
      storage.executeCommandSql('CREATE TABLE IF NOT EXISTS happhours (id INTEGER PRIMARY KEY ASC, is_active NUMERIC, json TEXT)')
        .subscribe(rs => console.log('tabela happhours criada'), error => console.error(`Erro ao criar tabela happhour ${JSON.stringify(error)}`));
    });
  }

  private NAME = 'HappHour em: ';

  createNewHappHour(eventPlace: PlaceModel, eventOwner: UserModel): HappHourModel {
    let evento = new HappHourModel();
    evento.creator = eventOwner;
    evento.data = moment().format();
    evento.isPublic = false;
    evento.place = eventPlace;
    evento.name = `${this.NAME} ${eventPlace.nome}`;
    evento.isActive = true;

    return evento;
  }

  async saveHappHour(happhour: HappHourModel): Promise<HappHourModel> {
    let seq = <Promise<HappHourModel>>this.api.post('happhours', happhour).map(response => response.json()).toPromise();

    let model = await seq;
    let json = JSON.stringify(model);

    this.storage.executeCommandSql('INSERT INTO happhours (id, is_active, json) VALUES (?, ?, ?)', [model.id, +model.isActive, json])
      .subscribe((rs) => console.log(`rows: ${rs.rowsAffected}`), (er) => { console.error(er); });

    return seq;
  }

  getActiveHappHours(): Observable<HappHourModel> {
    return this.storage.executeReadSql('SELECT id, json FROM happhours WHERE is_active = 1')
      .map((rs, i) => rs.rows.item(i).json).map(data => JSON.parse(data));
  }
}
