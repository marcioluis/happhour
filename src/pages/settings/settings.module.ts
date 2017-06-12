import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TextMaskModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }
