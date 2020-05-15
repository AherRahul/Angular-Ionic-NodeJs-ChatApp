import { TokenProvider } from './../../providers/token/token';
import { PostProvider } from './../../providers/post/post';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-streams',
  templateUrl: 'streams.html'
})
export class StreamsPage {
  stream: any;
  streamsArray = [];
  topStreamsArray = [];
  socket: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private postProvider: PostProvider,
    private tokenProvider: TokenProvider,
    private modalCtrl: ModalController
  ) {
    this.stream = 'post';
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.GetPayload().then(value => {
      this.user = value;
    });
    this.GetAllPosts();

    this.socket.on('refreshPage', () => {
      this.GetAllPosts();
    });
  }

  GetAllPosts() {
    this.postProvider.GetAllPosts().subscribe(
      data => {
        this.streamsArray = data.posts;
        this.topStreamsArray = data.top;
      },
      err => {
        if (err.error.token === null) {
          this.tokenProvider.DeleteToken();
          this.navCtrl.setRoot('LoginPage');
        }
      }
    );
  }

  LikePost(post) {
    this.postProvider.AddLike(post).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  AddComment(post) {
    this.navCtrl.push('CommentsPage', { post });
  }

  PostModal() {
    let modal = this.modalCtrl.create('PostPage');
    modal.present();
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  CheckInLikesArray(arr, username) {
    return _.some(arr, { username: username });
  }
}
