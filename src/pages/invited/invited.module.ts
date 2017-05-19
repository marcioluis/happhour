import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { InvitedPage } from './invited';
import { ListaHappComponent } from "../../components/lista-happ/lista-happ";


@NgModule({
  declarations: [
    InvitedPage,
    ListaHappComponent
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
