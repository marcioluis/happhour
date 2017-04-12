import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
//translate
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
//app component
import { MyApp } from './app.component';
//pages
import { AllPages } from '../pages/pages';
//plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
//mocks
import { GooglePlusMock } from '../mocks/googlePlusMock';
import { FacebookMock } from '../mocks/facebookMock';
//providers
import { Settings, Auth } from '../providers/providers';
import { Facebook } from '@ionic-native/facebook';
/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = Array.of<any>(MyApp, AllPages);

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

/**
 * The Settings provider takes a set of default settings for your app.
 *
 * You can add new settings options at any time. Once the settings are saved,
 * these values will not overwrite the saved values (this can be done manually if desired).
 */
export function provideSettings(storage: Storage) {
  return new Settings(storage, {
    isFirstRun: true,
    searchRadius: 500
  });
}

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers(): any {
  if (window["cordova"]) {
    return [
      StatusBar,
      SplashScreen,
      GooglePlus,
      Auth,
      Facebook,
      // settings provider
      { provide: Settings, useFactory: provideSettings, deps: [Storage] },
      // Keep this to enable Ionic's runtime error handling during development
      { provide: ErrorHandler, useClass: IonicErrorHandler }
    ];
  }
  else {
    return [
      StatusBar,
      SplashScreen,
      Auth,
      //mock the plugins
      { provide: GooglePlus, useClass: GooglePlusMock },
      { provide: Facebook, useClass: FacebookMock },
      //
      { provide: Settings, useFactory: provideSettings, deps: [Storage] },
      { provide: ErrorHandler, useClass: IonicErrorHandler }
    ];
  }
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: '__happyhour', storeName: 'hpdb' }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
