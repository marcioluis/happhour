import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from "@ionic-native/globalization";
import { TranslateService } from "@ngx-translate/core";
import { Settings } from "../providers/settings";
import * as moment from "moment";

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    translate: TranslateService, config: Config, settings: Settings, globalization: Globalization) {

    translate.setDefaultLang('pt-br');

    translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      globalization.getPreferredLanguage().then((prop) => {
        let lang = prop.value;
        translate.use(lang);
        moment.locale(lang);
        console.log(`preferred language: ${lang}`);
        console.log(`moment locale: ${moment.locale()}`);
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
