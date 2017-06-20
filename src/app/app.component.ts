import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from "@ionic-native/globalization";
import { SettingsProvider } from "../providers/settings.provider";
import * as moment from "moment";


@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    config: Config,
    settings: SettingsProvider,
    globalization: Globalization) {

    config.set('ios', 'backButtonText', "Voltar");

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      globalization.getPreferredLanguage().then((prop) => {
        let lang = prop.value;
        moment.locale(lang);
        //console.log(`preferred language: ${lang}`);
        //console.log(`moment locale: ${moment.locale()}`);
      });

      //vai para tela home ou de tutorial se for o primeiro uso
      settings.load().then(() => {
        if (settings.allSettings.isFirstRun)
          this.rootPage = 'TutorialPage';
        else
          this.rootPage = 'TabsPage';

        splashScreen.hide();
      });
    });
  }
}
