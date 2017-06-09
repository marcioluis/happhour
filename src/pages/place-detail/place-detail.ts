import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import { PlaceModel } from "../../model/place-model";
import { HapphourProvider } from "../../providers/happhour";
import { UserProvider } from "../../providers/user";

@IonicPage()
@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {

  place: PlaceModel = this.navParams.get('place');
  scheduled = this.navParams.get('');

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController,
    private happhourProvider: HapphourProvider, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
  }

  get isOpenNow() {
    //TODO: arrumar esse aberto hoje, meio porco
    let dia = new Date().getDay() + 1;
    return this.place.horariosFuncionamento[dia];
  }

  get logo() {
    return this.place.logoUrl;
  }

  get name() {
    return this.place.nome;
  }

  get subname() {
    return this.place.subNome;
  }

  get description() {
    return this.place.descricao;
  }

  get isPontuavel() {
    return this.place.isPontuavel;
  }

  get isReservavel() {
    return this.place.isReservavel;
  }

  get isHappyOnDemand() {
    return this.place.isHappyOnDemand;
  }

  get telefones() {
    return this.place.telefones;
  }

  get address() {
    return this.place.endereco;
  }

  //TODO: Agendar data do evento
  async scheduleEvent() { }

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
