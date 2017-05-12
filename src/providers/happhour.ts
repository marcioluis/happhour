import { Injectable } from '@angular/core';
import { HappHourModel, PlaceModel, UserModel } from '../model/models';
import { Api } from "./api";
import { Storage } from "@ionic/storage";
import * as moment from "moment";
import { Observable } from 'rxjs/Observable'

/*
  Generated class for the HapphourProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HapphourProvider {

  constructor(private storage: Storage, private api: Api) {
    console.log('Hello HapphourProvider Provider');
    storage.ready().then(() => console.log('storage is ready@happhour'));
  }

  private NAME = 'HappHour em: ';
  private EVENT_KEY_ACTIVE = '_events';

  createNewHappHour(eventPlace: PlaceModel, eventOwner: UserModel) {
    let evento = new HappHourModel();
    evento.creator = eventOwner;
    evento.data = moment().format();
    evento.isPublic = false;
    evento.place = eventPlace;
    evento.name = this.NAME + eventPlace.nome;
    evento.isActive = true;

    return evento;
  }

  saveEvent(happhour: HappHourModel): Observable<HappHourModel> {
    let seq = this.api.post('', happhour).map(response => response.json()).share();

    seq.subscribe((json) => {
      this.storage.get(this.EVENT_KEY_ACTIVE)
        .then((events) => {
          if (events) {
            events.push(json);
          }
          else {
            events = [json];
          }
          this.storage.set(this.EVENT_KEY_ACTIVE, events);
        });
    });

    return seq;
  }
}
