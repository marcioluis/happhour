import { Injectable } from '@angular/core';
import { PlaceModel } from '../model/place-model';
import { MyHappHourModel } from '../model/happhour-model';
import { UserModel } from '../model/user-model';
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

  /**
   * Cria um novo happ hour
   * @param place local do happhour
   * @param owner criador do happhour
   */
  createNewHappHour(place: PlaceModel, owner: UserModel): MyHappHourModel {
    let happ = new MyHappHourModel();
    happ.creator = owner;
    happ.date = moment().format();
    happ.isPublic = false;
    happ.place = place;
    happ.name = `HappHour em ${place.nome}`;
    happ.isActive = true;
    happ.me = owner.id;
    happ.isOwner = true;
    happ.isConfirmed = true;
    happ.isNew = true;
    return happ;
  }

  /**
   * Salva um evento primeiro no backend e depois local
   * @param happhour 
   */
  saveHappHourAll(happhour: MyHappHourModel) {
    return this.saveHappHourRemote(happhour).flatMap((model) => this.saveHappHourLocal(model));
  }

  saveHappHourLocal(model: MyHappHourModel) {
    let json = JSON.stringify(model);
    return this.storage.executeCommandSql('INSERT INTO happhours (id, is_active, json) VALUES (?, ?, ?)', [model.id, model.isActive, json]).map(rs => model);
  }

  saveHappHourRemote(model: MyHappHourModel): Observable<MyHappHourModel> {
    //FIXME: mock para nao conectar no servidor
    let p = new Promise((resolve, reject) => {
      model.id = Math.ceil(Math.random() * 10000);
      setTimeout(() => {
        resolve(model);
      }, 2500);
    });
    return Observable.from(p);
    //return this.api.post('happhours', model).map(response => response.json());
  }

  /**
   * Busca os eventos ativos locais
   */
  getActiveHappHours(): Observable<MyHappHourModel[]> {
    return this.storage.executeReadSql("SELECT id, json FROM happhours WHERE is_active = 'true'")
      .map((rs) => {
        if (rs.rows.length) {
          let result: MyHappHourModel[] = [];
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

  refuseInvitation(happ: MyHappHourModel) {

  }

}
