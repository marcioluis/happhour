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
import { SQLite } from "@ionic-native/sqlite";
//mocks
import { GooglePlusMock } from '../mocks/googlePlusMock';
import { FacebookMock } from '../mocks/facebookMock';
//providers
import { Api, Auth, PlaceProvider, Settings, UserProvider, Database, HapphourProvider } from "../providers";

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
  return new Settings(storage, { isFirstRun: true, searchRadius: 500 });
}

export function configureGP() {
  if (window["cordova"]) {
    return GooglePlus;
  }
  return GooglePlusMock;
}

export function configureFB() {
  if (window["cordova"]) {
    return Facebook;
  }
  return FacebookMock;
}

const providers: any[] = [
  StatusBar,
  SplashScreen,
  SQLite,
  Api,
  Auth,
  PlaceProvider,
  UserProvider,
  Database,
  HapphourProvider,
  //settings provider
  { provide: Settings, useFactory: provideDefaultSettings, deps: [Storage] },
  //mock the plugins
  { provide: GooglePlus, useClass: configureGP },
  { provide: Facebook, useClass: configureFB },
  // Keep this to enable Ionic's runtime error handling during development
  { provide: ErrorHandler, useClass: IonicErrorHandler }
];

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: Database.DATABASE_NAME, storeName: 'ionic_storage' }),
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
  providers: providers
})
export class AppModule { }
