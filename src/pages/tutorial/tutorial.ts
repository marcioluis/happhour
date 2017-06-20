import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Slides } from 'ionic-angular';
import { Diagnostic } from "@ionic-native/diagnostic";

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, private diagnostics: Diagnostic) {
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  startLocation() {
    this.diagnostics.isLocationAuthorized().then(authorized => {
      this.slides.lockSwipes(false);
      if (!authorized) {
        this.diagnostics.requestLocationAuthorization().then(result => {
          switch (result) {
            case this.diagnostics.permissionStatus.GRANTED:
            case this.diagnostics.permissionStatus.GRANTED_WHEN_IN_USE:
              this.slides.slideNext();
              break;
            default:
              this.slides.lockSwipes(true);
              break;
          }
        });
      } else {
        this.slides.slideNext();
      }
    });
  }

  startContacts() {
    this.diagnostics.isContactsAuthorized().then(authorized => {
      this.slides.lockSwipes(false);
      if (!authorized) {
        this.diagnostics.requestContactsAuthorization().then(result => {
          switch (result) {
            case this.diagnostics.permissionStatus.GRANTED:
              this.slides.slideNext();
              break;
            default:
              this.slides.lockSwipes(true);
              break;
          }
        });
      } else {
        this.slides.slideNext();
      }
    });
  }

  onSlideChangeStart(slides: Slides) {
    let index = slides.getActiveIndex();
    //slides com acoes de permissao de acesso
    switch (index) {
      case 1:
      case 2:
        slides.lockSwipes(true);
        break;
      default:
        slides.lockSwipes(false);
        break;
    }
  }

  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }

  ionViewDidLoad() {
  }

}
