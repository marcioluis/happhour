import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
//translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//app component
import { MyApp } from './app.component';
//plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
//mocks
import { GooglePlusMock } from '../mocks/googlePlusMock';
import { FacebookMock } from '../mocks/facebookMock';
//providers
import { Settings, Auth, Api, PlaceProvider } from '../providers/providers';
import { Facebook } from '@ionic-native/facebook';
/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n', '.json');
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

export function providers(): any {
  if (window["cordova"]) {
    return [
      StatusBar,
      SplashScreen,
      GooglePlus,
      Facebook,
      Auth,
      Api,
      PlaceProvider,
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
      Api,
      PlaceProvider,
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
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: '_happyhourdb', storeName: 'ionic_storage' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: providers()
})
export class AppModule { }
