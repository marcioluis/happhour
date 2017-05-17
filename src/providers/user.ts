import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserModel } from '../model/models';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * 
 */
@Injectable()
export class UserProvider {

  private USER_KEY: string = '_user';
  private _user: UserModel;

  constructor(private storage: Storage, private api: Api) {
  }

  async save(user: UserModel): Promise<UserModel> {
    let seq = this.api.post('users', user).map(res => res.json()).toPromise();

    try {
      user = await seq;
      this.storage.set(this.USER_KEY, user);
      return seq;
    } catch (error) {
      throw error;
    }
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
