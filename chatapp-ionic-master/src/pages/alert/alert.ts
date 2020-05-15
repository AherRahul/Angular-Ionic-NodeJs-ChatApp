import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import io from 'socket.io-client';

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {
  payload: any;
  notifications = [];
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
      this.payload = value;
      this.GetUser(this.payload._id);
    });

    this.socket.on('refreshPage', () => {
      this.tokenProvider.GetPayload().then(value => {
        this.payload = value;
        this.GetUser(this.payload._id);
      });
    });
  }

  GetUser(id) {
    this.usersProvider.GetUserById(id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
    });
  }

  MarkAlert(value) {
    this.usersProvider.MarkNotification(value._id).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  DeleteAlert(value) {
    this.usersProvider.MarkNotification(value._id, true).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  GetTime(time) {
    return moment(time).fromNow();
  }
}
