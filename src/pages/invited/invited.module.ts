import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { InvitedPage } from './invited';

@NgModule({
  declarations: [
    InvitedPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitedPage),
    TranslateModule
  ],
  exports: [
    InvitedPage
  ]
})
export class InvitedPageModule { }
