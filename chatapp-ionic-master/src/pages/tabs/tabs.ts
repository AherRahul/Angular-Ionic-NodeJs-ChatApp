import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TokenProvider } from '../../providers/token/token';
import _ from 'lodash';
import io from 'socket.io-client';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoot1 = 'StreamsPage';
  tabRoot2 = 'ChatListPage';
  tabRoot3 = 'PeoplePage';
  tabRoot4 = 'AlertPage';
  tabRoot5 = 'ProfilePage';

  token: any;
  count = 0;
  msgCount = 0;
  socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private tokenProvider: TokenProvider,
    private usersProvider: UsersProvider
  ) {
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.GetPayload().then(value => {
      this.token = value;
      this.GetUser(this.token._id, this.token.username);
    });
  }

  ClickTab() {
    this.socket.on('refreshPage', () => {
      this.tokenProvider.GetPayload().then(value => {
        this.token = value;
        this.GetUser(this.token._id, this.token.username);
      });
      this.msgCount -= 1;
      if (this.msgCount <= 0) {
        this.msgCount = null;
      }

      this.count -= 1;
      if (this.count <= 0) {
        this.count = null;
      }
    });
  }

  GetUser(id, username) {
    this.usersProvider.GetUserById(id).subscribe(data => {
      let msgArr = [];
      let countArr = [];
      _.forEach(data.result.chatList, value => {
        const msg = value.msgId.message;
        _.forEach(msg, val => {
          if (val.isRead === false && val.receivername === username) {
            msgArr.push(val);
            this.msgCount = msgArr.length;
          }
        });
      });

      _.forEach(data.result.notifications, value => {
        if (value.read === false) {
          countArr.push(value);
          this.count = countArr.length;
        }
      });
    });
  }
}
