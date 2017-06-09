import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('tabsComponent') tabRef: Tabs;
  tab1Root: any = 'InvitedPage';
  tab2Root: any = 'HomePage';
  tab3Root: any = 'SettingsPage';
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