import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//app component
import { MyApp } from './app.component';
//providers
import { Database } from "../providers/database";
import { ProvidersModule } from "../providers/providers.module";

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: Database.DATABASE_NAME, storeName: 'ionic_storage' }),
    ProvidersModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp]
})
export class AppModule { }
