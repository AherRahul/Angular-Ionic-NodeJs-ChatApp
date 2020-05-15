import { TokenProvider } from './../../providers/token/token';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  tabElement: any;
  token: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private tokenProvider: TokenProvider
  ) {
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    (this.tabElement as HTMLElement).style.display = 'none';
  }

  ionViewWillLeave() {
    (this.tabElement as HTMLElement).style.display = 'flex';
  }

  ChangePasswordPage() {
    this.navCtrl.push('ChangePasswordPage');
  }

  Logout() {
    this.tokenProvider.DeleteToken();
    this.navCtrl.setRoot('LoginPage');
  }
}
