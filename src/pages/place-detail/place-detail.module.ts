import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PlaceDetailPage } from './place-detail';

@NgModule({
  declarations: [
    PlaceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDetailPage),
    TranslateModule
  ],
  exports: [
    PlaceDetailPage
  ]
})
export class PlaceDetailModule { }
