import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { Settings } from '../../providers/providers';
import { Auth } from '../../providers/providers';

@IonicPage()
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
          this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }));
        loader.dismiss();
      })
      .catch(err => {
        console.error(err);
        loader.dismiss();
      });
  }

  loginFacebook() {
    let loader = this.loadCtrl.create({
      content: this.strings.LOADING
    });
    loader.present();

    this.auth.doFacebookLogin()
      .then(facebookUser => {
        this.settings.allSettings.user = facebookUser;
        this.settings.allSettings.isFirstRun = false;
        this.settings.save().then(() =>
          this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }));
        loader.dismiss();
      })
      .catch(err => {
        console.error(err);
        loader.dismiss();
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
