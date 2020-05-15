import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [ChatPage],
  imports: [IonicPageModule.forChild(ChatPage), EmojiPickerModule]
})
export class ChatPageModule {}
