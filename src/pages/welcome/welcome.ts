import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage, AlertController } from 'ionic-angular';
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
    private loadCtrl: LoadingController, translate: TranslateService, private auth: Auth, private user: UserProvider, private alertCtrl: AlertController) {

    settings.load();
    translate.get(["AUTHENTICATING"])
      .subscribe(strings => this.strings = strings);
  }

  private strings;

  async loginGoogle() {
    let loader = this.presentLoader();
    //TODO: tratar possiveis erros em loginGoole
    try {
      let googleUser = await this.auth.doGoogleLogin();
      await this.user.save(googleUser);
      this.settings.allSettings.isFirstRun = false;
      await this.settings.save();
      this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });

    } catch (error) {
      this.presentError(error);
    } finally {
      loader.dismiss();
    }
  }

  async loginFacebook() {
    let loader = this.presentLoader();
    //TODO: tratar possiveis erros em loginFacebook
    try {
      let facebookUser = await this.auth.doFacebookLogin();
      await this.user.save(facebookUser);
      this.settings.allSettings.isFirstRun = false;
      await this.settings.save();
      this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' })

    } catch (error) {
      this.presentError(error);
    }
    finally {
      loader.dismiss()
    }
  }

  private presentError(error) {
    let alert = this.alertCtrl.create({
      title: error.name,
      subTitle: error.message || JSON.stringify(error, null, '\t'),
      buttons: ['OK']
    });
    alert.present();
  }

  private presentLoader() {
    let loader = this.loadCtrl.create({
      content: this.strings.AUTHENTICATING
    });
    loader.present();
    return loader;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
