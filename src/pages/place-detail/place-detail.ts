import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { PlaceModel } from "../../model/models";

/**
 * Generated class for the PlaceDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {

  place: PlaceModel = this.navParams.get('place');

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController, translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceDetail');
    this.isOpenNow();
  }

  isOpenNow() {
    let dia = new Date().getDay() + 1;
    let horario = this.place.horariosFuncionamento[dia];
    this.place['hoje'] = horario;
  }

  createEvent() {
    let loader = this.loadCtrl.create({
      content: "Criando evento"
    });
    loader.present();
    setTimeout(() => {
      let parent = this.navCtrl.parent;
      if (parent instanceof Tabs) {
        parent.select(0);
      }
       
      loader.dismiss();
    }, 2550);
  }

}
