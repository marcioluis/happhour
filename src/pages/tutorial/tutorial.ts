import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Slides, AlertController } from 'ionic-angular';
import { Diagnostic } from "@ionic-native/diagnostic";
import { UserProvider } from "../../providers/user";
import { ContactsProvider } from "../../providers/contacts";

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  @ViewChild(Slides) slides: Slides;

  phoneCountry: string = "br";
  parsedPhoneNumber: string;

  constructor(public navCtrl: NavController,
    private diagnostics: Diagnostic,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    private contacts: ContactsProvider) {
  }

  nextSlide() {
    this.slides.slideNext();
  }

  presentPhonePrompt() {
    let alert = this.alertCtrl.create({
      title: 'Telefone',
      inputs: [
        {
          name: 'phone',
          placeholder: '(__) _________',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            let p = (<string>data.phone).replace(/\D/, "");
            if (p.length >= 10) {
              this.parsedPhoneNumber = this.contacts.formatPhone(p);
            }
          }
        }
      ]
    });
    alert.present();
  }

  startPhone() {
    if (this.parsedPhoneNumber) {
      this.userProvider.loadUser().then(() => {
        this.userProvider.user.telephone = this.parsedPhoneNumber;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
      });
    }
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
      case 3:
        slides.lockSwipes(true);
        break;
      default:
        if (slides.isEnd())
          slides.lockSwipeToPrev(true);
        else
          slides.lockSwipes(false);
        break;
    }
  }

}
