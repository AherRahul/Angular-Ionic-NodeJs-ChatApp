import { Component, Input, OnChanges } from '@angular/core';
import { UsersProvider } from '../../providers/users/users';
import io from 'socket.io-client';

@Component({
  selector: 'app-images',
  templateUrl: 'images.html'
})
export class ImagesComponent implements OnChanges {
  @Input() images;
  userImages = [];
  hasImages = false;
  socket: any;

  constructor(private usersProvider: UsersProvider) {
    this.socket = io('http://localhost:3000');
  }

  ngOnChanges() {
    this.ChangesFunction();

    this.socket.on('refreshPage', () => {
      this.ChangesFunction();
    });
  }

  ChangesFunction() {
    if (this.images && this.images.hasImages) {
      this.userImages = this.images.user.images;
      this.hasImages = true;
    }

    if (this.images && !this.images.hasImages) {
      this.userImages = this.images.images;
    }
  }

  SetAsDefault(value) {
    this.usersProvider.SetDefaultImage(value.imgId, value.imgVersion).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }
}
