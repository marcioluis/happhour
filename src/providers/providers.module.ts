import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicErrorHandler } from 'ionic-angular';
//plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { SQLite } from "@ionic-native/sqlite";
import { Globalization } from "@ionic-native/globalization";
//providers
import { Api } from "./api";
import { Auth } from './auth';
import { Database } from "./database";
import { HapphourProvider } from "./happhour";
import { PlaceProvider } from "./place";
import { Settings } from './settings';
import { UserProvider } from './user';

/**
 * The Settings provider takes a set of default settings for your app.
 *
 * You can add new settings options at any time. Once the settings are saved,
 * these values will not overwrite the saved values (this can be done manually if desired).
 */
export function provideDefaultSettings(storage: Storage) {
    return new Settings(storage, { isFirstRun: true, searchRadius: 500 });
}

@NgModule({
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        Globalization,
        GooglePlus,
        Facebook,
        Api,
        Auth,
        PlaceProvider,
        UserProvider,
        Database,
        HapphourProvider,
        //settings provider
        { provide: Settings, useFactory: provideDefaultSettings, deps: [Storage] },
        // Keep this to enable Ionic's runtime error handling during development
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ],
})
export class ProvidersModule { }