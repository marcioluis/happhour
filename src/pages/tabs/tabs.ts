import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

/*
  Generated class for the Tabs tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = 'InvitedPage';
  tab2Root: any = 'HomePage';
  tab3Root: any = 'ConfigsPage';
  tab4Root: any = 'ContactsPage';

  constructor(public navCtrl: NavController) {

  }

}