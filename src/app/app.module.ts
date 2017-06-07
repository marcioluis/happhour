import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//app component
import { MyApp } from './app.component';
//providers
import { Database } from "../providers/database";
import { ProvidersModule } from "../providers/providers.module";
/** 
 * The translate loader needs to know where to load i18n files
 * in Ionic's static asset pipeline.
 */
export function factoryTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    }),
    ProvidersModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp]
})
export class AppModule { }
