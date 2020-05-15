import { MessageProvider } from './../../providers/message/message';
import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import _ from 'lodash';
import io from 'socket.io-client';

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {
  token: any;
  chatList = [];
  socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private tokenProvider: TokenProvider,
    private msgProvider: MessageProvider
  ) {
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.GetPayload().then(value => {
      this.token = value;
      this.GetUser(this.token._id);
    });

    this.socket.on('refreshPage', () => {
      this.tokenProvider.GetPayload().then(value => {
        this.token = value;
        this.GetUser(this.token._id);
      });
    });
  }

  GetUser(id) {
    this.usersProvider.GetUserById(id).subscribe(data => {
      this.chatList = data.result.chatList;
    });
  }

  ChatPage(chat) {
    this.navCtrl.push('ChatPage', {
      receiverId: chat.receiverId._id,
      receiverName: chat.receiverId.username
    });

    this.msgProvider
      .MarkMessages(this.token.username, chat.receiverId.username)
      .subscribe(
        data => {
          this.socket.emit('refresh', {});
        },
        err => console.log(err)
      );
  }

  GetTime(time) {
    const todaysDate = new Date();
    const date = new Date(time);

    const d1 = moment(new Date(todaysDate));
    const d2 = moment(new Date(date));

    const d3 = d1.diff(d2, 'days');

    if (d3 === 0) {
      return moment(time).format('LT');
    } else {
      return moment(time).format('DD/MM/YYYY');
    }
  }

  CheckIfFalse(arr, name) {
    let total = 0;
    _.forEach(arr, val => {
      if (val.isRead === false && val.receivername !== name) {
        total += 1;
      }
    });

    return total;
  }
}
