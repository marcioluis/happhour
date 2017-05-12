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

  saveAndMerge(user: UserModel) {
    return this.api.post('', user);
  }

  async loadUser(): Promise<UserModel> {
    if (this._user) {
      return Promise.resolve(this._user);
    }
    else {
      this._user = await this.storage.get(this.USER_KEY);
      return Promise.resolve(this._user);
    }
  }
}
