import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceDetailPage } from './place-detail';

@NgModule({
  declarations: [
    PlaceDetailPage
  ],
  imports: [
    IonicPageModule.forChild(PlaceDetailPage)
  ],
  exports: [
    PlaceDetailPage
  ]
})
export class PlaceDetailModule { }
