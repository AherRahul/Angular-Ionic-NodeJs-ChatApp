import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewProfilePage } from './view-profile';

@NgModule({
  declarations: [ViewProfilePage],
  imports: [IonicPageModule.forChild(ViewProfilePage), ComponentsModule]
})
export class ViewProfilePageModule {}
