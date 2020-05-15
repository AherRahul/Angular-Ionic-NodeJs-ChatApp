import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeoplePage } from './people';

@NgModule({
  declarations: [
    PeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(PeoplePage),
  ],
})
export class PeoplePageModule {}
