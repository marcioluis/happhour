import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Tabs } from 'ionic-angular';

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

  @ViewChild('tabsComponent') tabRef: Tabs;
  tab1Root: any = 'InvitedPage';
  tab2Root: any = 'HomePage';
  tab3Root: any = 'ConfigsPage';
  tab4Root: any = 'ContactsPage';

  _newHappsCount: number;

  constructor(public navCtrl: NavController, private events: Events) {
  }

  badgeCountChange = (count: number) => {
    this._newHappsCount = count > 0 ? count : null;
  }

  subscribeToBadgeCountChange() {
    this.events.subscribe('invited:count', this.badgeCountChange);
  }

  ionViewDidLoad() {
    this.subscribeToBadgeCountChange();
  }

  get newHappsCount() {
    return this._newHappsCount;
  }
}