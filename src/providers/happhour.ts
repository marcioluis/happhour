import { Injectable } from '@angular/core';
import { PlaceModel } from '../model/place-model';
import { MyHappHourModel, MyHappHourModelCheckin } from '../model/happhour-model';
import { UserModel, UserModelHappHour } from '../model/user-model';
import { Api } from "./api";
import { Database } from "./database";
import * as moment from "moment";
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Coordinates } from "@ionic-native/geolocation";

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
    let localOwner: UserModelHappHour = JSON.parse(JSON.stringify(owner));
    delete localOwner.providerIdToken;
    delete localOwner.authCode;
    delete localOwner.providerUserId;
    localOwner.isConfirmed = true;

    let happ = new MyHappHourModel();
    happ.creator = localOwner;
    happ.date = moment().format();
    happ.isPublic = false;
    happ.place = place;
    happ.name = `HappHour em ${place.nome}`;
    happ.isActive = true;
    happ.me = localOwner.id;
    happ.isOwner = true;
    happ.isConfirmed = true;
    happ.isNew = true;
    happ.invited = [localOwner];
    return happ;
  }

  /**
   * Salva um evento primeiro no backend e depois local
   * @param happhour 
   */
  saveHappHourAll(happhour: MyHappHourModel) {
    return this.saveHappHourRemote(happhour).flatMap((model) => this.saveHappHourLocal(model));
  }

  /**
   * Insere ou atualiza um evento na base local
   * @param model 
   */
  saveHappHourLocal(model: MyHappHourModel) {
    let json = JSON.stringify(model);
    return this.storage.executeCommandSql('INSERT OR REPLACE INTO happhours (id, is_active, json) VALUES (?, ?, ?)', [model.id, model.isActive, json]).map(rs => model);
  }

  saveHappHourRemote(model: MyHappHourModel): Observable<MyHappHourModel> {
    //FIXME: mock para nao conectar no servidor
    let p = new Promise((resolve, reject) => {
      let m = JSON.parse(JSON.stringify(model));
      m.id = Math.ceil(Math.random() * 10000);
      setTimeout(() => {
        resolve(m);
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

  cancelHappHour(happ: MyHappHourModel): Observable<MyHappHourModel> {
    happ.isActive = false;
    //salva remoto e local
    //FIXME: mock para nao conectar no servidor
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        let element = JSON.parse(JSON.stringify(happ));
        resolve(element);
      }, 2500);
    });
    return Observable.from(p).flatMap(model => this.saveHappHourLocal(model));
    //return this.api.post('happhours/cancel', happ).map(response => response.json()).flatMap(model => this.saveHappHourLocal(model));
  }

  refuseInvitation(happ: MyHappHourModel): Observable<MyHappHourModel> {
    happ.isRefused = true;
    happ.isConfirmed = false;
    //salva remoto e local
    //FIXME: mock para nao conectar no servidor
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        let element: MyHappHourModel = JSON.parse(JSON.stringify(happ));
        let convidado = element.invited.find(item => item.id === element.me);
        convidado.isRefused = true;
        resolve(element);
      }, 2500);
    });
    return Observable.from(p).flatMap(model => this.saveHappHourLocal(model));
    //return this.api.post('happhours/refuse', happ).map(response => response.json()).flatMap(model => this.saveHappHourLocal(model));

  }

  confirmInvitation(happ: MyHappHourModel): Observable<MyHappHourModel> {
    happ.isConfirmed = true;
    happ.isRefused = false;
    //salva remoto e local
    //FIXME: mock para nao conectar no servidor
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        let element = JSON.parse(JSON.stringify(happ));
        let convidado = element.invited.find(item => item.id === element.me);
        convidado.isConfirmed = true;
        resolve(element);
      }, 2500);
    });
    return Observable.from(p).flatMap(model => this.saveHappHourLocal(model));
    //return this.api.post('happhours/confirm', happ).map(response => response.json()).flatMap(model => this.saveHappHourLocal(model));
  }

  checkinHappHour(happ: MyHappHourModel, location: Coordinates): Observable<MyHappHourModel> {
    happ.isCheckedin = true;
    //salva remoto e local
    //FIXME: mock para nao conectar no servidor
    let p = new Promise<MyHappHourModelCheckin>((resolve, reject) => {
      setTimeout(() => {
        let checkinHappHour: MyHappHourModelCheckin = JSON.parse(JSON.stringify(happ));
        checkinHappHour.latitude = location.latitude;
        checkinHappHour.longitude = location.longitude;
        checkinHappHour.accuracy = location.accuracy;
        let convidado = checkinHappHour.invited.find(item => item.id === checkinHappHour.me);
        convidado.isCheckedin = true;
        resolve(checkinHappHour);
      }, 2500);
    });
    return Observable.from(p).flatMap(model => {
      delete model.latitude;
      delete model.longitude;
      delete model.accuracy;
      return this.saveHappHourLocal(model)
    });
    //return this.api.post('happhours/checkin', checkinHappHour).map(response => response.json()).flatMap(model => this.saveHappHourLocal(model));
  }

}
