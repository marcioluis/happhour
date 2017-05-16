import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from '../../providers';
import { Auth } from '../../providers';
import { UserProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, private settings: Settings,
    private loadCtrl: LoadingController, translate: TranslateService, private auth: Auth, private user: UserProvider) {

    settings.load();
    translate.get(["AUTHENTICATING"])
      .subscribe(strings => this.strings = strings);
  }

  private strings;

  async loginGoogle() {
    let loader = this.presentLoader();
    //TODO: tratar possiveis erros em loginGoole
    let googleUser = await this.auth.doGoogleLogin();

    this.user.save(googleUser).subscribe((model) => {
      this.settings.allSettings.isFirstRun = false;
      this.settings.save().then(() => this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }));
    },
      (error) => loader.dismiss(),
      () => loader.dismiss());
  }

  async loginFacebook() {
    let loader = this.presentLoader();
    //TODO: tratar possiveis erros em loginFacebook
    let facebookUser = await this.auth.doFacebookLogin();

    this.user.save(facebookUser).subscribe((model) => {
      this.settings.allSettings.isFirstRun = false;
      this.settings.save().then(() => this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }));
    },
      (error) => loader.dismiss(),
      () => loader.dismiss());
  }

  private presentLoader() {
    let loader = this.loadCtrl.create({
      content: this.strings.LOADING
    });
    loader.present();
    return loader;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
