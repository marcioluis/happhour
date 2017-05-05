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
    await this.user.saveAndMerge(googleUser);

    this.settings.allSettings.isFirstRun = false;
    await this.settings.save();

    loader.dismiss();
    this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
  }

  async loginFacebook() {
    let loader = this.presentLoader();
    //TODO: tratar possiveis erros em loginFacebook
    let facebookUser = await this.auth.doFacebookLogin();
    await this.user.saveAndMerge(facebookUser);

    this.settings.allSettings.isFirstRun = false;
    await this.settings.save();

    loader.dismiss();
    this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
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
