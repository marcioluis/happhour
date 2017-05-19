import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaHappComponent } from './lista-happ';

@NgModule({
  declarations: [
    ListaHappComponent,
  ],
  imports: [
    IonicPageModule.forChild(ListaHappComponent),
  ],
  exports: [
    ListaHappComponent
  ]
})
export class ListaHappComponentModule {}
