import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { PlaceProvider } from "../../providers/providers";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private placeService: PlaceProvider) { }
  places = [];

  doSearch(infiniteScroll: InfiniteScroll) {
    let skip = this.places.length;
    this.placeService.findNearbyPlaces(500, skip, 4)
      .subscribe(
      value => {        
        if (value.length)
          value.forEach(element => {
            this.places.push(element);
          });
      },
      error => {
        console.log(error);
      },
      () => infiniteScroll.complete());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearbyPage');
    this.placeService.findNearbyPlaces(500, 0, 4)
      .subscribe(value => this.places = value);
  }

}
