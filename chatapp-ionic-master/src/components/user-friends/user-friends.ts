import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-friends',
  templateUrl: 'user-friends.html'
})
export class UserFriendsComponent implements OnChanges {
  @Input() friends;
  followingArr = [];
  followersArr = [];
  following = false;
  followers = false;

  constructor() {}

  ngOnChanges() {
    if (this.friends && this.friends.isFollowing) {
      this.following = true;
      this.followers = false;
      this.followingArr = this.friends.user.following;
    }

    if (this.friends && !this.friends.isFollowing) {
      this.following = false;
      this.followers = true;
      this.followersArr = this.friends.user.followers;
    }
  }
}
