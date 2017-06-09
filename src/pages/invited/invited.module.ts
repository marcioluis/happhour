import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitedPage } from './invited';
import { ListaHappComponentModule } from "../../components/lista-happ/lista-happ.module";


@NgModule({
  declarations: [
    InvitedPage
  ],
  imports: [
    IonicPageModule.forChild(InvitedPage),
    ListaHappComponentModule
  ],
  exports: [
    InvitedPage
  ]
})
export class InvitedPageModule { }
