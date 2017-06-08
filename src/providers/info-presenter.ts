import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class InfoPresenter {

  constructor(private loadCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  /**
   * Apresenta um loader em tela com uma mensagem
   * @param message mensagem opcional informativa default to: 'Aguarde...'
   */
  presentLoader(message: string = 'Aguarde...') {
    let loader = this.loadCtrl.create({
      content: message
    });
    loader.present();
    return loader;
  }

  presentError(error) {
    let alert = this.alertCtrl.create({
      title: error.name,
      subTitle: error.message || JSON.stringify(error, null, '\t'),
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Divirta-se!',
      subTitle: 'Curta o HappHour com seus amigos. Seus pontos serão liberados em seguida.',
      enableBackdropDismiss: true,
      buttons: ['OK']
    });
    alert.present();
  }
}
