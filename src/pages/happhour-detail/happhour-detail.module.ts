import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HapphourDetailPage } from './happhour-detail';

@NgModule({
  declarations: [
    HapphourDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HapphourDetailPage),
  ],
  exports: [
    HapphourDetailPage
  ]
})
export class HapphourDetailPageModule {}
