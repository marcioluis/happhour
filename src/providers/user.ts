import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserModel } from '../model/models';
import { Api } from './api';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';


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

  save(user: UserModel): Observable<UserModel> {
    let seq = <Observable<UserModel>>this.api.post('users', user).map(res => res.json()).share();

    seq.subscribe((model) => {
      this._user = model;
      this.storage.set(this.USER_KEY, model);
    });

    return seq;
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
