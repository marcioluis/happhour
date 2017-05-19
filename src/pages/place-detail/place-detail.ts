import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { PlaceModel } from "../../model/models";
import { HapphourProvider } from "../../providers/happhour";
import { UserProvider } from "../../providers/user";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
    private happhourProvider: HapphourProvider, private userProvider: UserProvider) {
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

  async createEvent() {
    let loader = this.loadCtrl.create({
      content: "Criando evento"
    });
    loader.present();

    try {
      let owner = await this.userProvider.loadUser();
      let happHour = this.happhourProvider.createNewHappHour(this.place, owner);

      this.happhourProvider.saveHappHourAll(happHour).subscribe((model) => {
        let parent = this.navCtrl.parent;
        if (parent instanceof Tabs) {
          this.navCtrl.popToRoot();
          parent.select(0);
        }
      }, (error) => {
        console.error(`Erro ao salvar evento: ${JSON.stringify(error, null, '\t')}`)
      });

    } catch (error) {
      console.error(`Erro ao carregar usuario: ${JSON.stringify(error, null, '\t')}`);
    }
    finally {
      loader.dismiss();
    }
  }

}
