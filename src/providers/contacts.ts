import { Injectable } from '@angular/core';
import { ContactModel } from "../model/models";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Contacts } from "@ionic-native/contacts";
import { PhoneNumberFormat, PhoneNumberUtil, PhoneNumberType } from "google-libphonenumber";

@Injectable()
export class ContactsProvider {

  phoneUtil: PhoneNumberUtil

  constructor(private phoneContacts: Contacts) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  formatPhone(phone: string, country: string = 'br'): string {
    let phoneParsed = this.phoneUtil.parse(phone, country);
    if (this.phoneUtil.isPossibleNumber(phoneParsed))
      return this.phoneUtil.format(phoneParsed, PhoneNumberFormat.INTERNATIONAL);
    else
      return "";
  }

  loadLocalContacts(): Observable<ContactModel[]> {
    let contatos: ContactModel[] = [
      { displayName: "Ben Kenobi", id: 1, imageUrl: "assets/img/avatar-ben.png", phoneMasked: "(51) 993019777", phoneNumber: 51993019777 },
      { displayName: "Finn Trooper", id: 2, imageUrl: "assets/img/avatar-finn.png", phoneMasked: "(51) 993019774", phoneNumber: 51993019774 },
      { displayName: "Frodo baggins", id: 3, imageUrl: "assets/img/avatar-frodo.jpg", phoneMasked: "(51) 993019771", phoneNumber: 51993019771 },
      { displayName: "Gollum", id: 4, imageUrl: "assets/img/avatar-gollum.jpg", phoneMasked: "(51) 993019766", phoneNumber: 51993019766 }];

    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(contatos);
      }, 1365);
    });

    return Observable.from(p);
  }

  sync(): Observable<ContactModel[]> {
    let contatos: ContactModel[] = [
      { displayName: "Ben Kenobi", id: 1, imageUrl: "assets/img/avatar-ben.png", phoneMasked: "(51) 993019777", phoneNumber: 51993019777 },
      { displayName: "Finn Trooper", id: 2, imageUrl: "assets/img/avatar-finn.png", phoneMasked: "(51) 993019774", phoneNumber: 51993019774 },
      { displayName: "Frodo baggins", id: 3, imageUrl: "assets/img/avatar-frodo.jpg", phoneMasked: "(51) 993019771", phoneNumber: 51993019771 },
      { displayName: "Gollum", id: 4, imageUrl: "assets/img/avatar-gollum.jpg", phoneMasked: "(51) 993019766", phoneNumber: 51993019766 }];

    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(contatos);
      }, 1365);
    });

    //TODO: tem que pegar os contatos da agenda , talvez menos os já existentes local
    //jogar no backend para verificar se já é um usuario e retornar apenas os que já são
    //adicionar aqui    
    this.phoneContacts.find(["phoneNumbers"], { filter: '', desiredFields: ["displayName", "phoneNumbers"] })
      .then(contacts => {
        //filtra os contatos removendo os sem telefone e só residencial
        let validContacts = contacts.filter(contact => {
          if (contact.phoneNumbers) {
            contact.phoneNumbers = contact.phoneNumbers.filter(p => {
              let phoneParsed = this.phoneUtil.parse(p.value, 'br');
              let isValid = this.phoneUtil.isValidNumber(phoneParsed);
              let isMobile = this.phoneUtil.getNumberType(phoneParsed) == PhoneNumberType.MOBILE;
              p.value = isValid ? this.phoneUtil.format(phoneParsed, PhoneNumberFormat.INTERNATIONAL) : p.value;
              return isValid && isMobile;
            });
            return contact.phoneNumbers.length;
          } else {
            return false;
          }
        });
      }).catch(e => console.error(e));

    return Observable.from(p);
  }


}
