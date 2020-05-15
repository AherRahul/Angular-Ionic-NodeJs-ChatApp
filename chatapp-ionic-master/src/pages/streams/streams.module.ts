import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreamsPage } from './streams';

@NgModule({
  declarations: [
    StreamsPage,
  ],
  imports: [
    IonicPageModule.forChild(StreamsPage),
  ],
})
export class StreamsPageModule {}
