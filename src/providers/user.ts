import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserModel } from '../model/models';
import { Api } from './api';

/**
 * 
 */
@Injectable()
export class UserProvider {

  private USER_KEY: string = '_user';
  private _user: UserModel;

  constructor(private storage: Storage, private api: Api) {
    storage.ready().then(() => console.log('storage is ready'));
  }

  async saveAndMerge(user: UserModel) {
    this._user = user;
    await this.api.post('', user);
    return this.storage.set(this.USER_KEY, user);
  }
}
