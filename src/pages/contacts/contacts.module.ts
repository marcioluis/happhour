import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ContactsPage } from './contacts';

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
    TranslateModule
  ],
  exports: [
    ContactsPage
  ]
})
export class ContactsPageModule { }
