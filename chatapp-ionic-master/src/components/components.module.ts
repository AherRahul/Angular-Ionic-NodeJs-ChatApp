import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PostsComponent } from './posts/posts';
import { UserFriendsComponent } from './user-friends/user-friends';
import { ImagesComponent } from './images/images';
@NgModule({
  declarations: [PostsComponent, UserFriendsComponent,
    ImagesComponent],
  imports: [IonicModule],
  exports: [PostsComponent, UserFriendsComponent,
    ImagesComponent]
})
export class ComponentsModule {}
