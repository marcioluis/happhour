import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ContactsProvider } from "../../providers/contacts";
import { ContactModel } from "../../model/models";

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactsProvider: ContactsProvider) { }

  _contacts: ContactModel[];
  _contactsModel: ContactModel[];

  ionViewDidLoad() {
    this.loadContacts();
  }

  get contacts() {
    return this._contactsModel;
  }

  loadContacts() {
    this.contactsProvider.loadLocalContacts()
      .subscribe(item => this._contacts = this._contactsModel = item,
      error => console.error(`Erro load contatos: ${JSON.stringify(error)}`));
  }

  getAvatar(contato: ContactModel) {
    return contato.imageUrl;
  }

  getDisplayName(contato: ContactModel) {
    return contato.displayName;
  }

  getPhone(contato: ContactModel) {
    return contato.phoneMasked;
  }

  trackByContacts(index: number, item: ContactModel) {
    return item.phoneNumber;
  }

  searchContacts(event: any) {
    let value = event.target.value;

    if (value && value.toString().trim() != '') {
      if (isNaN(value)) {
        this._contactsModel = this._contacts.filter(item => {
          return item.displayName.indexOf(value) > -1;
        })
      } else {
        this._contactsModel = this._contacts.filter(item => {
          return item.phoneNumber.toString().indexOf(value) > -1;
        })
      }
    } else {
      this._contactsModel = this._contacts;
    }
  }

  syncContacts() {
    this.contactsProvider.sync().subscribe(item => this._contacts = this._contactsModel = item,
      error => console.error(`Erro sync contatos: ${JSON.stringify(error)}`));
  }

}
