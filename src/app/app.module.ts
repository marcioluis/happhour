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
import { Facebook } from '@ionic-native/facebook';
//mocks
import { GooglePlusMock } from '../mocks/googlePlusMock';
import { FacebookMock } from '../mocks/facebookMock';
//providers
import { Settings, Auth, Api, PlaceProvider, UserProvider } from '../providers/providers';

/** 
 * The translate loader needs to know where to load i18n files
 * in Ionic's static asset pipeline.
 */
export function factoryTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
/**
 * The Settings provider takes a set of default settings for your app.
 *
 * You can add new settings options at any time. Once the settings are saved,
 * these values will not overwrite the saved values (this can be done manually if desired).
 */
export function provideDefaultSettings(storage: Storage) {
  return new Settings(storage, {
    isFirstRun: true,
    searchRadius: 500
  });
}

export function providers(): any[] {
  if (window["cordova"]) {
    return [
      StatusBar,
      SplashScreen,
      GooglePlus,
      Facebook,
      Auth,
      Api,
      PlaceProvider,
      UserProvider,
      // settings provider
      { provide: Settings, useFactory: provideDefaultSettings, deps: [Storage] },
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
      UserProvider,
      //mock the plugins
      { provide: GooglePlus, useClass: GooglePlusMock },
      { provide: Facebook, useClass: FacebookMock },
      //
      { provide: Settings, useFactory: provideDefaultSettings, deps: [Storage] },
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
        useFactory: factoryTranslateLoader,
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: providers()
})
export class AppModule { }
