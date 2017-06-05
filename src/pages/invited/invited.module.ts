import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { InvitedPage } from './invited';
import { ListaHappComponentModule } from "../../components/lista-happ/lista-happ.module";


@NgModule({
  declarations: [
    InvitedPage
  ],
  imports: [
    IonicPageModule.forChild(InvitedPage),
    TranslateModule,
    ListaHappComponentModule
  ],
  exports: [
    InvitedPage
  ]
})
export class InvitedPageModule { }
