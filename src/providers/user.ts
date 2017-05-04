import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserModel } from '../model/models';
import { Api } from './providers';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class UserProvider {

  private USER_KEY: string = '_user';
  private _user: UserModel;

  constructor(private storage: Storage) {
    storage.ready().then(() => console.log('storage is ready'));
  }

  saveAndMerge(user: UserModel) {
    return this.storage.set(this.USER_KEY, user);
  }
}
