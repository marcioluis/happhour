import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { SettingsProvider } from './settings.provider';
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

  constructor(private googlePlus: GooglePlus,
    private facebook: Facebook,
    private settings: SettingsProvider) {

    this.GoogleSignInStatusCodes = {
      "12501": {
        name: 'SIGN_IN_CANCELLED',
        message: "Não foi possível entrar na sua conta. Verifique seus dados e tente novamente."
      },
      "12500": {
        name: 'SIGN_IN_FAILED',
        message: "Houve um erro ao fazer login com sua conta Google. Mudar para outra pode ou não resolver."
      },
      "7": {
        name: 'NETWORK_ERROR',
        message: "Erro de conexão. Tentar novamente deve resolver o problema."
      }
    }
  }

  private GoogleSignInStatusCodes: GoogleSignInError;

  async doGoogleLogin(): Promise<UserModel> {
    try {
      let gUser = await this.googlePlus.login({
        profiles: 'profile email',
        webClientId: '784220670042-ib1ssv1utfr1c4cvfs67t7n9tgkck2vk.apps.googleusercontent.com',
        offline: true
      });

      return {
        email: gUser.email,          // 'eddyverbruggen@gmail.com'        
        displayName: gUser.displayName,    // 'Eddy Verbruggen'
        familyName: gUser.familyName,   // 'Verbruggen'
        givenName: gUser.givenName,   // 'Eddy'
        imageUrl: gUser.imageUrl,  // 'http://link-to-my-profilepic.google.com'
        providerIdToken: gUser.idToken, // idToken that can be exchanged to verify user identity.
        authCode: gUser.serverAuthCode,// Auth code that can be exchanged for an access token and refresh token for offline access
        provider: gUser.provider = 'google'
      }
    }
    catch (error) {
      console.error(`Auth error: ${error}`);
      throw this.GoogleSignInStatusCodes[error] || error;
    }

  }

  async doFacebookLogin(): Promise<UserModel> {
    let permissions = ['email', 'public_profile'];

    try {
      let faceResponse = await this.facebook.login(permissions);
      if (faceResponse.status === 'connected') {
        let token = await this.facebook.getAccessToken();
        let user = await this.facebook.api('/me?fields=id,name,gender,first_name,last_name,email,picture', []);

        return {
          email: user.email,
          providerIdToken: token,
          providerUserId: user.id,
          displayName: user.name,
          givenName: user.first_name,
          familyName: user.last_name,
          gender: user.gender,
          imageUrl: user.picture.url,
          provider: 'facebook'
        };
      }
    } catch (error) {
      console.error(`Auth error: ${error}`);
      throw error;
    }
  }

}