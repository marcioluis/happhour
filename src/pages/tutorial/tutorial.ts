import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Settings } from '../../providers/settings';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, private settings: Settings) {
    this.slides = [
      {
        title: "Bem-vindo ao HappHour",
        description: "O <b>Ionic Super Starter</b> é um starter para Ionic completo, com diversos componentes e páginas prontas para ser utilizado como guia de melhores práticas.",
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: "Como utilizar o Super Starter",
        description: "Combine os tipos de páginas que você quer e remova aquelas que não precisa. No starter existem muitos casos de uso comuns de layouts e páginas como login, cadastro, abas e de tutorial.",
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: "Iniciando o projeto",
        description: "Precisa de ajuda? Dê uma olhada no README do Super Starter para um tutorial completo",
        image: 'assets/img/ica-slidebox-img-3.png',
      }
    ];

  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }

  ionViewDidLoad() {
  }

}
