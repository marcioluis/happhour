import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitedPage } from './invited';

@NgModule({
  declarations: [
    InvitedPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitedPage),
  ],
  exports: [
    InvitedPage
  ]
})
export class PlaceDetailModule {}
