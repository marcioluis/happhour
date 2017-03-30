import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { TranslateService } from 'ng2-translate';
import { Settings } from './settings';
import { GoogleUserModel } from '../model/models';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  constructor(private googlePlus: GooglePlus,
    private settings: Settings, translate: TranslateService) {
    console.log('Auth Provider');

    translate.get(["GOOGLE_SIGN_IN_CANCELLED", "GOOGLE_SIGN_IN_FAILED"])
      .subscribe(strings => {
        this.GoogleSignInStatusCodes = {
          "12501": {
            name: 'SIGN_IN_CANCELLED',
            message: strings.GOOGLE_SIGN_IN_CANCELLED
          },
          "12500": {
            name: 'SIGN_IN_FAILED',
            message: strings.GOOGLE_SIGN_IN_FAILED
          }
        }
      });
  }

  private GoogleSignInStatusCodes: GoogleSignInError;

  doGoogleLogin() {
    return this.googlePlus.login({
      profiles: 'profile email',
      webClientId: '784220670042-ib1ssv1utfr1c4cvfs67t7n9tgkck2vk.apps.googleusercontent.com',
      offline: true
    })
      .then<GoogleUserModel>(user => {
        user.provider = 'google';
        return user;
      })
      .catch(code => {
        throw this.GoogleSignInStatusCodes[code];
      });
  }
}

export interface GoogleSignInError {
  [code: string]: { message: string, name: string }
}
