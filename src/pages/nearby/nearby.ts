import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Nearby page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html'
})
export class NearbyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  items = [{ header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" },
  { header: "h1", content: "lorem hauasduadu jaiasjdk asndasbdasbdas" }];

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearbyPage');
  }

}
