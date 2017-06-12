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

  async save(user: UserModel): Promise<void> {
    //FIXME: hardcode para nao depender do servidor
    try {
      user.id = user.id || Math.ceil(Math.random() * 10000);
      //let seq = this.api.post('users', user).map(res => res.json())
      await this.storage.set(this.USER_KEY, user);
    } catch (error) {
      throw error;
    }
  }

  async loadUser(): Promise<void> {
    this._user = await this.storage.get(this.USER_KEY);
  }

  public get user(): UserModel {
    return this._user;
  }

  merge(user: any) {
    for (let k in user) {
      this._user[k] = user[k];
    }
    this.save(this._user);
  }

}
