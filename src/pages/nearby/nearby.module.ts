import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NearbyPage } from './nearby';

@NgModule({
  declarations: [
    NearbyPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyPage),
    TranslateModule
  ],
  exports: [
    NearbyPage
  ]
})
export class NerbyPageModule { }
