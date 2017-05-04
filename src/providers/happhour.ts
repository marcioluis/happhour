import { Injectable } from '@angular/core';
import { HappHourModel, PlaceModel, UserModel } from '../model/models';

/*
  Generated class for the HapphourProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HapphourProvider {

  constructor() {
    console.log('Hello HapphourProvider Provider');
  }

  createNewHappHour(place: PlaceModel, owner: UserModel) {
  }
}
