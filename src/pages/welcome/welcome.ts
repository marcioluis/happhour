import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Settings } from '../../providers/providers';
import { HomePage } from '../pages';
import { Auth } from '../../providers/providers';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, private settings: Settings,
    private loadCtrl: LoadingController, translate: TranslateService, private auth: Auth) {

    settings.load();
    translate.get(["AUTHENTICATING"])
      .subscribe(strings => this.strings = strings);
  }

  private strings;

  loginGoogle() {
    let loader = this.loadCtrl.create({
      content: this.strings.LOADING
    });
    loader.present();
    
    this.auth.doGoogleLogin()
      .then(googleUser => {        
        this.settings.allSettings.user = googleUser;
        this.settings.allSettings.isFirstRun = false;
        this.settings.save().then(() =>
          this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' })
        );
        loader.dismiss();
      })
      .catch(err => {
        console.error(err);
        loader.dismiss();
      });
  }

  loginFacebook() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
