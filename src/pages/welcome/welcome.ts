import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Settings } from '../../providers/settings';
import { Auth } from '../../providers/auth';
import { UserProvider } from '../../providers/user';
import { InfoPresenter } from '../../providers/info-presenter';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
    private settings: Settings,
    private infoPresenter: InfoPresenter,
    private auth: Auth,
    private user: UserProvider) {

    settings.load();
  }

  async loginGoogle() {
    let loader = this.infoPresenter.presentLoader("Autenticando...");
    try {
      let googleUser = await this.auth.doGoogleLogin();
      await this.user.save(googleUser);
      this.settings.allSettings.isFirstRun = false;
      await this.settings.save();
      this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });

    } catch (error) {
      this.infoPresenter.presentError(error);
    } finally {
      loader.dismiss();
    }
  }

  async loginFacebook() {
    let loader = this.infoPresenter.presentLoader("Autenticando...");
    try {
      let facebookUser = await this.auth.doFacebookLogin();
      await this.user.save(facebookUser);
      this.settings.allSettings.isFirstRun = false;
      await this.settings.save();
      this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' })

    } catch (error) {
      this.infoPresenter.presentError(error);
    }
    finally {
      loader.dismiss()
    }
  }

  ionViewDidLoad() {
  }

}
