import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from './settings';
import { UserModel } from '../model/models';


export interface GoogleSignInError {
  [code: string]: { message: string, name: string }
}

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  constructor(private googlePlus: GooglePlus, private facebook: Facebook,
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
      .then<UserModel>(user => {
        user.provider = 'google';
        return user;
      })
      .catch(code => {
        throw this.GoogleSignInStatusCodes[code];
      });
  }

  doFacebookLogin() {
    let aToken;
    let permissions = ['email', 'public_profile'];
    return this.facebook.login(permissions)
      .then<string>(response => {
        console.log('response');
        return this.facebook.getAccessToken()
      })
      .then<any>(token => {
        aToken = token;
        console.log('token');
        return this.facebook.api('/me?fields=id,name,gender,first_name,last_name,email,picture', [])
      })
      .then<UserModel>(user => {
        return {
          _id: 0,
          email: user.email,
          idToken: aToken,
          userId: user.id,
          displayName: user.name,
          givenName: user.first_name,
          familyName: user.last_name,
          gender: user.gender,
          imageUrl: user.picture.url,
          provider: 'facebook'
        };
      });
  }

}