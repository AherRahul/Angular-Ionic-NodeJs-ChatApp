import { TokenProvider } from './../../providers/token/token';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import _ from 'lodash';
import io from 'socket.io-client';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  allUsers = [];
  token: any;
  socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private tokenProvider: TokenProvider
  ) {
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.GetPayload().then(value => {
      this.token = value;
      this.GetUsers(this.token.username);
    });

    this.socket.on('refreshPage', () => {
      this.tokenProvider.GetPayload().then(value => {
        this.token = value;
        this.GetUsers(this.token.username);
      });
    });
  }

  GetUsers(name) {
    this.usersProvider.GetAllUsers().subscribe(
      data => {
        _.remove(data.result, { username: name });
        this.allUsers = data.result;
      },
      err => console.log(err)
    );
  }

  ViewProfile(value) {
    this.navCtrl.push('ViewProfilePage', { userData: value });
    this.usersProvider.ProfileNotifications(value._id).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }
}
