import { TokenProvider } from './../providers/token/token';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import io from 'socket.io-client';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  socket: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    private tokenProvider: TokenProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.socket = io('http://localhost:3000');

      this.storage.get('auth-token').then(token => {
        if (token) {
          this.tokenProvider.GetPayload().then(data => {
            const params = {
              room: 'global',
              user: data.username
            };
            this.socket.emit('online', params);
          });
          this.nav.setRoot('TabsPage');
        } else {
          this.nav.setRoot('LoginPage');
        }
      });
    });
  }
}
