import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigsPage } from './configs';

@NgModule({
  declarations: [
    ConfigsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigsPage),
    TranslateModule
  ],
  exports: [
    ConfigsPage
  ]
})
export class ConfigsPageModule { }
