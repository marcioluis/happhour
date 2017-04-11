import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InvitedPage, HomePage, ConfigsPage, ContactsPage } from '../pages';

/*
  Generated class for the Tabs tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = InvitedPage;
  tab2Root: any = HomePage;
  tab3Root: any = ConfigsPage;
  tab4Root: any = ContactsPage;

  constructor(public navCtrl: NavController) {

  }

}