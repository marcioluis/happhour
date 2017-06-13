import { Injectable } from '@angular/core';
import { ContactModel } from "../model/models";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactsProvider {

  constructor() {
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
    //tem que pegar os contatos da agenda , talvez menos os já existentes local
    //jogar no backend para verificar se já é um usuario e retornar apenas os que já são
    //adicionar aqui
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


}
