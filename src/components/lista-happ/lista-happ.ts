import { Component } from '@angular/core';

/**
 * Generated class for the ListaHappComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lista-happ',
  templateUrl: 'lista-happ.html'
})
export class ListaHappComponent {

  text: string;

  constructor() {
    console.log('Hello ListaHappComponent Component');
    this.text = 'Hello World';
  }

}
